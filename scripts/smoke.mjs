/*
 * smoke.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Starts the production server against the current build and checks that the
 * things which have actually broken before still work.
 *
 * No test framework and no browser. Every dependency here ships with Node:
 * child_process to run the server, fetch to ask it questions, assert to fail.
 * A browser-driven test would catch more — see the list at the bottom of this
 * file — but it costs a 100MB download in CI, and none of what it would add
 * has broken yet.
 *
 * Run: npm run smoke   (after npm run build)
 */
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'

const PORT = process.env.SMOKE_PORT ?? '4123'
const BASE = `http://127.0.0.1:${PORT}`

const server = spawn('npx', ['next', 'start', '-p', PORT], {
  stdio: ['ignore', 'pipe', 'pipe'],
})

let serverLog = ''
server.stdout.on('data', (d) => (serverLog += d))
server.stderr.on('data', (d) => (serverLog += d))

/* Poll rather than sleep a fixed amount: the server is ready when it answers. */
async function waitForServer(timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE, { signal: AbortSignal.timeout(2000) })
      if (res.ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error(`server did not answer within ${timeoutMs}ms\n${serverLog}`)
}

const checks = []
const check = (name, fn) => checks.push({ name, fn })

check('home responds 200', async () => {
  const res = await fetch(BASE)
  assert.equal(res.status, 200)
})

check('home carries one h1', async () => {
  const html = await (await fetch(BASE)).text()
  const count = (html.match(/<h1[\s>]/g) ?? []).length
  assert.equal(count, 1, `expected exactly one <h1>, found ${count}`)
})

check('every section the nav links to exists', async () => {
  const html = await (await fetch(BASE)).text()
  for (const id of ['home', 'about', 'projects', 'workflow']) {
    assert.ok(html.includes(`id="${id}"`), `missing section id="${id}"`)
  }
})

/*
 * The share card broke silently once: og:image pointed at a deployment URL
 * behind access protection, so every scraper got a redirect to a login page
 * and the card arrived blank.
 */
check('share card is declared and absolute', async () => {
  const html = await (await fetch(BASE)).text()
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1]
  assert.ok(image, 'no og:image')
  assert.ok(image.startsWith('http'), `og:image is not absolute: ${image}`)
  assert.ok(html.includes('name="twitter:card"'), 'no twitter:card')
})

check('share card image renders', async () => {
  const res = await fetch(`${BASE}/opengraph-image`)
  assert.equal(res.status, 200)
  assert.match(res.headers.get('content-type') ?? '', /image\/png/)
})

check('sitemap and robots respond', async () => {
  for (const path of ['/sitemap.xml', '/robots.txt']) {
    const res = await fetch(BASE + path)
    assert.equal(res.status, 200, `${path} returned ${res.status}`)
  }
})

/*
 * Every screenshot and icon the page asks for must exist. A renamed or
 * deleted file under public/ is invisible until someone scrolls to it.
 */
check('every local image referenced by the page exists', async () => {
  const html = await (await fetch(BASE)).text()
  const paths = new Set()
  for (const m of html.matchAll(/url=%2F([^&"]+)&/g)) {
    paths.add('/' + decodeURIComponent(m[1]))
  }
  assert.ok(paths.size > 0, 'no optimised images found on the page')
  for (const path of paths) {
    const res = await fetch(BASE + path)
    assert.equal(res.status, 200, `${path} returned ${res.status}`)
  }
})

check('a missing route still returns 404', async () => {
  const res = await fetch(`${BASE}/definitely-not-a-page`)
  assert.equal(res.status, 404)
})

let failed = 0
try {
  await waitForServer()
  for (const { name, fn } of checks) {
    try {
      await fn()
      console.log(`  ok    ${name}`)
    } catch (error) {
      failed++
      console.error(`  FAIL  ${name}\n        ${error.message.split('\n')[0]}`)
    }
  }
} catch (error) {
  failed++
  console.error(error.message)
} finally {
  server.kill('SIGTERM')
}

console.log(failed === 0 ? `\n${checks.length} checks passed` : `\n${failed} failed`)
process.exit(failed === 0 ? 0 : 1)

/*
 * Deliberately not covered, because it needs a real browser:
 *   - horizontal overflow on a phone, which this site has had before
 *   - console errors
 *   - focus rings, which cannot be triggered without real keyboard input
 * Add Playwright when one of those breaks twice.
 */
