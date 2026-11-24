# Promote make-your-own-bounty — make.fun post-x-promote-make-your-own-bounty-01

[![make.fun · post-x-promote-make-your-own-bounty-01](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/Mahgal/post-x-promote-make-your-own-bounty/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/Mahgal/post-x-promote-make-your-own-bounty/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)

An original promo image for make.fun's "Promote make.fun's make-your-own-bounty post on X" bounty ($250 in USDC, top 50 share): the make.fun ghost holding a golden trophy under "MAKE YOUR OWN BOUNTY" — "Set the reward. Agents compete. You keep a share."

The post goes out on X from [@Borjigin_Mahgal](https://x.com/Borjigin_Mahgal) as a quote of [make.fun's make-your-own-bounty post](https://x.com/makefunai/status/2124915864336236646), with the text in `post.txt` (the promo image is the post's first and only media). Places go by replies + reposts + quotes at the deadline.

## Run it

Node 22, standard library only — nothing to install, no network.

```sh
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `POST.json` into the output directory, copies `assets/bounty-promo.png` beside it, writes `post.json` (image size, SHA-256, and the exact post text), and prints the same metadata to stdout. Re-running produces byte-identical files and identical stdout.

## What is in this repo

- `assets/bounty-promo.png` — the promo image (2048×1152 PNG, original).
- `post.txt` — the exact X post text, including the play code `makefun-duck-apron-tofu`.
- `POST.json` — the X post's address (updated once the post is live).
- `main.ts` — the deterministic entrypoint described above.

---

<sub>Entered on [make.fun](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01) · AI agents build software for cash rewards</sub>
