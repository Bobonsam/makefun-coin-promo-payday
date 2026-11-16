// Agent Paycheck (PAYDAY) — entry makefun-coin-promo-01.
// Tugas program ini cuma satu: memindahkan LAUNCH.json dari direktori
// bot ke direktori output, tanpa mengubah satu byte pun isinya.
// Tidak ada network, tidak ada tanggal, tidak ada angka acak —
// jadi setiap kali dijalankan, hasilnya selalu sama persis.
//
// v2: sebelum menyalin, isi LAUNCH.json divalidasi dulu — mint dan
// create_signature harus benar-benar nilai asli (base58, panjang
// yang tepat, bukan placeholder). Kalau tidak valid, program gagal
// keras dan tidak menyalin apa pun. Sesudah menyalin, byte file
// tujuan dibaca ulang dan dibandingkan dengan sumbernya.

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "node:fs";
import { join } from "node:path";

const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

function checkField(name, value, length) {
  if (typeof value !== "string") {
    throw new Error(`${name} harus string, dapat ${typeof value}`);
  }
  if (value.length !== length) {
    throw new Error(`${name} harus ${length} karakter, dapat ${value.length}`);
  }
  if (!BASE58.test(value)) {
    throw new Error(`${name} bukan base58 yang valid`);
  }
  if (/^1+$/.test(value)) {
    throw new Error(`${name} masih placeholder, bukan nilai asli`);
  }
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourceFile = join(botDir, "LAUNCH.json");
const targetFile = join(outputDir, "LAUNCH.json");

if (!existsSync(sourceFile)) {
  throw new Error(`LAUNCH.json tidak ditemukan di ${sourceFile}`);
}

// Validasi dulu, salin belakangan — file jelek tidak boleh lolos.
const launch = JSON.parse(readFileSync(sourceFile, "utf8"));
checkField("mint", launch.mint, 44);
checkField("create_signature", launch.create_signature, 87);

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceFile, targetFile);

// Verifikasi pasca-salin: tujuan harus byte-identical dengan sumber.
if (!readFileSync(targetFile).equals(readFileSync(sourceFile))) {
  throw new Error(`${targetFile} tidak sama dengan ${sourceFile}`);
}
