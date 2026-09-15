/*
 * contrast.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Fails when any visible text on the home page drops below WCAG AA contrast:
 * 4.5:1, or 3:1 for large text. Checked in light and dark, at desktop and
 * phone width, against the production build.
 *
 * Colour tokens are tuned close to the line (accent on the dark raised card
 * is 4.52:1), so a one-step token change can quietly fail AA. This is the
 * check that notices.
 *
 * Drives the Chrome already on the machine over the DevTools protocol — no
 * dependency, no browser download. GitHub's ubuntu runners ship Chrome; set
 * CHROME_PATH if it lives somewhere else.
 *
 * Run: npm run contrast   (after npm run build)
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const PORT = process.env.CONTRAST_PORT ?? '4124'
const BASE = `http://127.0.0.1:${PORT}/`
const DEBUG_PORT = 9244
const CHROME =
  process.env.CHROME_PATH ??
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable']
    .find(existsSync)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitFor(fn, what, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const value = await fn()
      if (value) return value
    } catch {
      /* not up yet */
    }
    await sleep(300)
  }
  throw new Error(`${what} did not start within ${timeoutMs}ms`)
}

/*
 * Runs inside the page. For every element that owns visible text, composites
 * its colour over the stack of backgrounds behind it and measures the ratio.
 * Background images and gradients are not seen; nothing on this page puts
 * text on one.
 */
const audit = `(() => {
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  const rgba = (c) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1)
    const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255] }
  const lum = ([r, g, b]) => [r, g, b].map((v) => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0)
  const over = (f, b) => [0, 1, 2].map((i) => f[i] * f[3] + b[i] * (1 - f[3])).concat(1)
  const backdrop = (el) => {
    const stack = []
    for (let e = el; e; e = e.parentElement) {
      const c = rgba(getComputedStyle(e).backgroundColor)
      if (c[3] > 0) { stack.push(c); if (c[3] === 1) break }
    }
    return stack.reverse().reduce((b, c) => over(c, b), [255, 255, 255, 1])
  }
  const failures = []
  let checked = 0
  for (const el of document.querySelectorAll('body *')) {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || !el.getClientRects().length || el.closest('[aria-hidden="true"]')) continue
    checked++
    const bg = backdrop(el)
    const [hi, lo] = [lum(over(rgba(cs.color), bg)), lum(bg)].sort((a, b) => b - a)
    const ratio = (hi + 0.05) / (lo + 0.05)
    const size = parseFloat(cs.fontSize)
    const min = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700) ? 3 : 4.5
    if (ratio < min) failures.push(ratio.toFixed(2) + ':1 (needs ' + min + ') "' + el.textContent.trim().slice(0, 50) + '"')
  }
  return { checked, failures }
})()`

const server = spawn('npx', ['next', 'start', '-p', PORT], { stdio: 'ignore' })
let chrome
let failed = 0

try {
  if (!CHROME) throw new Error('Chrome not found; set CHROME_PATH')
  await waitFor(async () => (await fetch(BASE)).ok, 'server')

  chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--hide-scrollbars', `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'contrast-'))}`, 'about:blank'], { stdio: 'ignore' })
  const page = await waitFor(async () =>
    (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`)).json()).find((t) => t.type === 'page'), 'Chrome')

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j })
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    pending.get(m.id)?.(m)
    pending.delete(m.id)
  }
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const i = ++id
    pending.set(i, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)))
    ws.send(JSON.stringify({ id: i, method, params }))
  })

  await send('Page.enable')
  for (const [width, height, mobile] of [[1440, 900, false], [375, 812, true]]) {
    for (const scheme of ['light', 'dark']) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
      // next-themes follows the system scheme when nothing is stored.
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }, { name: 'prefers-reduced-motion', value: 'reduce' }] })
      await send('Page.navigate', { url: BASE })
      await waitFor(async () => (await send('Runtime.evaluate', {
        expression: `document.readyState === 'complete' && document.documentElement.classList.contains('${scheme}')`,
      })).result.value, `${scheme} theme`)
      await sleep(500) // let the theme class's colour transitions settle

      const { checked, failures } = (await send('Runtime.evaluate', { expression: audit, returnByValue: true })).result.value
      const label = `${width}px ${scheme}`.padEnd(12)
      if (failures.length) {
        failed += failures.length
        console.error(`  FAIL  ${label} ${failures.length} of ${checked} text elements below AA`)
        for (const f of failures) console.error(`        ${f}`)
      } else {
        console.log(`  ok    ${label} ${checked} text elements`)
      }
    }
  }
  ws.close()
} catch (error) {
  failed++
  console.error(error.message)
} finally {
  chrome?.kill()
  server.kill('SIGTERM')
}

console.log(failed === 0 ? '\nall text meets AA' : `\n${failed} contrast failures`)
process.exit(failed === 0 ? 0 : 1)
