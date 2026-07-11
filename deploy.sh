#!/usr/bin/env bash
# ===================================================================
# deploy.sh — build a single-theme production bundle into dist/
#
#   ./deploy.sh <theme> [domain]
#
#   <theme>   one of the theme folders: game storybook library scroll
#             editorial cinema travel gothic premium keraton
#   [domain]  optional custom domain (no scheme), e.g. wedding.example.com
#             → rewrites W.siteUrl and og: URLs to https://<domain>
#
# Output: dist/ with the theme's index.html at the ROOT, all shared
# files alongside it, and every "../" reference rewritten to "./".
# Upload dist/ to your VM web root (e.g. /var/www/wedding) as-is.
# ===================================================================
set -euo pipefail
cd "$(dirname "$0")"

THEME="${1:-}"
DOMAIN="${2:-}"

usage() {
  echo "Usage: ./deploy.sh <theme> [domain]"
  echo "Themes available:"
  for d in */; do
    [ -f "${d}index.html" ] && [ -f "${d}template-data.js" ] && echo "  ${d%/}"
  done
  exit 1
}

[ -n "$THEME" ] || usage
if [ ! -f "$THEME/index.html" ]; then
  echo "ERROR: theme '$THEME' not found (no $THEME/index.html)."
  usage
fi

echo "==> Building dist/ from theme '$THEME'${DOMAIN:+ for https://$DOMAIN}"

rm -rf dist
mkdir -p dist

# --- theme files at the root of dist/ ---
cp "$THEME/index.html" dist/index.html
[ -f "$THEME/template-data.js" ] && cp "$THEME/template-data.js" dist/
[ -d "$THEME/assets" ] && cp -R "$THEME/assets" dist/assets

# --- shared files ---
for f in data.js firebase.js music.js fx.js opener.js config.example.js; do
  [ -f "$f" ] && cp "$f" dist/ || echo "    (skipping missing $f)"
done
cp -R photos dist/photos

# --- rewrite ../ → ./ so root-level layout works (HTML + JS copied above) ---
echo "==> Rewriting ../ references to ./"
for f in dist/index.html dist/*.js; do
  [ -f "$f" ] || continue
  sed -i.bak 's|\.\./|./|g' "$f" && rm -f "$f.bak"
done

# --- optional: point site URL + og: tags at the custom domain ---
if [ -n "$DOMAIN" ]; then
  DOMAIN="${DOMAIN#https://}"; DOMAIN="${DOMAIN#http://}"; DOMAIN="${DOMAIN%/}"
  OLD_URL=$(node -e '
    const fw = {};
    new Function("window", require("fs").readFileSync("data.js", "utf8"))(fw);
    process.stdout.write((fw.WEDDING && fw.WEDDING.siteUrl || "").replace(/\/+$/, ""));
  ' 2>/dev/null || true)
  if [ -n "$OLD_URL" ]; then
    echo "==> Rewriting $OLD_URL → https://$DOMAIN (data.js + og: tags)"
    for f in dist/data.js dist/index.html dist/template-data.js; do
      [ -f "$f" ] || continue
      sed -i.bak "s|$OLD_URL|https://$DOMAIN|g" "$f" && rm -f "$f.bak"
    done
  else
    echo "    WARNING: couldn't read W.siteUrl from data.js — og: URLs NOT rewritten."
  fi
fi

echo
echo "==> Done. dist/ contents:"
ls -1 dist
echo
echo "-------------------------------------------------------------------"
echo " POST-DEPLOY REMINDERS"
echo "   1. Run  node check.js  first — fix any FAILs before going live."
echo "   2. Copy config.local.js into the web root MANUALLY — it holds the"
echo "      real Firebase keys and is git-ignored, so it is NOT in dist/."
echo "      (cp config.local.js dist/  before uploading, or scp it to the VM.)"
if [ -n "$DOMAIN" ]; then
  echo "   3. Firebase console → Authentication → Settings → Authorized"
  echo "      domains → add  $DOMAIN  (otherwise auth/Firestore requests fail)."
  echo "   4. Point your domain's A/AAAA record at the VM and serve dist/"
  echo "      with nginx/Caddy (HTTPS via Let's Encrypt)."
else
  echo "   3. If you use a custom domain later, re-run with:"
  echo "        ./deploy.sh $THEME yourdomain.com"
  echo "      and add that domain to Firebase → Authorized domains."
fi
echo "-------------------------------------------------------------------"
