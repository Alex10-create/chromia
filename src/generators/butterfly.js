import { polarXY, makeRng } from './prng';

export function generateButterfly(seed) {
  const rng = makeRng(seed * 17 + 11);
  const R = []; let id = 0;
  const wingStyle = Math.floor(rng() * 6);
  const cx = 200, cy = 200;
  const ws = [65, 80, 95, 110, 125][Math.floor(rng() * 5)];
  const th = [55, 70, 85, 100][Math.floor(rng() * 4)];
  const bh = [30, 45, 55, 65][Math.floor(rng() * 4)];
  const circ = (x, y, r) => `M${x},${y}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;

  // Wing shapes (varied by ws, th, bh)
  // Top wings
  R.push({ id: `r${id++}`, d: `M${cx},${cy - 20} Q${cx - ws},${cy - th - 20} ${cx - ws + 15},${cy} Q${cx - ws / 2},${cy + 5} ${cx},${cy + 10}`, fill: "#fff" });
  R.push({ id: `r${id++}`, d: `M${cx},${cy - 20} Q${cx + ws},${cy - th - 20} ${cx + ws - 15},${cy} Q${cx + ws / 2},${cy + 5} ${cx},${cy + 10}`, fill: "#fff" });
  // Bottom wings
  R.push({ id: `r${id++}`, d: `M${cx},${cy + 10} Q${cx - ws + 8},${cy + bh + 25} ${cx - ws / 2},${cy + bh + 45} Q${cx - 18},${cy + bh} ${cx},${cy + 18}`, fill: "#fff" });
  R.push({ id: `r${id++}`, d: `M${cx},${cy + 10} Q${cx + ws - 8},${cy + bh + 25} ${cx + ws / 2},${cy + bh + 45} Q${cx + 18},${cy + bh} ${cx},${cy + 18}`, fill: "#fff" });

  // Wing patterns (6 styles)
  if (wingStyle === 0) {
    // Large eye spots
    const dr = 10 + rng() * 10;
    const innerDr = dr * 0.5;
    R.push({ id: `r${id++}`, d: circ(cx - ws / 2, cy - th / 2, dr), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx + ws / 2, cy - th / 2, dr), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx - ws / 2, cy - th / 2, innerDr), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx + ws / 2, cy - th / 2, innerDr), fill: "#fff" });
    // Bottom wing spots
    const dr2 = dr * 0.7;
    R.push({ id: `r${id++}`, d: circ(cx - ws / 3, cy + bh / 2 + 10, dr2), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx + ws / 3, cy + bh / 2 + 10, dr2), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx - ws / 3, cy + bh / 2 + 10, dr2 * 0.5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx + ws / 3, cy + bh / 2 + 10, dr2 * 0.5), fill: "#fff" });
  } else if (wingStyle === 1) {
    // Stripe pattern (horizontal lines across wings)
    const stripes = 3 + Math.floor(rng() * 3);
    for (let s = 0; s < stripes; s++) {
      const y = cy - th / 2 + s * (th / stripes);
      R.push({ id: `r${id++}`, d: `M${cx - ws + 20},${y} Q${cx - ws / 2},${y - 5} ${cx - 5},${y + 2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 + rng() });
      R.push({ id: `r${id++}`, d: `M${cx + ws - 20},${y} Q${cx + ws / 2},${y - 5} ${cx + 5},${y + 2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 + rng() });
    }
    // Bottom wing dot
    R.push({ id: `r${id++}`, d: circ(cx - ws / 3, cy + bh / 2 + 10, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx + ws / 3, cy + bh / 2 + 10, 5), fill: "#fff" });
  } else if (wingStyle === 2) {
    // Multiple small dots
    const dotCount = 3 + Math.floor(rng() * 3);
    [-1, 1].forEach(side => {
      for (let d = 0; d < dotCount; d++) {
        const dx = cx + side * (ws * 0.2 + rng() * ws * 0.5);
        const dy = cy - th * 0.4 + rng() * th * 0.5;
        const dr = 3 + rng() * 5;
        R.push({ id: `r${id++}`, d: circ(dx, dy, dr), fill: "#fff" });
      }
      // Bottom wing dots
      const [bx, by] = [cx + side * ws * 0.35, cy + bh * 0.5];
      R.push({ id: `r${id++}`, d: circ(bx, by, 4 + rng() * 3), fill: "#fff" });
    });
  } else if (wingStyle === 3) {
    // Vein lines radiating from body
    const veins = 3 + Math.floor(rng() * 3);
    [-1, 1].forEach(side => {
      for (let v = 0; v < veins; v++) {
        const a = -50 + v * (100 / (veins - 1));
        const [vx, vy] = polarXY(cx, cy, ws * 0.75, side > 0 ? -a : 180 + a);
        R.push({ id: `r${id++}`, d: `M${cx},${cy} L${vx},${vy}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
        // Branch at end
        const [bx1, by1] = polarXY(vx, vy, 12, (side > 0 ? -a : 180 + a) - 30);
        const [bx2, by2] = polarXY(vx, vy, 12, (side > 0 ? -a : 180 + a) + 30);
        R.push({ id: `r${id++}`, d: `M${vx},${vy}L${bx1},${by1}`, fill: "none", stroke: "#bbb", strokeWidth: 0.8 });
        R.push({ id: `r${id++}`, d: `M${vx},${vy}L${bx2},${by2}`, fill: "none", stroke: "#bbb", strokeWidth: 0.8 });
      }
    });
  } else if (wingStyle === 4) {
    // Stained glass — cells within wings
    [-1, 1].forEach(side => {
      // Top wing cells
      const cells = 3 + Math.floor(rng() * 2);
      for (let c = 0; c < cells; c++) {
        const cellX = cx + side * (15 + c * (ws - 20) / cells);
        const cellY = cy - th * 0.15 - c * 12;
        const cellR = 10 + rng() * 8;
        R.push({ id: `r${id++}`, d: circ(cellX, cellY, cellR), fill: "#fff" });
      }
      // Bottom wing cell
      const bx = cx + side * ws * 0.3;
      R.push({ id: `r${id++}`, d: circ(bx, cy + bh * 0.4, 8 + rng() * 5), fill: "#fff" });
    });
    // Wing edge scallops
    const scallops = 4 + Math.floor(rng() * 3);
    [-1, 1].forEach(side => {
      for (let s = 0; s < scallops; s++) {
        const a = -80 + s * (70 / scallops);
        const [sx, sy] = polarXY(cx, cy - 10, ws - 5, side > 0 ? -a : 180 + a);
        R.push({ id: `r${id++}`, d: circ(sx, sy, 3), fill: "#fff" });
      }
    });
  } else {
    // Peacock eye pattern — large detailed eye spots
    [-1, 1].forEach(side => {
      const ex = cx + side * ws * 0.45;
      const ey = cy - th * 0.35;
      const er = 14 + rng() * 8;
      R.push({ id: `r${id++}`, d: circ(ex, ey, er), fill: "#fff" });
      R.push({ id: `r${id++}`, d: circ(ex, ey, er * 0.65), fill: "#fff" });
      R.push({ id: `r${id++}`, d: circ(ex, ey, er * 0.3), fill: "#fff" });
      // Surrounding dots
      for (let d = 0; d < 6; d++) {
        const [dx, dy] = polarXY(ex, ey, er + 5, d * 60);
        R.push({ id: `r${id++}`, d: circ(dx, dy, 2), fill: "#fff" });
      }
    });
    // Bottom wing accent
    [-1, 1].forEach(side => {
      const bx = cx + side * ws * 0.3;
      const by = cy + bh * 0.4;
      R.push({ id: `r${id++}`, d: circ(bx, by, 6 + rng() * 4), fill: "#fff" });
    });
  }

  // Body segments
  const segments = 4 + Math.floor(rng() * 2);
  const bodyLen = 95;
  for (let s = 0; s < segments; s++) {
    const sy = cy - 40 + s * (bodyLen / segments);
    const sr = 3 + (s < segments / 2 ? s : segments - s) * 1.5;
    R.push({ id: `r${id++}`, d: circ(cx, sy, sr), fill: "#fff" });
  }

  // Head
  R.push({ id: `r${id++}`, d: circ(cx, cy - 44, 6 + rng() * 2), fill: "#fff" });

  // Antennae
  const antLen = 35 + rng() * 15;
  const antCurl = 25 + rng() * 15;
  R.push({ id: `r${id++}`, d: `M${cx - 3},${cy - 49} Q${cx - antCurl},${cy - 49 - antLen * 0.7} ${cx - antCurl - 5},${cy - 49 - antLen}`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
  R.push({ id: `r${id++}`, d: `M${cx + 3},${cy - 49} Q${cx + antCurl},${cy - 49 - antLen * 0.7} ${cx + antCurl + 5},${cy - 49 - antLen}`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
  // Antenna tips
  R.push({ id: `r${id++}`, d: circ(cx - antCurl - 5, cy - 49 - antLen, 3), fill: "#fff" });
  R.push({ id: `r${id++}`, d: circ(cx + antCurl + 5, cy - 49 - antLen, 3), fill: "#fff" });

  return R;
}
