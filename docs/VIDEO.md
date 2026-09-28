# Join video

The Join page plays the committee's "how to join" video from `public/video/`. Those files are
generated from the original in `video/how-to-join.mp4`; don't edit them by hand (except the
captions, below).

| File | What it is |
| --- | --- |
| `public/video/how-to-join.mp4` | H.264 + AAC, 720×1280, `+faststart`, must be ≤ 2,000,000 bytes |
| `public/video/how-to-join.webm` | VP9 + Opus, same size and bitrate |
| `public/video/how-to-join-poster.jpg` | Still shown before playing (the title card at 1.5 s) |
| `public/video/how-to-join.vtt` | Captions, written by hand (see below) |

## Replacing the video

1. Put the new video at `video/how-to-join.mp4` (portrait, 720×1280 ideally).
2. Run `pnpm install` once (it downloads ffmpeg via the `ffmpeg-static` package), then
   `pnpm video:build`. It takes a few minutes and prints the final MP4 size.
3. If it says the MP4 is over 2,000,000 bytes, lower `VIDEO_KBPS` in
   `scripts/build-video.mjs` and run it again. If the title card is no longer at 1.5 s, change
   `POSTER_AT`.
4. Update the captions (below), then commit `video/` and `public/video/`.

## Captions

`public/video/how-to-join.vtt` is not generated. Its text is the five joining steps, and each
cue starts when that step's on-screen caption appears in the video. If the video or the steps
change, edit the text and times in that file directly. To find the times, play the video and note
when each on-screen step appears (to the nearest half second is fine). Time format is
`hh:mm:ss.mmm --> hh:mm:ss.mmm`.
