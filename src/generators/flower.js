import { polarXY, makeRng } from './prng';

export function generateFlower(seed) {
  const rng = makeRng(seed * 13 + 7);
  const R = []; let id = 0;
  const cx = 200, cy = 160;
  const style = Math.floor(rng() * 8);
  const circ = (x, y, r) => `M${x},${y}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;

  if (style === 0) {
    // Round petal flower
    const n = 5 + Math.floor(rng() * 4);
    const pR = 38 + rng() * 30;
    const petalR = 14 + rng() * 10;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [px, py] = polarXY(cx, cy, pR, a);
      R.push({ id: `r${id++}`, d: circ(px, py, petalR), fill: "#fff" });
      // Petal vein
      const [vx, vy] = polarXY(cx, cy, pR + petalR * 0.6, a);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} L${vx},${vy}`, fill: "none", stroke: "#aaa", strokeWidth: 0.8 });
    }
    R.push({ id: `r${id++}`, d: circ(cx, cy, 14 + rng() * 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx, cy, 6 + rng() * 3), fill: "#fff" });
  } else if (style === 1) {
    // Pointed petal flower
    const n = 5 + Math.floor(rng() * 4);
    const pLen = 65 + rng() * 35;
    const pWidth = 12 + rng() * 8;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [tx, ty] = polarXY(cx, cy, pLen, a);
      const [lx, ly] = polarXY(cx, cy, pLen * 0.3, a - pWidth);
      const [rx, ry] = polarXY(cx, cy, pLen * 0.3, a + pWidth);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} L${lx},${ly} L${tx},${ty} L${rx},${ry} Z`, fill: "#fff" });
      // Mid line
      const [mx, my] = polarXY(cx, cy, pLen * 0.7, a);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} L${mx},${my}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
    }
    R.push({ id: `r${id++}`, d: circ(cx, cy, 8 + rng() * 4), fill: "#fff" });
  } else if (style === 2) {
    // Double-layer curved petal
    const n1 = 5 + Math.floor(rng() * 4);
    const n2 = n1 + Math.floor(rng() * 4);
    const outerLen = 70 + rng() * 25;
    const innerLen = 40 + rng() * 15;
    for (let i = 0; i < n2; i++) {
      const a = (360 / n2) * i;
      const [tx, ty] = polarXY(cx, cy, outerLen, a);
      const [lx, ly] = polarXY(cx, cy, outerLen * 0.4, a - 18);
      const [rx, ry] = polarXY(cx, cy, outerLen * 0.4, a + 18);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${lx},${ly} ${tx},${ty} Q${rx},${ry} ${cx},${cy}`, fill: "#fff" });
    }
    for (let i = 0; i < n1; i++) {
      const a = (360 / n1) * i + 180 / n1;
      const [tx, ty] = polarXY(cx, cy, innerLen, a);
      const [lx, ly] = polarXY(cx, cy, 15, a - 22);
      const [rx, ry] = polarXY(cx, cy, 15, a + 22);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${lx},${ly} ${tx},${ty} Q${rx},${ry} ${cx},${cy}`, fill: "#fff" });
    }
    R.push({ id: `r${id++}`, d: circ(cx, cy, 10 + rng() * 4), fill: "#fff" });
  } else if (style === 3) {
    // Tulip
    const w = 30 + rng() * 20;
    const h = 55 + rng() * 20;
    // Outer petals
    R.push({ id: `r${id++}`, d: `M${cx},${cy - h * 0.7} Q${cx - w * 1.2},${cy - h * 0.3} ${cx - w},${cy + h * 0.2} Q${cx - w * 0.3},${cy + h * 0.1} ${cx},${cy + h * 0.15}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx},${cy - h * 0.7} Q${cx + w * 1.2},${cy - h * 0.3} ${cx + w},${cy + h * 0.2} Q${cx + w * 0.3},${cy + h * 0.1} ${cx},${cy + h * 0.15}`, fill: "#fff" });
    // Center petal
    R.push({ id: `r${id++}`, d: `M${cx},${cy - h * 0.8} Q${cx - w * 0.4},${cy - h * 0.2} ${cx - w * 0.15},${cy + h * 0.1} L${cx + w * 0.15},${cy + h * 0.1} Q${cx + w * 0.4},${cy - h * 0.2} ${cx},${cy - h * 0.8}`, fill: "#fff" });
    // Petal veins
    R.push({ id: `r${id++}`, d: `M${cx},${cy - h * 0.7} Q${cx - 5},${cy - h * 0.1} ${cx},${cy + h * 0.1}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: `M${cx},${cy - h * 0.7} Q${cx + 5},${cy - h * 0.1} ${cx},${cy + h * 0.1}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
    // Sepal
    R.push({ id: `r${id++}`, d: `M${cx - 12},${cy + h * 0.12} Q${cx - 25},${cy + h * 0.3} ${cx - 18},${cy + h * 0.45} Q${cx - 8},${cy + h * 0.3} ${cx},${cy + h * 0.15}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx + 12},${cy + h * 0.12} Q${cx + 25},${cy + h * 0.3} ${cx + 18},${cy + h * 0.45} Q${cx + 8},${cy + h * 0.3} ${cx},${cy + h * 0.15}`, fill: "#fff" });
  } else if (style === 4) {
    // Layered spiral flower
    const spiralPetals = 3 + Math.floor(rng() * 3);
    for (let layer = 0; layer < spiralPetals; layer++) {
      const r = 18 + layer * 20;
      const offsetA = layer * (25 + rng() * 15);
      const n = 4 + layer + Math.floor(rng() * 2);
      for (let i = 0; i < n; i++) {
        const a = (360 / n) * i + offsetA;
        const [tx, ty] = polarXY(cx, cy, r + 15, a);
        const [lx, ly] = polarXY(cx, cy, r - 5, a - 360 / n / 2.5);
        const [rx, ry] = polarXY(cx, cy, r - 5, a + 360 / n / 2.5);
        R.push({ id: `r${id++}`, d: `M${lx},${ly} Q${tx},${ty} ${rx},${ry}`, fill: "#fff", stroke: "#bbb", strokeWidth: 1 });
      }
    }
    R.push({ id: `r${id++}`, d: circ(cx, cy, 7 + rng() * 4), fill: "#fff" });
  } else if (style === 5) {
    // Many-petal daisy
    const n = 10 + Math.floor(rng() * 6);
    const pLen = 45 + rng() * 25;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [tx, ty] = polarXY(cx, cy, pLen + 20, a);
      const [lx, ly] = polarXY(cx, cy, 24, a - 8);
      const [rx, ry] = polarXY(cx, cy, 24, a + 8);
      R.push({ id: `r${id++}`, d: `M${lx},${ly} Q${(lx + tx) / 2 - 3},${(ly + ty) / 2} ${tx},${ty} Q${(rx + tx) / 2 + 3},${(ry + ty) / 2} ${rx},${ry} Z`, fill: "#fff" });
    }
    // Double center
    R.push({ id: `r${id++}`, d: circ(cx, cy, 22 + rng() * 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx, cy, 12 + rng() * 3), fill: "#fff" });
    // Center dots
    for (let d = 0; d < 6; d++) {
      const a = d * 60;
      const [dx, dy] = polarXY(cx, cy, 8, a);
      R.push({ id: `r${id++}`, d: circ(dx, dy, 2), fill: "#fff" });
    }
  } else if (style === 6) {
    // Sunflower
    const petalCount = 12 + Math.floor(rng() * 6);
    const petalLen = 40 + rng() * 20;
    for (let i = 0; i < petalCount; i++) {
      const a = (360 / petalCount) * i;
      const [tx, ty] = polarXY(cx, cy, petalLen + 30, a);
      const [lx, ly] = polarXY(cx, cy, 28, a - 8);
      const [rx, ry] = polarXY(cx, cy, 28, a + 8);
      R.push({ id: `r${id++}`, d: `M${lx},${ly} Q${tx - 2},${ty} ${tx},${ty} Q${tx + 2},${ty} ${rx},${ry} Z`, fill: "#fff" });
    }
    // Large center
    const centerR = 25 + rng() * 8;
    R.push({ id: `r${id++}`, d: circ(cx, cy, centerR), fill: "#fff" });
    // Spiral seed pattern
    for (let s = 0; s < 12; s++) {
      const a = s * 137.5; // golden angle
      const dist = 5 + s * (centerR * 0.12);
      if (dist < centerR - 2) {
        const [dx, dy] = polarXY(cx, cy, dist, a);
        R.push({ id: `r${id++}`, d: circ(dx, dy, 2 + rng()), fill: "#fff" });
      }
    }
  } else {
    // Lily — few large curved petals
    const n = 3 + Math.floor(rng() * 2);
    const pLen = 70 + rng() * 25;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [tx, ty] = polarXY(cx, cy, pLen, a);
      const [c1x, c1y] = polarXY(cx, cy, pLen * 0.6, a - 25);
      const [c2x, c2y] = polarXY(cx, cy, pLen * 0.6, a + 25);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${c1x},${c1y} ${tx},${ty} Q${c2x},${c2y} ${cx},${cy}`, fill: "#fff" });
      // Petal center line
      const [mx, my] = polarXY(cx, cy, pLen * 0.8, a);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} L${mx},${my}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
      // Stamen
      const [sx, sy] = polarXY(cx, cy, pLen * 0.55, a + 180 / n);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} L${sx},${sy}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
      R.push({ id: `r${id++}`, d: circ(sx, sy, 3), fill: "#fff" });
    }
    R.push({ id: `r${id++}`, d: circ(cx, cy, 8), fill: "#fff" });
  }

  // Stem (common)
  const stemBot = 330 + rng() * 40;
  const stemCurve = (rng() - 0.5) * 15;
  R.push({ id: `r${id++}`, d: `M${cx - 3},${cy + 30} Q${cx + stemCurve},${(cy + 30 + stemBot) / 2} ${cx + 2},${stemBot}`, fill: "none", stroke: "#aaa", strokeWidth: 3 });

  // Leaves (common, 1-2 leaves)
  const leafY = cy + 55 + rng() * 55;
  const leafDir = rng() > 0.5 ? 1 : -1;
  const leafW = 28 + rng() * 25;
  const leafH = 15 + rng() * 10;
  R.push({ id: `r${id++}`, d: `M${cx},${leafY} Q${cx + leafDir * leafW},${leafY - leafH} ${cx + leafDir * (leafW - 5)},${leafY + leafH} Q${cx + leafDir * leafW * 0.4},${leafY + 5} ${cx},${leafY}`, fill: "#fff" });
  // Leaf vein
  R.push({ id: `r${id++}`, d: `M${cx},${leafY} Q${cx + leafDir * leafW * 0.6},${leafY} ${cx + leafDir * (leafW - 8)},${leafY + leafH * 0.5}`, fill: "none", stroke: "#aaa", strokeWidth: 0.8 });

  if (rng() > 0.35) {
    const ly2 = leafY + 30 + rng() * 30;
    const lw2 = leafW * 0.85;
    R.push({ id: `r${id++}`, d: `M${cx},${ly2} Q${cx - leafDir * lw2},${ly2 - leafH * 0.8} ${cx - leafDir * (lw2 - 5)},${ly2 + leafH * 0.9} Q${cx - leafDir * lw2 * 0.3},${ly2 + 4} ${cx},${ly2}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx},${ly2} Q${cx - leafDir * lw2 * 0.5},${ly2} ${cx - leafDir * (lw2 - 8)},${ly2 + leafH * 0.4}`, fill: "none", stroke: "#aaa", strokeWidth: 0.8 });
  }

  // Ground detail
  R.push({ id: `r${id++}`, d: `M${cx - 40},${stemBot + 5} Q${cx},${stemBot - 2} ${cx + 40},${stemBot + 5}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });

  return R;
}
