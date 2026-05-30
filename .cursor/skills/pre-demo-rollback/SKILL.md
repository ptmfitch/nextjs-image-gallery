---
name: pre-demo-rollback
description: >-
  Rolls back the nextjs-image-gallery repo to the pre-demo baseline commit
  f84c228 (main after PR #5). Use when the user says pre-demo rollback,
  reset for demo, undo WIP before a demo, or references commit f84c228.
disable-model-invocation: true
---

# Pre-demo rollback

Restore this repository to the known demo baseline:

| Field | Value |
|-------|--------|
| **Full SHA** | `f84c228ee94edb8d18b6c75f7bc11432f3fc97fa` |
| **Short SHA** | `f84c228` |
| **GitHub** | https://github.com/ptmfitch/nextjs-image-gallery/commit/f84c228ee94edb8d18b6c75f7bc11432f3fc97fa |
| **Message** | Merge pull request #5 from ptmfitch/cursor/footer-nav-update-da9c1 |

This is the gallery **without** favorites/localStorage and other post-baseline features.

## Before running

1. Confirm cwd is the repo root (`nextjs-image-gallery`).
2. **Warn** if `git status` shows uncommitted work the user may want to keep.
3. Do **not** `git push --force` to `main` unless the user explicitly asks to update the remote.

## Rollback (local)

Prefer the project script (consistent, excludes env files):

```bash
./.cursor/skills/pre-demo-rollback/scripts/rollback.sh
```

Or run equivalent steps manually:

```bash
git fetch origin
git checkout main
git reset --hard f84c228ee94edb8d18b6c75f7bc11432f3fc97fa
git clean -fd -e .env -e .env.local -e .cursor/skills
git status
```

## After rollback

- Report current `HEAD` (`git log -1 --oneline`) and that the working tree is clean.
- Remind the user to run `npm run dev` (needs `NEXT_PUBLIC_PEXELS_API_KEY` in `.env.local`).
- If they were on a feature branch, note that `main` is now at the baseline; other branches are unchanged.

## Do not

- Amend or rewrite history on `main` on the remote without explicit approval.
- Delete `.env` or `.env.local` during clean.
- Revert unrelated user files outside this repo.
