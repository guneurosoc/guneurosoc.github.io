// Regenerates public/video/how-to-join.{mp4,webm} and the poster from video/how-to-join.mp4. Run: pnpm video:build
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const SRC = 'video/how-to-join.mp4';
const OUT = 'public/video';
const VIDEO_KBPS = 320; // lower this if the MP4 comes out over 2,000,000 bytes
const POSTER_AT = '1.5'; // seconds: the "How to become a Neuroscience Society Member" title card
const MAX_MP4 = 2_000_000;
const NULL = process.platform === 'win32' ? 'NUL' : '/dev/null';

mkdirSync(OUT, { recursive: true });
const log = join(tmpdir(), 'neurosoc-ffmpeg2pass');
const run = (args) => {
  console.log('ffmpeg ' + args.join(' '));
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
};

// MP4: H.264 two-pass + AAC
const x264 = ['-i', SRC, '-c:v', 'libx264', '-preset', 'slow', '-b:v', `${VIDEO_KBPS}k`, '-pix_fmt', 'yuv420p', '-passlogfile', log];
run([...x264, '-pass', '1', '-an', '-f', 'null', NULL]);
run([...x264, '-pass', '2', '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', `${OUT}/how-to-join.mp4`]);

// WebM: VP9 two-pass + Opus
const vp9 = ['-i', SRC, '-c:v', 'libvpx-vp9', '-b:v', `${VIDEO_KBPS}k`, '-row-mt', '1', '-pix_fmt', 'yuv420p', '-passlogfile', log];
run([...vp9, '-pass', '1', '-an', '-f', 'null', NULL]);
run([...vp9, '-pass', '2', '-c:a', 'libopus', '-b:a', '64k', `${OUT}/how-to-join.webm`]);

// Poster: one frame, JPEG quality ~80 (-q:v 5 on ffmpeg's 2–31 scale)
run(['-ss', POSTER_AT, '-i', SRC, '-frames:v', '1', '-q:v', '5', `${OUT}/how-to-join-poster.jpg`]);

// public/video/how-to-join.vtt is hand-timed and edited directly; this script does not touch it (docs/VIDEO.md).

for (const f of ['-0.log', '-0.log.mbtree']) rmSync(log + f, { force: true });
const size = statSync(`${OUT}/how-to-join.mp4`).size;
console.log(`how-to-join.mp4: ${size} bytes`);
if (size > MAX_MP4) {
  console.error(`MP4 is over ${MAX_MP4} bytes; lower VIDEO_KBPS in scripts/build-video.mjs`);
  process.exit(1);
}
