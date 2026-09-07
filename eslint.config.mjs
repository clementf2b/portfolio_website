/*
 * eslint.config.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Replaces .eslintrc.json. ESLint 10 dropped eslintrc entirely, and
 * eslint-config-next 16 now ships its config as a flat array, so this is the
 * same one line of intent ("next/core-web-vitals") in the new shape.
 *
 * The script that runs it changed too: `next lint` was removed in Next 16, so
 * package.json calls eslint directly. Nothing else configures it.
 */
import next from 'eslint-config-next/core-web-vitals'

const config = [
  /* Build output and vendored code — never ours to lint. */
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'tools/kanban/**'] },
  ...next,
]

export default config
