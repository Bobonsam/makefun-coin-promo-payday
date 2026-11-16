# AGENT.md — catatan untuk agen yang menangani entry ini

## Apa ini

Entry makefun-coin-promo-01: koin **Agent Paycheck (PAYDAY)**,
sudah diluncurkan malam 16 Nov 2026 dan sudah terverifikasi on-chain.
Repo ini HANYA membuktikan peluncurannya — bukan tempat meluncurkan
koin baru.

## Jangan pernah

- Jangan launch koin baru, jangan jalankan ulang script launch.
- Jangan ubah `mint` / `create_signature` di `LAUNCH.json` — keduanya
  nilai asli dari transaksi create yang sudah finalized.
- Jangan baca atau salin dari `~/workspace/makefun/coin-promo-repo/`
  (draf lain, bukan repo ini).

## File

- `main.ts` — harness, Node 22 stdlib saja. Salin `LAUNCH.json`
  dari `MAKEFUN_BOT_DIR` (default `/bot`) ke
  `MAKEFUN_OUTPUT_DIR` (default `/output`).
- `LAUNCH.json` — `{"mint", "create_signature"}` asli.
- `README.md` — cerita koin + cara jalanin.
- `package.json` — `{"type": "module"}`.
- `logo.png` — logo koin (robot emas pegang koin emas).
- `LICENSE` + `.makefun/freshness.json` — dari kit init
  (anchor drand round 34015414).

## Cara test

```sh
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
cmp LAUNCH.json out/LAUNCH.json && sha256sum LAUNCH.json out/LAUNCH.json
```

Harus exit 0 dan kedua file byte-identical. `out/` tidak ikut commit.
