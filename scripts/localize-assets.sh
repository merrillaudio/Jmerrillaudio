#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# localize-assets.sh
#
# Every image on this site currently loads from Manus's CloudFront bucket:
#   https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/...
#
# That is a Manus-controlled path. If they expire it, the site goes imageless.
# This script downloads each image into client/public/images/ and rewrites the
# source files to point at local paths instead.
#
# Run it once, from the project root, on your own machine:
#   bash scripts/localize-assets.sh
#
# Then check `git diff`, run `npm run dev`, and confirm the images still show.
# ---------------------------------------------------------------------------
set -euo pipefail

CDN_HOST="d2xsxph8kpxj0f.cloudfront.net"
OUT_DIR="client/public/images"

if [ ! -d "client/src" ]; then
  echo "Run this from the project root (the folder containing client/)." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# Collect every distinct CDN URL referenced in the source.
mapfile -t URLS < <(
  grep -roh "https://${CDN_HOST}/[^\"')[:space:]]*" client/src \
    | grep -E '\.(png|jpe?g|webp|gif|svg|JPG|JPEG|PNG|WEBP)$' \
    | sort -u
)

if [ "${#URLS[@]}" -eq 0 ]; then
  echo "No CDN image URLs found — already localized?"
  exit 0
fi

echo "Found ${#URLS[@]} images."

for url in "${URLS[@]}"; do
  # Decode %20 and friends into a safe, flat filename.
  raw_name="${url##*/}"
  name="$(printf '%b' "${raw_name//%/\\x}")"
  name="$(echo "$name" | tr ' ' '-' | tr -cd '[:alnum:]._-')"

  if [ -f "$OUT_DIR/$name" ]; then
    echo "  skip (have it)  $name"
  else
    echo "  downloading     $name"
    if ! curl -fsSL --retry 3 -o "$OUT_DIR/$name" "$url"; then
      echo "  !! FAILED: $url" >&2
      echo "  !! Leaving this reference pointing at the CDN." >&2
      continue
    fi
  fi

  # Rewrite every reference to this URL to the local path.
  grep -rl --null "$url" client/src 2>/dev/null \
    | xargs -0 -r sed -i.bak "s|${url}|/images/${name}|g"
done

find client/src -name '*.bak' -delete

echo
echo "Done. Images are in $OUT_DIR and references now use /images/<file>."
echo "Remaining CDN references (should be zero):"
grep -rn "$CDN_HOST" client/src || echo "  none"
