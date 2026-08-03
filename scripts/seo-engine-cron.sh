#!/usr/bin/env bash
# Recurring SEO-engine sync, meant to run from cron on the bles server.
# Pulls any newly-ready articles from the engine as DRAFTS (noindex), rebuilds
# so they are viewable for the practitioner to review, and — if a GITHUB_TOKEN
# is configured — pushes the updated data back so GitHub stays the source of
# truth (no drift with manual `git reset --hard` deploys). Publishing to the
# live index stays a human step (approve → seo-engine-publish.mjs); this job
# never flips anything live on its own.
#
# Install (server): crontab -e →  0 6 * * *  /home/yusuf/dr-hod/scripts/seo-engine-cron.sh
set -uo pipefail

REPO="$HOME/dr-hod"
cd "$REPO" || exit 1
export PATH="$HOME/nodejs/bin:$PATH"

# Load credentials (git-ignored .env): SEO_KEY [, GITHUB_TOKEN]
set -a; [ -f "$REPO/.env" ] && . "$REPO/.env"; set +a

mkdir -p "$REPO/logs"
LOG="$REPO/logs/seo-engine-$(date +%F).log"

{
  echo "=== $(date -u +%FT%TZ) engine sync ==="
  node scripts/seo-engine-sync.mjs || { echo "sync failed"; exit 1; }

  if git diff --quiet -- data/engine-articles.json; then
    echo "no change — nothing to rebuild"
    exit 0
  fi

  echo "drafts changed → regenerate + build + restart"
  node scripts/gen-posts.mjs >/dev/null
  npm run build >/dev/null 2>&1 || { echo "build failed"; exit 1; }
  pm2 restart dr-hod >/dev/null

  if [ -n "${GITHUB_TOKEN:-}" ]; then
    git add data/engine-articles.json src/lib/engine-posts.ts
    git -c user.name="seo-engine-bot" -c user.email="bot@dr-hod.info" \
        commit -q -m "chore(seo): sync engine drafts $(date -u +%F)" || true
    if git push "https://x-access-token:${GITHUB_TOKEN}@github.com/Muhd-Yusuf/dr-hod.git" HEAD:main -q; then
      echo "pushed to GitHub"
    else
      echo "WARN: push failed — server is ahead of GitHub until resolved"
    fi
  else
    echo "WARN: no GITHUB_TOKEN — rebuilt server-locally only; a manual reset --hard deploy would discard these drafts"
  fi
  echo "done"
} >> "$LOG" 2>&1
