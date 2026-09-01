#!/usr/bin/env bash
# Prenese vse slike, ki jih vsebina še vedno referencira s stare domene,
# in jih shrani v public/uploads/... na pravilna mesta (poti so že
# posodobljene v vsebini - ta skripta samo poskrbi, da datoteke dejansko
# obstajajo).
#
# Poženi iz korena projekta:
#   bash scripts/download-legacy-images.sh
#
# POMEMBNO: poženi to PRED ugasnitvijo starega WordPressa (dream-explorer.com) -
# po ugasnitvi teh slik ni več mogoče pridobiti.

set -e

MANIFEST="$(dirname "$0")/image-manifest.json"
PUBLIC_DIR="$(dirname "$0")/../public"

if ! command -v jq >/dev/null 2>&1; then
  echo "Ta skripta potrebuje 'jq' (za branje JSON manifesta)."
  echo "Namesti ga npr. z: brew install jq   (macOS)   ali   apt install jq   (Linux)"
  exit 1
fi

count=$(jq length "$MANIFEST")
echo "Prenašam $count slik iz $MANIFEST ..."

failed=0

for i in $(seq 0 $((count - 1))); do
  src=$(jq -r ".[$i].source_url" "$MANIFEST")
  dest=$(jq -r ".[$i].dest_path" "$MANIFEST")
  full_dest="$PUBLIC_DIR$dest"

  mkdir -p "$(dirname "$full_dest")"

  if [ -f "$full_dest" ]; then
    echo "  [obstaja] $dest"
    continue
  fi

  echo "  [prenašam] $src -> $dest"
  if ! curl -sSL --fail -o "$full_dest" "$src"; then
    echo "  [NAPAKA] ni bilo mogoče prenesti: $src"
    failed=$((failed + 1))
  fi
done

echo ""
if [ "$failed" -eq 0 ]; then
  echo "Vse slike uspešno prenesene."
else
  echo "$failed slik ni bilo mogoče prenesti — preveri izpis zgoraj."
fi
