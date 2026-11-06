# Two Cylinders, One Friction

A narrated explainer on problem 25 of rotational mechanics: two cylinders with
radii r1, r2 and moments of inertia I1, I2 spin at w1, w2, are brought into
contact with parallel axes, slip against each other, and finally roll without
slipping. The video derives the final angular speeds.

- Language: English, Kokoro-82M voice `am_michael`
- 1920x1080, 30 fps, 11 scenes
- Scene length is derived from the measured audio (`scripts/tts_kokoro.py` writes
  `src/manifest.json`), never typed by hand.

Render happens in GitHub Actions (`.github/workflows/render.yml`): TTS ->
typecheck -> remotion render -> level -> QA -> artifact `video`.
