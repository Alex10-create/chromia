import { polarXY, makeRng } from './prng';

export function generateMandala(seed) {
  const rng = makeRng(seed * 7 + 3);
  const R = []; let id = 0;
  const cx = 200, cy = 200;
  const style = Math.floor(rng() * 8);
  const petals = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16][Math.floor(rng() * 10)];
  const circ = (x, y, r) => `M${x},${y}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;

  if (style === 0) {
    // Layered petal mandala
    const layers = 2 + Math.floor(rng() * 4);
    for (let L = 0; L < layers; L++) {
      const ri = 15 + L * (145 / layers), ro = ri + 130 / layers;
      const offset = L % 2 === 0 ? 0 : (180 / petals);
      const n = petals + L * Math.floor(rng() * 2);
      for (let i = 0; i < n; i++) {
        const a1 = (360 / n) * i + offset, a2 = a1 + 180 / n, a3 = a1 + 360 / n;
        const [x1, y1] = polarXY(cx, cy, ri, a1);
        const [x2, y2] = polarXY(cx, cy, ro, a2);
        const [x3, y3] = polarXY(cx, cy, ri, a3);
        R.push({ id: `r${id++}`, d: `M${cx},${cy} L${x1},${y1} Q${x2},${y2} ${x3},${y3} Z`, fill: "#fff" });
      }
    }
  } else if (style === 1) {
    // Star petal + dots mandala
    const ro = 65 + rng() * 45;
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i;
      const [tx, ty] = polarXY(cx, cy, ro, a);
      const [lx, ly] = polarXY(cx, cy, 20, a - 20);
      const [rx, ry] = polarXY(cx, cy, 20, a + 20);
      R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${lx},${ly} ${tx},${ty} Q${rx},${ry} ${cx},${cy}`, fill: "#fff" });
      const dotR = 4 + rng() * 4;
      const [dx, dy] = polarXY(cx, cy, ro + 18, a);
      R.push({ id: `r${id++}`, d: circ(dx, dy, dotR), fill: "#fff" });
    }
    // Connecting arcs
    for (let i = 0; i < petals; i++) {
      const a1 = (360 / petals) * i, a2 = (360 / petals) * ((i + 1) % petals);
      const [x1, y1] = polarXY(cx, cy, ro + 18, a1);
      const [x2, y2] = polarXY(cx, cy, ro + 18, a2);
      const [mx, my] = polarXY(cx, cy, ro + 32 + rng() * 10, (a1 + a2) / 2);
      R.push({ id: `r${id++}`, d: `M${x1},${y1} Q${mx},${my} ${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    }
    // Inner ring of small dots
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i + 180 / petals;
      const [dx, dy] = polarXY(cx, cy, ro * 0.35, a);
      R.push({ id: `r${id++}`, d: circ(dx, dy, 3), fill: "#fff" });
    }
  } else if (style === 2) {
    // Diamond + kite mandala
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
      const outerDist = 90 + rng() * 20;
      const [t, tt] = polarXY(cx, cy, outerDist, a);
      const [l, ll] = polarXY(cx, cy, outerDist - 20, a - 12);
      const [r2, rr] = polarXY(cx, cy, outerDist - 20, a + 12);
      const [b, bb] = polarXY(cx, cy, outerDist - 35, a);
      R.push({ id: `r${id++}`, d: `M${t},${tt} L${l},${ll} L${b},${bb} L${r2},${rr} Z`, fill: "#fff" });
    }
    // Outer connecting arcs
    for (let i = 0; i < n; i++) {
      const a1 = (360 / n) * i, a2 = (360 / n) * ((i + 1) % n);
      const outerDist = 90 + rng() * 20;
      const [x1, y1] = polarXY(cx, cy, outerDist, a1 + 180 / n);
      const [x2, y2] = polarXY(cx, cy, outerDist, a2 + 180 / n);
      const [mx, my] = polarXY(cx, cy, outerDist + 15, (a1 + a2) / 2 + 180 / n);
      R.push({ id: `r${id++}`, d: `M${x1},${y1} Q${mx},${my} ${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    }
  } else if (style === 3) {
    // Spiral arms mandala
    const arms = petals;
    const spiralTurns = 6 + Math.floor(rng() * 6);
    const spiralTight = 10 + rng() * 6;
    for (let a = 0; a < arms; a++) {
      const baseAngle = (360 / arms) * a;
      const pts = [];
      for (let t = 0; t <= spiralTurns; t++) {
        const angle = baseAngle + t * spiralTight;
        const radius = 18 + t * (120 / spiralTurns);
        pts.push(polarXY(cx, cy, radius, angle));
      }
      let d = `M${pts[0][0]},${pts[0][1]}`;
      for (let t = 1; t < pts.length; t++) d += ` L${pts[t][0]},${pts[t][1]}`;
      R.push({ id: `r${id++}`, d, fill: "none", stroke: "#aaa", strokeWidth: 2.5 });
      const [ex, ey] = pts[pts.length - 1];
      R.push({ id: `r${id++}`, d: circ(ex, ey, 6 + rng() * 4), fill: "#fff" });
    }
    // Inner circles
    const innerCircles = 2 + Math.floor(rng() * 2);
    for (let c = 0; c < innerCircles; c++) {
      const cr = 15 + c * 18;
      R.push({ id: `r${id++}`, d: circ(cx, cy, cr), fill: "#fff" });
    }
  } else if (style === 4) {
    // Segmented rings mandala
    const rings = 3 + Math.floor(rng() * 3);
    for (let ring = 0; ring < rings; ring++) {
      const ri = 12 + ring * (150 / rings), ro = ri + 140 / rings - 4;
      const wedges = petals + ring * (1 + Math.floor(rng() * 2));
      for (let i = 0; i < wedges; i++) {
        const a1 = (360 / wedges) * i + 1, a2 = (360 / wedges) * (i + 1) - 1;
        const [ox1, oy1] = polarXY(cx, cy, ro, a1);
        const [ox2, oy2] = polarXY(cx, cy, ro, a2);
        const [ix1, iy1] = polarXY(cx, cy, ri, a1);
        const [ix2, iy2] = polarXY(cx, cy, ri, a2);
        R.push({ id: `r${id++}`, d: `M${ix1},${iy1} L${ox1},${oy1} A${ro},${ro} 0 0,1 ${ox2},${oy2} L${ix2},${iy2} A${ri},${ri} 0 0,0 ${ix1},${iy1}`, fill: "#fff" });
      }
    }
  } else if (style === 5) {
    // Petal + line + dot mandala
    const outerR = 120 + rng() * 20, midR = 70 + rng() * 15, innerR = 38 + rng() * 12;
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
      R.push({ id: `r${id++}`, d: circ(dx, dy, 6 + rng() * 3), fill: "#fff" });
    }
    // Outer dots
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i;
      const [dx, dy] = polarXY(cx, cy, outerR + 12, a);
      R.push({ id: `r${id++}`, d: circ(dx, dy, 3), fill: "#fff" });
    }
  } else if (style === 6) {
    // Star burst — multiple star layers
    const starPoints = petals;
    const layers = 2 + Math.floor(rng() * 2);
    for (let L = 0; L < layers; L++) {
      const outerR = 50 + L * 45;
      const innerR = outerR - 20 - rng() * 10;
      const offset = L * (180 / starPoints);
      let pts = [];
      for (let i = 0; i < starPoints * 2; i++) {
        const rr = i % 2 === 0 ? outerR : innerR;
        const a = ((360 / (starPoints * 2)) * i + offset);
        const [px, py] = polarXY(cx, cy, rr, a);
        pts.push(`${px},${py}`);
      }
      R.push({ id: `r${id++}`, d: `M${pts.join("L")}Z`, fill: "#fff" });
    }
    // Dots at each star point
    const outerR = 50 + (layers - 1) * 45;
    for (let i = 0; i < starPoints; i++) {
      const a = (360 / starPoints) * i + (layers - 1) * (180 / starPoints);
      const [dx, dy] = polarXY(cx, cy, outerR + 12, a);
      R.push({ id: `r${id++}`, d: circ(dx, dy, 4), fill: "#fff" });
    }
  } else {
    // Flower of life — overlapping circles
    const circR = 30 + rng() * 15;
    // Center circle
    R.push({ id: `r${id++}`, d: circ(cx, cy, circR), fill: "#fff" });
    // First ring of 6 circles
    for (let i = 0; i < 6; i++) {
      const a = 60 * i;
      const [px, py] = polarXY(cx, cy, circR, a);
      R.push({ id: `r${id++}`, d: circ(px, py, circR), fill: "#fff" });
    }
    // Second ring of 6 circles
    for (let i = 0; i < 6; i++) {
      const a = 60 * i + 30;
      const [px, py] = polarXY(cx, cy, circR * 1.73, a);
      R.push({ id: `r${id++}`, d: circ(px, py, circR), fill: "#fff" });
    }
    // Third ring of 6 at double distance
    if (rng() > 0.4) {
      for (let i = 0; i < 6; i++) {
        const a = 60 * i;
        const [px, py] = polarXY(cx, cy, circR * 2, a);
        R.push({ id: `r${id++}`, d: circ(px, py, circR), fill: "#fff" });
      }
    }
  }

  // Center dot (common to all)
  R.push({ id: `r${id++}`, d: circ(cx, cy, 10 + rng() * 6), fill: "#fff" });

  // Outer decorative border (common to all)
  const borderStyle = Math.floor(rng() * 3);
  const borderR = 165 + rng() * 10;
  if (borderStyle === 0) {
    // Dot border
    const dotCount = petals * 2;
    for (let i = 0; i < dotCount; i++) {
      const a = (360 / dotCount) * i;
      const [dx, dy] = polarXY(cx, cy, borderR, a);
      R.push({ id: `r${id++}`, d: circ(dx, dy, 2.5), fill: "#fff" });
    }
  } else if (borderStyle === 1) {
    // Scallop border
    for (let i = 0; i < petals; i++) {
      const a1 = (360 / petals) * i;
      const a2 = (360 / petals) * ((i + 1) % petals);
      const [x1, y1] = polarXY(cx, cy, borderR, a1);
      const [x2, y2] = polarXY(cx, cy, borderR, a2);
      const [mx, my] = polarXY(cx, cy, borderR + 10, (a1 + a2) / 2);
      R.push({ id: `r${id++}`, d: `M${x1},${y1} Q${mx},${my} ${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    }
  } else {
    // Triangle border
    for (let i = 0; i < petals; i++) {
      const a = (360 / petals) * i;
      const [bx, by] = polarXY(cx, cy, borderR, a);
      const [lx, ly] = polarXY(cx, cy, borderR - 8, a - 8);
      const [rx, ry] = polarXY(cx, cy, borderR - 8, a + 8);
      R.push({ id: `r${id++}`, d: `M${bx},${by}L${lx},${ly}L${rx},${ry}Z`, fill: "#fff" });
    }
  }

  return R;
}
