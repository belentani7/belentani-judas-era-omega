#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_BRANCH="deps-backup-$(date +%Y%m%d-%H%M%S)"
git switch -c "$BACKUP_BRANCH"

pnpm install --frozen-lockfile
pnpm outdated || true
pnpm update
pnpm check
pnpm test
pnpm build

echo "Dependencies updated successfully on branch $BACKUP_BRANCH"
echo "Review changes before merging into main."
