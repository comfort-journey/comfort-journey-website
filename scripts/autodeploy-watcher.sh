#!/bin/bash
# Comfort Journey — Automated Continuous Deployment Watcher for AWS EC2
# Checks GitHub origin/main for new commits periodically.
# When a commit is detected (e.g. from CMS publish), automatically runs deploy.sh.

cd /opt/comfort-journey-website || exit 1

# Fetch latest without modifying working copy
git fetch origin main --quiet 2>/dev/null || exit 0

LOCAL=$(git rev-parse HEAD 2>/dev/null)
REMOTE=$(git rev-parse origin/main 2>/dev/null)

if [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Update detected ($LOCAL -> $REMOTE). Initiating automated deploy..." >> /var/log/comfort-journey-autodeploy.log
    /opt/comfort-journey-website/deploy.sh >> /var/log/comfort-journey-autodeploy.log 2>&1
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Automated deploy completed successfully." >> /var/log/comfort-journey-autodeploy.log
fi
