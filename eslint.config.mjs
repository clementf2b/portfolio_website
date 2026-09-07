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
  /*
   * Build output and vendored code — never ours to lint.
   *
   * .claude holds git worktrees for parallel sessions, each a full second
   * copy of the repo at some other commit. Flat config, unlike eslintrc,
   * does not skip dot-directories on its own, so `npm run lint` was
   * reporting the other branch's code as errors in this one.
   */
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'tools/kanban/**', '.claude/**'] },
  ...next,
]

export default config
