# Agents

## Cursor Cloud specific instructions

### Project overview

Single-service Next.js (v15) image gallery app using the Pexels API. No database, no Docker, no microservices.

### Running the dev server

```bash
NEXT_PUBLIC_PEXELS_API_KEY=<key> npm run dev
```

The server starts on `http://localhost:3000`. If the `NEXT_PUBLIC_PEXELS_API_KEY` secret is not available in the environment, pass any non-empty string as a placeholder — the app validates only that the variable is set (via `envalid`). The Pexels API may still serve requests with a placeholder value.

### Commands reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` |
| Unit tests | `npm run test` |
| Build | `npm run build` |
| Full local check | `npm run check` |
| Production start | `npm run start` |

### Key caveats

- The env var `NEXT_PUBLIC_PEXELS_API_KEY` is validated at server startup by `src/lib/env.ts` using `envalid`. If missing, the process crashes immediately.
- Vitest tests are available via `npm run test`. The full validation pipeline is `npm run check`, which runs typecheck, lint, tests, and build.
- The homepage (`/`) renders curated photos; search results are at `/results/<query>`. Both start as server-rendered pages that call the Pexels API.
- Infinite scroll loads additional pages through `GET /api/gallery?topic=<topic>&page=<page>`. The API route returns `{ photos, nextPage }` and responds with `400` when `page` is missing.
- Image domains must be whitelisted in `next.config.js` under `images.remotePatterns`.
- A local pre-demo rollback skill exists at `.cursor/skills/pre-demo-rollback/`. Use it only when explicitly requested, because its script resets the checkout to commit `f84c228` and discards uncommitted changes after warning.
