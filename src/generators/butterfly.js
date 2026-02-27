import { polarXY, makeRng } from './prng';

export function generateButterfly(seed) {
  const rng = makeRng(seed * 17 + 11);
  const R = []; let id = 0;
  const style = Math.floor(rng() * 4);
  const cx = 200, cy = 200;
  const ws = [70, 90, 110, 130][Math.floor(rng() * 4)];
  const th = [60, 80, 100][Math.floor(rng() * 3)];
  const bh = [35, 50, 65][Math.floor(rng() * 3)];

  R.push({ id: `r${id++}`, d: `M${cx},${cy - 20} Q${cx - ws},${cy - th - 20} ${cx - ws + 15},${cy} Q${cx - ws / 2},${cy + 5} ${cx},${cy + 10}`, fill: "#fff" });
  R.push({ id: `r${id++}`, d: `M${cx},${cy - 20} Q${cx + ws},${cy - th - 20} ${cx + ws - 15},${cy} Q${cx + ws / 2},${cy + 5} ${cx},${cy + 10}`, fill: "#fff" });
  R.push({ id: `r${id++}`, d: `M${cx},${cy + 10} Q${cx - ws + 8},${cy + bh + 25} ${cx - ws / 2},${cy + bh + 45} Q${cx - 18},${cy + bh} ${cx},${cy + 18}`, fill: "#fff" });
  R.push({ id: `r${id++}`, d: `M${cx},${cy + 10} Q${cx + ws - 8},${cy + bh + 25} ${cx + ws / 2},${cy + bh + 45} Q${cx + 18},${cy + bh} ${cx},${cy + 18}`, fill: "#fff" });

  if (style === 0) {
    const dr = 12 + rng() * 8;
    R.push({ id: `r${id++}`, d: `M${cx - ws / 2},${cy - th / 2} m-${dr},0 a${dr},${dr} 0 1,0 ${dr * 2},0 a${dr},${dr} 0 1,0 -${dr * 2},0`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx + ws / 2},${cy - th / 2} m-${dr},0 a${dr},${dr} 0 1,0 ${dr * 2},0 a${dr},${dr} 0 1,0 -${dr * 2},0`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx - ws / 3},${cy + bh / 2} m-${dr - 4},0 a${dr - 4},${dr - 4} 0 1,0 ${(dr - 4) * 2},0 a${dr - 4},${dr - 4} 0 1,0 -${(dr - 4) * 2},0`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx + ws / 3},${cy + bh / 2} m-${dr - 4},0 a${dr - 4},${dr - 4} 0 1,0 ${(dr - 4) * 2},0 a${dr - 4},${dr - 4} 0 1,0 -${(dr - 4) * 2},0`, fill: "#fff" });
  } else if (style === 1) {
    for (let s = 0; s < 3; s++) {
      const y = cy - th / 2 + s * 18;
      R.push({ id: `r${id++}`, d: `M${cx - ws + 20},${y} Q${cx - ws / 2},${y - 5} ${cx - 5},${y + 2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
      R.push({ id: `r${id++}`, d: `M${cx + ws - 20},${y} Q${cx + ws / 2},${y - 5} ${cx + 5},${y + 2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    }
  } else if (style === 2) {
    [-1, 1].forEach(side => {
      [0.3, 0.6].forEach(frac => {
        const [dx, dy] = [cx + side * ws * frac, cy - th * 0.4];
        R.push({ id: `r${id++}`, d: `M${dx},${dy} m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0`, fill: "#fff" });
      });
      const [bx, by] = [cx + side * ws * 0.35, cy + bh * 0.5];
      R.push({ id: `r${id++}`, d: `M${bx},${by} m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0`, fill: "#fff" });
    });
  } else {
    [-1, 1].forEach(side => {
      for (let v = 0; v < 3; v++) {
        const a = -50 + v * 25;
        const [vx, vy] = polarXY(cx, cy, ws * 0.7, side > 0 ? -a : 180 + a);
        R.push({ id: `r${id++}`, d: `M${cx},${cy} L${vx},${vy}`, fill: "none", stroke: "#bbb", strokeWidth: 1 });
      }
    });
  }

  R.push({ id: `r${id++}`, d: `M${cx - 3},${cy - 40} L${cx + 3},${cy - 40} L${cx + 2},${cy + 55} L${cx - 2},${cy + 55} Z`, fill: "#fff" });
  R.push({ id: `r${id++}`, d: `M${cx},${cy - 44} m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0`, fill: "#fff" });
  R.push({ id: `r${id++}`, d: `M${cx - 3},${cy - 49} Q${cx - 28},${cy - 82} ${cx - 32},${cy - 90}`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
  R.push({ id: `r${id++}`, d: `M${cx + 3},${cy - 49} Q${cx + 28},${cy - 82} ${cx + 32},${cy - 90}`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
  return R;
}
