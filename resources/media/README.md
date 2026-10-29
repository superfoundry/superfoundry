# resources/media

Every video on the site ships as two files with the same name:

- `name.mp4`: H.264 + AAC, 1920×1080 (16:9). The fallback every browser can play, Safari included.
- `name.webm`: AV1 + Opus, made from the MP4 with `./encode-av1.sh name.mp4`. About half the
  download at the same look, for browsers that can play AV1 (Chrome, Firefox, Edge, Android,
  recent Apple hardware).
- `name.jpg`: a 1280×720 poster frame.

Markup lists the WebM first so a browser takes it when it can, and falls back to the MP4:

```html
<video poster="media/name.jpg" ...>
  <source src="media/name.webm" type='video/webm; codecs="av01.0.08M.08, opus"'>
  <source src="media/name.mp4" type="video/mp4">
</video>
```

Where a script sets a video's `src` directly (the lightbox on `/resources/`), it checks
`video.canPlayType('video/webm; codecs="av01.0.08M.08, opus"')` first and uses the WebM
only when that answers.
