import { polarXY, makeRng } from './prng';

export function generateMandala(seed) {
  const rng = makeRng(seed * 7 + 3);
  const R = []; let id = 0;
  const cx = 200, cy = 200;
  const style = Math.floor(rng() * 6);
  const petals = [4, 5, 6, 7, 8, 9, 10, 12][Math.floor(rng() * 8)];

  if (style === 0) {
    const layers = 2 + Math.floor(rng() * 3);
    for (let L = 0; L < layers; L++) {
      const ri = 20 + L * (140 / layers), ro = ri + 120 / layers;
      const offset = L % 2 === 0 ? 0 : (180 / petals);
      for (let i = 0; i < petals; i++) {
        const a1 = (360 / petals) * i + offset, a2 = a1 + 180 / petals, a3 = a1 + 360 / petals;
        const [x1, y1] = polarXY(cx, cy, ri, a1);
        const [x2, y2] = polarXY(cx, cy, ro, a2);
        const [x3, y3] = polarXY(cx, cy, ri, a3);
        R.push({ id: `r${id++}`, d: `M${cx},${cy} L${x1},${y1} Q${x2},${y2} ${x3},${y3} Z`, fill: "#fff" });
      }
    }
  } else if (style === 1) {
    const ro = 70 + rng() * 40;
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i;
      const [tx, ty] = polarXY(cx, cy, ro, a);
      const [lx, ly] = polarXY(cx, cy, 20, a - 20);
      const [rx, ry] = polarXY(cx, cy, 20, a + 20);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${lx},${ly} ${tx},${ty} Q${rx},${ry} ${cx},${cy}`, fill: "#fff" });
      const [dx, dy] = polarXY(cx, cy, ro + 18, a);
      R.push({ id: `r${id++}`, d: `M${dx},${dy} m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0`, fill: "#fff" });
    }
    for (let i = 0; i < petals; i++) {
      const a1 = (360 / petals) * i, a2 = (360 / petals) * ((i + 1) % petals);
      const [x1, y1] = polarXY(cx, cy, ro + 18, a1);
      const [x2, y2] = polarXY(cx, cy, ro + 18, a2);
      const [mx, my] = polarXY(cx, cy, ro + 35, (a1 + a2) / 2);
      R.push({ id: `r${id++}`, d: `M${x1},${y1} Q${mx},${my} ${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    }
  } else if (style === 2) {
    const n = petals;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [ox, oy] = polarXY(cx, cy, 55, a);
      const [lx, ly] = polarXY(cx, cy, 30, a - 360 / n / 2);
      const [rx, ry] = polarXY(cx, cy, 30, a + 360 / n / 2);
      R.push({ id: `r${id++}`, d: `M${lx},${ly} L${ox},${oy} L${rx},${ry} Z`, fill: "#fff" });
    }
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i + 180 / n;
      const [t, tt] = polarXY(cx, cy, 100, a);
      const [l, ll] = polarXY(cx, cy, 80, a - 12);
      const [r2, rr] = polarXY(cx, cy, 80, a + 12);
      const [b, bb] = polarXY(cx, cy, 65, a);
      R.push({ id: `r${id++}`, d: `M${t},${tt} L${l},${ll} L${b},${bb} L${r2},${rr} Z`, fill: "#fff" });
    }
    for (let i = 0; i < n; i++) {
      const a1 = (360 / n) * i, a2 = (360 / n) * ((i + 1) % n);
      const [x1, y1] = polarXY(cx, cy, 100, a1 + 180 / n);
      const [x2, y2] = polarXY(cx, cy, 100, a2 + 180 / n);
      const [mx, my] = polarXY(cx, cy, 120, (a1 + a2) / 2 + 180 / n);
      R.push({ id: `r${id++}`, d: `M${x1},${y1} Q${mx},${my} ${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    }
  } else if (style === 3) {
    const arms = petals;
    for (let a = 0; a < arms; a++) {
      const baseAngle = (360 / arms) * a;
      const pts = [];
      for (let t = 0; t <= 8; t++) {
        const angle = baseAngle + t * 12;
        const radius = 20 + t * 14;
        pts.push(polarXY(cx, cy, radius, angle));
      }
      let d = `M${pts[0][0]},${pts[0][1]}`;
      for (let t = 1; t < pts.length; t++) d += ` L${pts[t][0]},${pts[t][1]}`;
      R.push({ id: `r${id++}`, d, fill: "none", stroke: "#aaa", strokeWidth: 3 });
      const [ex, ey] = pts[pts.length - 1];
      R.push({ id: `r${id++}`, d: `M${ex},${ey} m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0`, fill: "#fff" });
    }
    [20, 40, 65].forEach(r => {
      R.push({ id: `r${id++}`, d: `M${cx},${cy - r} A${r},${r} 0 1,1 ${cx},${cy + r} A${r},${r} 0 1,1 ${cx},${cy - r}`, fill: "#fff" });
    });
  } else if (style === 4) {
    const rings = 3 + Math.floor(rng() * 2);
    for (let ring = 0; ring < rings; ring++) {
      const ri = 15 + ring * (150 / rings), ro = ri + 140 / rings - 4;
      const wedges = petals + ring * 2;
      for (let i = 0; i < wedges; i++) {
        const a1 = (360 / wedges) * i + 1, a2 = (360 / wedges) * (i + 1) - 1;
        const [ox1, oy1] = polarXY(cx, cy, ro, a1);
        const [ox2, oy2] = polarXY(cx, cy, ro, a2);
        const [ix1, iy1] = polarXY(cx, cy, ri, a1);
        const [ix2, iy2] = polarXY(cx, cy, ri, a2);
        R.push({ id: `r${id++}`, d: `M${ix1},${iy1} L${ox1},${oy1} A${ro},${ro} 0 0,1 ${ox2},${oy2} L${ix2},${iy2} A${ri},${ri} 0 0,0 ${ix1},${iy1}`, fill: "#fff" });
      }
    }
  } else {
    const outerR = 130, midR = 80, innerR = 45;
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i;
      const [ox, oy] = polarXY(cx, cy, outerR, a);
      const [ml, mly] = polarXY(cx, cy, midR, a - 360 / petals / 3);
      const [mr, mry] = polarXY(cx, cy, midR, a + 360 / petals / 3);
      R.push({ id: `r${id++}`, d: `M${ml},${mly} L${ox},${oy} L${mr},${mry}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    }
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i;
      const [tx, ty] = polarXY(cx, cy, innerR, a);
      const [lx, ly] = polarXY(cx, cy, 15, a - 25);
      const [rx, ry] = polarXY(cx, cy, 15, a + 25);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${lx},${ly} ${tx},${ty} Q${rx},${ry} ${cx},${cy}`, fill: "#fff" });
    }
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i + 180 / petals;
      const [dx, dy] = polarXY(cx, cy, midR - 5, a);
      R.push({ id: `r${id++}`, d: `M${dx},${dy} m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0`, fill: "#fff" });
    }
  }
  R.push({ id: `r${id++}`, d: `M${cx},${cy} m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0`, fill: "#fff" });
  return R;
}
