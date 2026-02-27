import { polarXY, makeRng } from './prng';

export function generateFlower(seed) {
  const rng = makeRng(seed * 13 + 7);
  const R = []; let id = 0;
  const cx = 200, cy = 170;
  const style = Math.floor(rng() * 6);

  if (style === 0) {
    const n = 5 + Math.floor(rng() * 4);
    const pR = 40 + rng() * 25;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [px, py] = polarXY(cx, cy, pR, a);
      const r = 18 + rng() * 8;
      R.push({ id: `r${id++}`, d: `M${px},${py} m-${r},0 a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 -${r * 2},0`, fill: "#fff" });
    }
    R.push({ id: `r${id++}`, d: `M${cx},${cy} m-16,0 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0`, fill: "#fff" });
  } else if (style === 1) {
    const n = 5 + Math.floor(rng() * 3);
    const pLen = 70 + rng() * 30;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [tx, ty] = polarXY(cx, cy, pLen, a);
      const [lx, ly] = polarXY(cx, cy, pLen * 0.3, a - 15);
      const [rx, ry] = polarXY(cx, cy, pLen * 0.3, a + 15);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} L${lx},${ly} L${tx},${ty} L${rx},${ry} Z`, fill: "#fff" });
      const [mx, my] = polarXY(cx, cy, pLen * 0.7, a);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} L${mx},${my}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
    }
    R.push({ id: `r${id++}`, d: `M${cx},${cy} m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0`, fill: "#fff" });
  } else if (style === 2) {
    const n1 = 5 + Math.floor(rng() * 3), n2 = n1 + Math.floor(rng() * 3);
    for (let i = 0; i < n2; i++) {
      const a = (360 / n2) * i;
      const [tx, ty] = polarXY(cx, cy, 80, a);
      const [lx, ly] = polarXY(cx, cy, 30, a - 18);
      const [rx, ry] = polarXY(cx, cy, 30, a + 18);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${lx},${ly} ${tx},${ty} Q${rx},${ry} ${cx},${cy}`, fill: "#fff" });
    }
    for (let i = 0; i < n1; i++) {
      const a = (360 / n1) * i + 180 / n1;
      const [tx, ty] = polarXY(cx, cy, 45, a);
      const [lx, ly] = polarXY(cx, cy, 15, a - 22);
      const [rx, ry] = polarXY(cx, cy, 15, a + 22);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${lx},${ly} ${tx},${ty} Q${rx},${ry} ${cx},${cy}`, fill: "#fff" });
    }
    R.push({ id: `r${id++}`, d: `M${cx},${cy} m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0`, fill: "#fff" });
  } else if (style === 3) {
    const w = 35 + rng() * 15;
    R.push({ id: `r${id++}`, d: `M${cx},${cy - 50} Q${cx - w},${cy - 30} ${cx - w + 5},${cy + 15} Q${cx},${cy + 5} ${cx + w - 5},${cy + 15} Q${cx + w},${cy - 30} ${cx},${cy - 50}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx - 8},${cy - 40} Q${cx},${cy - 55} ${cx + 8},${cy - 40}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx},${cy + 15} L${cx},${cy + 5}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: `M${cx},${cy - 50} Q${cx - 5},${cy - 10} ${cx},${cy + 10}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: `M${cx},${cy - 50} Q${cx + 5},${cy - 10} ${cx},${cy + 10}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: `M${cx},${cy + 60} Q${cx - 40},${cy + 35} ${cx - 35},${cy + 50} Q${cx - 15},${cy + 45} ${cx},${cy + 60}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx},${cy + 80} Q${cx + 45},${cy + 60} ${cx + 40},${cy + 75} Q${cx + 18},${cy + 70} ${cx},${cy + 80}`, fill: "#fff" });
  } else if (style === 4) {
    const spiralPetals = 3 + Math.floor(rng() * 2);
    for (let layer = 0; layer < spiralPetals; layer++) {
      const r = 20 + layer * 22;
      const offsetA = layer * 30;
      const n = 4 + layer;
      for (let i = 0; i < n; i++) {
        const a = (360 / n) * i + offsetA;
        const [tx, ty] = polarXY(cx, cy, r + 15, a);
        const [lx, ly] = polarXY(cx, cy, r - 5, a - 360 / n / 2.5);
        const [rx, ry] = polarXY(cx, cy, r - 5, a + 360 / n / 2.5);
        R.push({ id: `r${id++}`, d: `M${lx},${ly} Q${tx},${ty} ${rx},${ry}`, fill: "#fff", stroke: "#bbb", strokeWidth: 1 });
      }
    }
    R.push({ id: `r${id++}`, d: `M${cx},${cy} m-8,0 a8,6 0 1,0 16,0 a8,6 0 1,0 -16,0`, fill: "#fff" });
  } else {
    const n = 10 + Math.floor(rng() * 4);
    const pLen = 50 + rng() * 20;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [tx, ty] = polarXY(cx, cy, pLen + 25, a);
      const [lx, ly] = polarXY(cx, cy, 28, a - 8);
      const [rx, ry] = polarXY(cx, cy, 28, a + 8);
      R.push({ id: `r${id++}`, d: `M${lx},${ly} Q${(lx + tx) / 2 - 3},${(ly + ty) / 2} ${tx},${ty} Q${(rx + tx) / 2 + 3},${(ry + ty) / 2} ${rx},${ry} Z`, fill: "#fff" });
    }
    R.push({ id: `r${id++}`, d: `M${cx},${cy} m-26,0 a26,26 0 1,0 52,0 a26,26 0 1,0 -52,0`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx},${cy} m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0`, fill: "#fff" });
  }

  const stemBot = 330 + rng() * 40;
  R.push({ id: `r${id++}`, d: `M${cx - 4},${cy + 30} L${cx + 4},${cy + 30} L${cx + 2},${stemBot} L${cx - 2},${stemBot} Z`, fill: "#fff" });
  const leafY = cy + 60 + rng() * 60;
  const leafDir = rng() > 0.5 ? 1 : -1;
  const leafW = 30 + rng() * 25;
  R.push({ id: `r${id++}`, d: `M${cx},${leafY} Q${cx + leafDir * leafW},${leafY - 20} ${cx + leafDir * (leafW - 5)},${leafY + 15} Q${cx + leafDir * leafW * 0.4},${leafY + 8} ${cx},${leafY}`, fill: "#fff" });
  if (rng() > 0.4) {
    const ly2 = leafY + 35 + rng() * 30;
    R.push({ id: `r${id++}`, d: `M${cx},${ly2} Q${cx - leafDir * (leafW - 8)},${ly2 - 15} ${cx - leafDir * (leafW - 12)},${ly2 + 12} Q${cx - leafDir * leafW * 0.3},${ly2 + 5} ${cx},${ly2}`, fill: "#fff" });
  }
  return R;
}
