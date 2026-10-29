#!/usr/bin/env bash
# Make the AV1 WebM that sits beside each MP4 on the site. Browsers that can play AV1
# (Chrome, Firefox, Edge, Android, recent Apple hardware) get the WebM, about half the
# download at the same look; everything else falls back to the MP4, which stays as is.
#
#   resources/media/encode-av1.sh resources/media/name.mp4      ->  resources/media/name.webm
#
# Settings: SVT-AV1 at CRF 40 / preset 6, 8-bit 4:2:0, a keyframe every 5 s for seeking,
# Opus audio at 96 kb/s, and the index moved to the front so playback starts streaming.
set -euo pipefail
in="$1"; out="${2:-${in%.*}.webm}"
ffmpeg -hide_banner -loglevel error -stats -y -i "$in" \
  -map 0:v:0 -map 0:a:0? \
  -c:v libsvtav1 -preset 6 -crf 40 -pix_fmt yuv420p -svtav1-params keyint=5s \
  -c:a libopus -b:a 96k \
  -cues_to_front 1 "$out"
echo "$out: $(du -h "$out" | cut -f1) (mp4: $(du -h "$in" | cut -f1))"
