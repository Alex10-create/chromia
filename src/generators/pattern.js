import { makeRng } from './prng';

export function generatePattern(seed) {
  const rng = makeRng(seed * 23 + 13);
  const R = []; let id = 0;
  const t = Math.floor(rng() * 10);
  const circ = (cx, cy, r) => `M${cx},${cy}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;

  if (t === 0) {
    // Checkerboard — varied grid size and alternate cell style
    const cols = 3 + Math.floor(rng() * 4);
    const rows = 3 + Math.floor(rng() * 4);
    const w = 340 / cols, h = 340 / rows;
    const altStyle = Math.floor(rng() * 3); // 0=diamond, 1=small square, 2=circle
    for (let ri = 0; ri < rows; ri++) for (let ci = 0; ci < cols; ci++) {
      const x = 30 + ci * w, y = 30 + ri * h;
      if ((ri + ci) % 2 === 0) {
        R.push({ id: `r${id++}`, d: `M${x},${y}L${x+w},${y}L${x+w},${y+h}L${x},${y+h}Z`, fill: "#fff" });
      } else if (altStyle === 0) {
        R.push({ id: `r${id++}`, d: `M${x+w/2},${y}L${x+w},${y+h/2}L${x+w/2},${y+h}L${x},${y+h/2}Z`, fill: "#fff" });
      } else if (altStyle === 1) {
        const m = w * 0.22;
        R.push({ id: `r${id++}`, d: `M${x+m},${y+m}L${x+w-m},${y+m}L${x+w-m},${y+h-m}L${x+m},${y+h-m}Z`, fill: "#fff" });
      } else {
        const cr = Math.min(w, h) * 0.3;
        R.push({ id: `r${id++}`, d: circ(x + w / 2, y + h / 2, cr), fill: "#fff" });
      }
    }
  } else if (t === 1) {
    // Concentric rings divided into sectors (dartboard)
    const rings = 3 + Math.floor(rng() * 5);
    const sectors = 4 + Math.floor(rng() * 8);
    for (let ri = 0; ri < rings; ri++) {
      const iR = (ri / rings) * 170;
      const oR = ((ri + 1) / rings) * 170;
      for (let si = 0; si < sectors; si++) {
        if ((ri + si) % 2 === 0) {
          const a1 = (360 / sectors) * si;
          const a2 = (360 / sectors) * (si + 1);
          const r1 = (a1 - 90) * Math.PI / 180;
          const r2 = (a2 - 90) * Math.PI / 180;
          const ox1 = 200 + oR * Math.cos(r1), oy1 = 200 + oR * Math.sin(r1);
          const ox2 = 200 + oR * Math.cos(r2), oy2 = 200 + oR * Math.sin(r2);
          if (iR < 1) {
            R.push({ id: `r${id++}`, d: `M200,200L${ox1},${oy1}A${oR},${oR} 0 0,1 ${ox2},${oy2}Z`, fill: "#fff" });
          } else {
            const ix1 = 200 + iR * Math.cos(r1), iy1 = 200 + iR * Math.sin(r1);
            const ix2 = 200 + iR * Math.cos(r2), iy2 = 200 + iR * Math.sin(r2);
            R.push({ id: `r${id++}`, d: `M${ix1},${iy1}L${ox1},${oy1}A${oR},${oR} 0 0,1 ${ox2},${oy2}L${ix2},${iy2}A${iR},${iR} 0 0,0 ${ix1},${iy1}`, fill: "#fff" });
          }
        }
      }
    }
  } else if (t === 2) {
    // Hexagonal tessellation
    const sz = 28 + rng() * 35;
    const hasInner = rng() > 0.5;
    const hex = (hcx, hcy, s) => {
      let p = [];
      for (let i = 0; i < 6; i++) {
        const a = (60 * i - 30) * Math.PI / 180;
        p.push(`${hcx + s * Math.cos(a)},${hcy + s * Math.sin(a)}`);
      }
      return `M${p.join("L")}Z`;
    };
    const dx = sz * Math.sqrt(3), dy = sz * 1.5;
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
      const hcx = 45 + c * dx + (r % 2) * dx / 2;
      const hcy = 45 + r * dy;
      if (hcx > 10 && hcx < 390 && hcy > 10 && hcy < 390) {
        R.push({ id: `r${id++}`, d: hex(hcx, hcy, sz * 0.92), fill: "#fff" });
        if (hasInner) R.push({ id: `r${id++}`, d: hex(hcx, hcy, sz * 0.42), fill: "#fff" });
      }
    }
  } else if (t === 3) {
    // Star grid — varied point count and grid size
    const gn = 2 + Math.floor(rng() * 3);
    const pts = 4 + Math.floor(rng() * 5);
    const cellW = 300 / gn;
    for (let r = 0; r < gn; r++) for (let c = 0; c < gn; c++) {
      const scx = 50 + c * cellW + cellW / 2;
      const scy = 50 + r * cellW + cellW / 2;
      const oR = cellW * (0.32 + rng() * 0.1);
      const iR = oR * (0.3 + rng() * 0.15);
      let sp = [];
      for (let i = 0; i < pts * 2; i++) {
        const rr = i % 2 === 0 ? oR : iR;
        const a = ((360 / (pts * 2)) * i - 90) * Math.PI / 180;
        sp.push(`${scx + rr * Math.cos(a)},${scy + rr * Math.sin(a)}`);
      }
      R.push({ id: `r${id++}`, d: `M${sp.join("L")}Z`, fill: "#fff" });
      // Center dot
      const dr = oR * 0.15;
      R.push({ id: `r${id++}`, d: circ(scx, scy, dr), fill: "#fff" });
    }
  } else if (t === 4) {
    // Zigzag wave bands
    const bands = 3 + Math.floor(rng() * 5);
    const bh = 340 / bands;
    for (let i = 0; i < bands; i++) {
      const y = 30 + i * bh;
      const peaks = 2 + Math.floor(rng() * 4);
      const amp = bh * (0.15 + rng() * 0.3);
      const segW = 340 / peaks;
      let topPts = [], botPts = [];
      for (let p = 0; p <= peaks; p++) {
        const x = Math.min(30 + p * segW, 370);
        topPts.push(`${x},${y + (p % 2 === 0 ? 0 : amp)}`);
        botPts.push(`${x},${y + bh + (p % 2 === 0 ? 0 : -amp)}`);
      }
      R.push({ id: `r${id++}`, d: `M${topPts.join(' L')} L${botPts.reverse().join(' L')} Z`, fill: "#fff" });
    }
  } else if (t === 5) {
    // Fish scales — overlapping semicircular shapes
    const cols = 4 + Math.floor(rng() * 4);
    const rows = 5 + Math.floor(rng() * 4);
    const w = 380 / cols;
    const h = w * 0.65;
    for (let ri = 0; ri < rows; ri++) for (let ci = -1; ci <= cols; ci++) {
      const x = 10 + ci * w + (ri % 2 ? w / 2 : 0);
      const y = 20 + ri * h;
      if (x > -w / 2 && x + w < 420 && y < 390) {
        const mx = x + w / 2;
        R.push({ id: `r${id++}`, d: `M${x},${y} Q${x},${y + h * 1.2} ${mx},${y + h} Q${x + w},${y + h * 1.2} ${x + w},${y} Z`, fill: "#fff" });
      }
    }
  } else if (t === 6) {
    // Triangle tessellation
    const cols = 4 + Math.floor(rng() * 4);
    const rows = 4 + Math.floor(rng() * 3);
    const w = 340 / cols;
    const h = 340 / rows;
    for (let ri = 0; ri < rows; ri++) for (let ci = 0; ci < cols; ci++) {
      const x = 30 + ci * w + (ri % 2 ? w / 2 : 0);
      const y = 30 + ri * h;
      if (x + w <= 385) {
        R.push({ id: `r${id++}`, d: `M${x},${y + h}L${x + w / 2},${y}L${x + w},${y + h}Z`, fill: "#fff" });
      }
      // Inverted triangle
      if (ci > 0 && x >= 30) {
        R.push({ id: `r${id++}`, d: `M${x - w / 2},${y}L${x},${y + h}L${x + w / 2},${y}Z`, fill: "#fff" });
      }
    }
  } else if (t === 7) {
    // Dot grid — circles of varying sizes
    const n = 3 + Math.floor(rng() * 4);
    const gap = 340 / n;
    const sizeVary = rng() > 0.5;
    const hasRing = rng() > 0.5;
    for (let ri = 0; ri < n; ri++) for (let ci = 0; ci < n; ci++) {
      const cx = 30 + gap / 2 + ci * gap;
      const cy = 30 + gap / 2 + ri * gap;
      const r = sizeVary ? (10 + rng() * gap * 0.32) : gap * 0.3;
      R.push({ id: `r${id++}`, d: circ(cx, cy, r), fill: "#fff" });
      if (hasRing && r > 14) {
        R.push({ id: `r${id++}`, d: circ(cx, cy, r * 0.5), fill: "#fff" });
      }
    }
  } else if (t === 8) {
    // Cross / plus grid
    const n = 2 + Math.floor(rng() * 3);
    const gap = 340 / n;
    const armW = gap * (0.12 + rng() * 0.08);
    const armL = gap * (0.33 + rng() * 0.1);
    for (let ri = 0; ri < n; ri++) for (let ci = 0; ci < n; ci++) {
      const cx = 30 + gap / 2 + ci * gap;
      const cy = 30 + gap / 2 + ri * gap;
      R.push({ id: `r${id++}`, d: `M${cx-armW},${cy-armL}L${cx+armW},${cy-armL}L${cx+armW},${cy-armW}L${cx+armL},${cy-armW}L${cx+armL},${cy+armW}L${cx+armW},${cy+armW}L${cx+armW},${cy+armL}L${cx-armW},${cy+armL}L${cx-armW},${cy+armW}L${cx-armL},${cy+armW}L${cx-armL},${cy-armW}L${cx-armW},${cy-armW}Z`, fill: "#fff" });
      // Corner dot
      R.push({ id: `r${id++}`, d: circ(cx, cy, armW * 0.8), fill: "#fff" });
    }
  } else {
    // Brick / wall pattern
    const cols = 3 + Math.floor(rng() * 3);
    const rows = 5 + Math.floor(rng() * 4);
    const bw = 340 / cols, bh = 340 / rows;
    const g = 2 + rng() * 3;
    for (let ri = 0; ri < rows; ri++) for (let ci = -1; ci <= cols; ci++) {
      const x = 30 + ci * bw + (ri % 2 ? bw / 2 : 0);
      const y = 30 + ri * bh;
      if (x + g > 28 && x + bw - g < 373 && y + bh - g < 373) {
        const x1 = Math.max(x + g, 30), y1 = y + g;
        const x2 = Math.min(x + bw - g, 370), y2 = y + bh - g;
        if (x2 > x1) {
          R.push({ id: `r${id++}`, d: `M${x1},${y1}L${x2},${y1}L${x2},${y2}L${x1},${y2}Z`, fill: "#fff" });
        }
      }
    }
  }

  return R;
}
