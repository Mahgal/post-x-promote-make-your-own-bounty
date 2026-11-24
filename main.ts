// post-x-promote-make-your-own-bounty-01: entry for make.fun's
// "Promote make.fun's make-your-own-bounty post on X".
// Deterministic, standard library only, no network: copies POST.json
// (the X post's address) and the promo image into MAKEFUN_OUTPUT_DIR
// and writes the post metadata beside them.
// Run: MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Re-running produces byte-identical files and identical stdout.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT: string = dirname(fileURLToPath(import.meta.url));
const BOT_DIR: string = process.env.MAKEFUN_BOT_DIR ?? ROOT;
const OUT: string = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';

const IMAGE_NAME = 'bounty-promo.png';
const imagePath: string = join(ROOT, 'assets', IMAGE_NAME);
const image: Buffer = readFileSync(imagePath);
// PNG signature: 8 bytes 89 50 4E 47 0D 0A 1A 0A. Fail loudly if the asset is not a PNG.
const PNG_SIGNATURE: Buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (image.length < 24 || !image.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error('bounty-promo.png is not a PNG: bad signature');
}
// PNG IHDR: width = bytes 16..19, height = bytes 20..23, big-endian.
const width: number = image.readUInt32BE(16);
const height: number = image.readUInt32BE(20);
const sha256: string = createHash('sha256').update(image).digest('hex');

const postJsonPath: string = join(BOT_DIR, 'POST.json');
const postJsonText: string = readFileSync(postJsonPath, 'utf8');
const postUrl: string = (JSON.parse(postJsonText) as { url: string }).url;
if (!/^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/.test(postUrl)) {
  throw new Error(`POST.json does not name a real X post yet: ${postUrl}`);
}
const postText: string = readFileSync(join(ROOT, 'post.txt'), 'utf8');

const metadata = {
  competition: 'post-x-promote-make-your-own-bounty-01',
  title: 'Promote make-your-own-bounty',
  image: {
    file: IMAGE_NAME,
    width,
    height,
    bytes: image.length,
    sha256,
  },
  post: postText,
  post_url: postUrl,
  play_code: 'makefun-duck-apron-tofu',
  bounty: 'https://make.fun/bounty/post-x-promote-make-your-own-bounty-01',
  account: '@Borjigin_Mahgal',
};

mkdirSync(OUT, { recursive: true });
copyFileSync(postJsonPath, join(OUT, 'POST.json'));
copyFileSync(imagePath, join(OUT, IMAGE_NAME));
// Verify the copy: read it back and confirm its SHA-256 matches the source.
const copiedHash: string = createHash('sha256').update(readFileSync(join(OUT, IMAGE_NAME))).digest('hex');
if (copiedHash !== sha256) {
  throw new Error(`copy verification failed for ${IMAGE_NAME}: hash mismatch`);
}
const metadataJson: string = JSON.stringify(metadata, null, 2) + '\n';
writeFileSync(join(OUT, 'post.json'), metadataJson);
process.stdout.write(metadataJson);
