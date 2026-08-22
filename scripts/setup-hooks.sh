#!/usr/bin/env bash
set -Eeuo pipefail

echo 'BELENTANI // JUDAS OMEGA — security bootstrap'

command -v node >/dev/null 2>&1 || { echo 'ERROR: Node.js is required.'; exit 1; }
command -v corepack >/dev/null 2>&1 || { echo 'ERROR: Corepack is required.'; exit 1; }

corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile

if command -v python3 >/dev/null 2>&1; then
  python3 -m pip install --user --upgrade pre-commit || true
fi

if command -v pre-commit >/dev/null 2>&1; then
  pre-commit install
  pre-commit install --hook-type commit-msg
  pre-commit run --all-files
else
  echo 'WARNING: pre-commit was not installed; install it manually to enable local hooks.'
fi

pnpm check
pnpm test

echo 'Security hooks and local validation configured.'
