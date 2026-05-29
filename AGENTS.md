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
| Lint | `npm run lint` |
| Build | `npm run build` |
| Production start | `npm run start` |

### Key caveats

- The env var `NEXT_PUBLIC_PEXELS_API_KEY` is validated at server startup by `src/lib/env.ts` using `envalid`. If missing, the process crashes immediately.
- There are no automated test scripts in `package.json` (no `test` script). Validate changes via `npm run lint` and `npm run build`.
- The homepage (`/`) renders curated photos; search results are at `/results/<query>`. Both are server-rendered pages that call the Pexels API.
- Image domains must be whitelisted in `next.config.js` under `images.remotePatterns`.
