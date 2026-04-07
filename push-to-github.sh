#!/bin/bash
# Push HacxGPT to GitHub
# Run with: bash push-to-github.sh

REPO_URL="https://github.com/daviddan-241/Replit.git"
TOKEN="${GITHUB_PERSONAL_ACCESS_TOKEN}"

if [ -z "$TOKEN" ]; then
  echo "ERROR: GITHUB_PERSONAL_ACCESS_TOKEN not set"
  exit 1
fi

# Set the remote with the token embedded
AUTHENTICATED_URL="https://${TOKEN}@github.com/daviddan-241/Replit.git"

git config user.email "hacxgpt@replit.com"
git config user.name "HacxGPT Bot"

# Check if remote origin exists
if git remote | grep -q "^origin$"; then
  git remote set-url origin "$AUTHENTICATED_URL"
else
  git remote add origin "$AUTHENTICATED_URL"
fi

git add -A
git commit -m "feat: mobile-responsive UI, code execution, deploy configs" 2>/dev/null || echo "Nothing new to commit"
git push -u origin main --force

echo "Push complete!"
