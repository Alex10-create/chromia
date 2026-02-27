import { makeRng } from './prng';

export function generatePattern(seed) {
  const rng = makeRng(seed * 23 + 13);
  const R = []; let id = 0;
  const t = seed % 5;

  if (t === 0) {
    const c = 3 + Math.floor(rng() * 3), r = 3 + Math.floor(rng() * 3), w = 340 / c, hh = 340 / r;
    for (let ri = 0; ri < r; ri++) for (let ci = 0; ci < c; ci++) {
      const x = 30 + ci * w, y = 30 + ri * hh;
      if ((ri + ci) % 2 === 0) R.push({ id: `r${id++}`, d: `M${x},${y} L${x + w},${y} L${x + w},${y + hh} L${x},${y + hh} Z`, fill: "#fff" });
      else R.push({ id: `r${id++}`, d: `M${x + w / 2},${y} L${x + w},${y + hh / 2} L${x + w / 2},${y + hh} L${x},${y + hh / 2} Z`, fill: "#fff" });
    }
  } else if (t === 1) {
    const n = 4 + Math.floor(rng() * 4);
    for (let i = n; i > 0; i--) {
      const r = (i / n) * 165, ri = ((i - 1) / n) * 165;
      R.push({ id: `r${id++}`, d: `M200,${200 - r} A${r},${r} 0 1,1 200,${200 + r} A${r},${r} 0 1,1 200,${200 - r} M200,${200 - ri} A${ri},${ri} 0 1,0 200,${200 + ri} A${ri},${ri} 0 1,0 200,${200 - ri}`, fill: "#fff" });
    }
  } else if (t === 2) {
    const s = 40 + rng() * 20;
    const hp = (hcx, hcy) => { let p = []; for (let i = 0; i < 6; i++) { const a = (60 * i - 30) * Math.PI / 180; p.push(`${hcx + s * Math.cos(a)},${hcy + s * Math.sin(a)}`); } return `M${p.join(" L")} Z`; };
    const dx = s * Math.sqrt(3), dy = s * 1.5;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const hcx = 72 + c * dx + (r % 2) * dx / 2, hcy = 72 + r * dy;
      if (hcx < 378 && hcy < 378) R.push({ id: `r${id++}`, d: hp(hcx, hcy), fill: "#fff" });
    }
  } else if (t === 3) {
    const n = 3 + Math.floor(rng() * 3);
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const scx = 70 + c * (260 / (n - 1 || 1)), scy = 70 + r * (260 / (n - 1 || 1)), sr = 20 + rng() * 12, ir = sr * .4;
      let p = []; for (let i = 0; i < 10; i++) { const rr = i % 2 === 0 ? sr : ir, a = (36 * i - 90) * Math.PI / 180; p.push(`${scx + rr * Math.cos(a)},${scy + rr * Math.sin(a)}`); }
      R.push({ id: `r${id++}`, d: `M${p.join(" L")} Z`, fill: "#fff" });
    }
  } else {
    const bands = 4 + Math.floor(rng() * 3), bh = 340 / bands;
    for (let i = 0; i < bands; i++) {
      const y = 30 + i * bh, z = 15 + rng() * 20;
      R.push({ id: `r${id++}`, d: `M30,${y} L100,${y + z} L170,${y} L240,${y + z} L310,${y} L370,${y + z} L370,${y + bh} L310,${y + bh - z} L240,${y + bh} L170,${y + bh - z} L100,${y + bh} L30,${y + bh - z} Z`, fill: "#fff" });
    }
  }
  return R;
}
