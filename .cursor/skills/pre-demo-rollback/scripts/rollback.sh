#!/usr/bin/env bash
set -euo pipefail

PRE_DEMO_COMMIT="f84c228ee94edb8d18b6c75f7bc11432f3fc97fa"
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"

if [[ -z "${REPO_ROOT}" ]]; then
  echo "error: not inside a git repository" >&2
  exit 1
fi

cd "${REPO_ROOT}"

if ! git rev-parse --verify "${PRE_DEMO_COMMIT}^{commit}" >/dev/null 2>&1; then
  echo "fetching origin…"
  git fetch origin
fi

if ! git rev-parse --verify "${PRE_DEMO_COMMIT}^{commit}" >/dev/null 2>&1; then
  echo "error: commit ${PRE_DEMO_COMMIT} not found" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "warning: uncommitted changes will be discarded" >&2
fi

git checkout main
git reset --hard "${PRE_DEMO_COMMIT}"
git clean -fd -e .env -e .env.local -e .cursor/skills

echo ""
echo "Rolled back to pre-demo baseline:"
git log -1 --oneline
git status
