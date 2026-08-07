#!/usr/bin/env bash
# Recurring SEO-engine publish job, run from cron on the bles server on
# Sundays and Wednesdays. Each run: pulls newly-ready articles from the engine,
# approves exactly ONE (the oldest pending) so at most one goes live per day,
# rebuilds, pushes to GitHub (source of truth, deploy key), and closes the loop
# with the engine (/published). Never publishes two on the same day.
#
# Install (server): crontab -e →  0 8 * * 0,3  /home/yusuf/dr-hod/scripts/seo-engine-cron.sh
set -uo pipefail

REPO="$HOME/dr-hod"
cd "$REPO" || exit 1
export PATH="$HOME/nodejs/bin:$PATH"

# Load credentials (git-ignored .env): SEO_KEY [, GITHUB_TOKEN]
set -a; [ -f "$REPO/.env" ] && . "$REPO/.env"; set +a

mkdir -p "$REPO/logs"
LOG="$REPO/logs/seo-engine-$(date +%F).log"

{
  echo "=== $(date -u +%FT%TZ) engine publish run ==="
  node scripts/seo-engine-sync.mjs || { echo "sync failed"; exit 1; }

  # Compress + self-host any new engine photos (originals are 2-3 MB; too heavy).
  node scripts/optimize-images.mjs || echo "WARN: image optimize failed"

  # Publish at most one article this run (one on Sunday, one on Wednesday).
  node scripts/seo-engine-approve.mjs 1

  if git diff --quiet -- data/engine-articles.json; then
    echo "nothing new to publish"
    exit 0
  fi

  echo "change detected → regenerate + build + restart"
  node scripts/gen-posts.mjs >/dev/null
  npm run build >/dev/null 2>&1 || { echo "build failed"; exit 1; }
  pm2 restart dr-hod >/dev/null

  # The page is now live on the origin — tell the engine it is published so the
  # keyword is marked covered and future articles can link to it and won't dup.
  node scripts/seo-engine-publish.mjs || echo "WARN: /published callback failed"

  # Push over SSH using the server's deploy key (configured via the repo's
  # origin = git@github.com:... and core.sshCommand). Keeps GitHub the source
  # of truth so manual `git reset --hard` deploys never discard synced drafts.
  git add data/engine-articles.json src/lib/engine-posts.ts public/images/articles
  git -c user.name="seo-engine-bot" -c user.email="bot@dr-hod.info" \
      commit -q -m "chore(seo): publish engine article $(date -u +%F)" || true
  if git push origin HEAD:main -q 2>/dev/null; then
    echo "pushed to GitHub"
  else
    echo "WARN: push failed (deploy key not set up?) — server is ahead of GitHub until resolved"
  fi
  echo "done"
} >> "$LOG" 2>&1
