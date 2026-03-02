import { polarXY, makeRng } from './prng';

export function generateHeart(seed) {
  const rng = makeRng(seed * 37 + 23);
  const R = []; let id = 0;
  const t = Math.floor(rng() * 8);
  const circ = (cx, cy, r) => `M${cx},${cy}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;

  const heartPath = (hcx, hcy, w, h) =>
    `M${hcx},${hcy + h} Q${hcx - w * 1.5},${hcy + h * .3} ${hcx - w},${hcy - h * .3} Q${hcx - w * .5},${hcy - h} ${hcx},${hcy - h * .3} Q${hcx + w * .5},${hcy - h} ${hcx + w},${hcy - h * .3} Q${hcx + w * 1.5},${hcy + h * .3} ${hcx},${hcy + h}`;

  if (t === 0) { // nested hearts
    const layers = 3 + Math.floor(rng() * 3);
    for (let i = 0; i < layers; i++) {
      const s = 1 - (i / layers) * 0.7;
      const w = 76 * s, h = 66 * s;
      const hcy = 196 - 14 * (1 - s);
      R.push({ id: `r${id++}`, d: heartPath(200, hcy, w, h), fill: "#fff" });
    }
    // Decorative dots between layers
    for (let d = 0; d < 6; d++) {
      const a = d * 60;
      const [dx, dy] = polarXY(200, 196, 80, a);
      if (dy < 250) R.push({ id: `r${id++}`, d: circ(dx, dy, 3), fill: "#fff" });
    }
  } else if (t === 1) { // winged heart
    R.push({ id: `r${id++}`, d: heartPath(200, 195, 70 + rng() * 15, 60 + rng() * 10), fill: "#fff" });
    // Wings
    const wingLayers = 2 + Math.floor(rng() * 2);
    for (let w = 0; w < wingLayers; w++) {
      const wy = 165 + w * 20;
      const wx = 45 + w * 10;
      // Left wing
      R.push({ id: `r${id++}`, d: `M${200 - 70 + w * 10},${wy} Q${200 - 70 - wx},${wy - 30 + w * 5} ${200 - 70 - wx - 20},${wy + 10} Q${200 - 70 - wx + 10},${wy + 15} ${200 - 70 + w * 10 + 5},${wy + 15}`, fill: "#fff" });
      // Right wing
      R.push({ id: `r${id++}`, d: `M${200 + 70 - w * 10},${wy} Q${200 + 70 + wx},${wy - 30 + w * 5} ${200 + 70 + wx + 20},${wy + 10} Q${200 + 70 + wx - 10},${wy + 15} ${200 + 70 - w * 10 - 5},${wy + 15}`, fill: "#fff" });
    }
    // Halo
    if (rng() > 0.5) {
      R.push({ id: `r${id++}`, d: `M170,120 A30,8 0 1,1 230,120 A30,8 0 1,1 170,120`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    }
  } else if (t === 2) { // heart mosaic
    const gridN = 3 + Math.floor(rng() * 2);
    const cellW = 280 / gridN;
    for (let r = 0; r < gridN; r++) for (let c = 0; c < gridN; c++) {
      const hcx = 60 + c * cellW + cellW / 2;
      const hcy = 60 + r * cellW + cellW / 2;
      const s = cellW * 0.28 + rng() * cellW * 0.05;
      R.push({ id: `r${id++}`, d: heartPath(hcx, hcy, s, s * 0.85), fill: "#fff" });
    }
    // Border
    R.push({ id: `r${id++}`, d: "M45,45 L355,45 L355,355 L45,355 Z", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Corner dots
    [45, 355].forEach(x => [45, 355].forEach(y => {
      R.push({ id: `r${id++}`, d: circ(x, y, 4), fill: "#fff" });
    }));
  } else if (t === 3) { // heart with arrow
    const hw = 72 + rng() * 12;
    R.push({ id: `r${id++}`, d: heartPath(200, 200, hw, 62 + rng() * 10), fill: "#fff" });
    // Arrow through heart
    const arrowAngle = -10 + rng() * 20;
    const [a1x, a1y] = polarXY(200, 200, 130, 180 + arrowAngle);
    const [a2x, a2y] = polarXY(200, 200, 130, arrowAngle);
    R.push({ id: `r${id++}`, d: `M${a1x},${a1y}L${a2x},${a2y}`, fill: "none", stroke: "#aaa", strokeWidth: 2.5 });
    // Arrow head
    const [ah1x, ah1y] = polarXY(a2x, a2y, 15, arrowAngle + 150);
    const [ah2x, ah2y] = polarXY(a2x, a2y, 15, arrowAngle - 150);
    R.push({ id: `r${id++}`, d: `M${a2x},${a2y}L${ah1x},${ah1y}M${a2x},${a2y}L${ah2x},${ah2y}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    // Arrow tail feathers
    const [at1x, at1y] = polarXY(a1x, a1y, 12, arrowAngle + 30 + 180);
    const [at2x, at2y] = polarXY(a1x, a1y, 12, arrowAngle - 30 + 180);
    R.push({ id: `r${id++}`, d: `M${a1x},${a1y}L${at1x},${at1y}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: `M${a1x},${a1y}L${at2x},${at2y}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Center detail
    R.push({ id: `r${id++}`, d: circ(200, 175, 10), fill: "#fff" });
    // Inner heart line
    R.push({ id: `r${id++}`, d: heartPath(200, 200, hw * 0.55, 38), fill: "#fff" });
  } else if (t === 4) { // heart with banner/ribbon
    R.push({ id: `r${id++}`, d: heartPath(200, 190, 80, 68), fill: "#fff" });
    // Ribbon/banner across heart
    const ribbonY = 190 + rng() * 20;
    const ribbonH = 18 + rng() * 8;
    R.push({ id: `r${id++}`, d: `M90,${ribbonY} L310,${ribbonY} L310,${ribbonY + ribbonH} L90,${ribbonY + ribbonH} Z`, fill: "#fff" });
    // Ribbon fold left
    R.push({ id: `r${id++}`, d: `M90,${ribbonY} L70,${ribbonY - 8} L70,${ribbonY + ribbonH + 8} L90,${ribbonY + ribbonH} Z`, fill: "#fff" });
    // Ribbon fold right
    R.push({ id: `r${id++}`, d: `M310,${ribbonY} L330,${ribbonY - 8} L330,${ribbonY + ribbonH + 8} L310,${ribbonY + ribbonH} Z`, fill: "#fff" });
    // Ribbon tail left
    R.push({ id: `r${id++}`, d: `M70,${ribbonY - 8} L50,${ribbonY - 15} L60,${ribbonY + ribbonH / 2} L50,${ribbonY + ribbonH + 15} L70,${ribbonY + ribbonH + 8}`, fill: "#fff" });
    // Ribbon tail right
    R.push({ id: `r${id++}`, d: `M330,${ribbonY - 8} L350,${ribbonY - 15} L340,${ribbonY + ribbonH / 2} L350,${ribbonY + ribbonH + 15} L330,${ribbonY + ribbonH + 8}`, fill: "#fff" });
    // Small hearts on ribbon
    R.push({ id: `r${id++}`, d: heartPath(155, ribbonY + ribbonH / 2, 6, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: heartPath(200, ribbonY + ribbonH / 2, 6, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: heartPath(245, ribbonY + ribbonH / 2, 6, 5), fill: "#fff" });
  } else if (t === 5) { // heart lock
    R.push({ id: `r${id++}`, d: heartPath(200, 210, 75, 65), fill: "#fff" });
    // Keyhole
    R.push({ id: `r${id++}`, d: circ(200, 190, 12), fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M195,198 L200,228 L205,198 Z", fill: "#fff" });
    // Lock shackle (arch on top)
    R.push({ id: `r${id++}`, d: "M175,155 Q175,105 200,100 Q225,105 225,155", fill: "none", stroke: "#aaa", strokeWidth: 4 });
    R.push({ id: `r${id++}`, d: "M170,155 L180,155 L180,165 L170,165 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M220,155 L230,155 L230,165 L220,165 Z", fill: "#fff" });
    // Key nearby
    const kx = 310 + rng() * 20;
    const ky = 250 + rng() * 30;
    R.push({ id: `r${id++}`, d: circ(kx, ky, 10), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(kx, ky, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${kx},${ky + 10} L${kx},${ky + 40}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    R.push({ id: `r${id++}`, d: `M${kx},${ky + 30} L${kx + 8},${ky + 30}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    R.push({ id: `r${id++}`, d: `M${kx},${ky + 37} L${kx + 6},${ky + 37}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    // Decorative screws
    R.push({ id: `r${id++}`, d: circ(180, 210, 3), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(220, 210, 3), fill: "#fff" });
  } else if (t === 6) { // double hearts intertwined
    const offset = 25 + rng() * 10;
    R.push({ id: `r${id++}`, d: heartPath(200 - offset, 195, 55 + rng() * 10, 50), fill: "#fff" });
    R.push({ id: `r${id++}`, d: heartPath(200 + offset, 195, 55 + rng() * 10, 50), fill: "#fff" });
    // Inner hearts
    R.push({ id: `r${id++}`, d: heartPath(200 - offset, 192, 28, 25), fill: "#fff" });
    R.push({ id: `r${id++}`, d: heartPath(200 + offset, 192, 28, 25), fill: "#fff" });
    // Connecting swirl
    R.push({ id: `r${id++}`, d: `M${200 - offset},${245} Q200,260 ${200 + offset},245`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Sparkles around
    for (let s = 0; s < 5; s++) {
      const sx = 100 + rng() * 200;
      const sy = 120 + rng() * 50;
      const sr = 2 + rng() * 2;
      R.push({ id: `r${id++}`, d: `M${sx},${sy - sr}L${sx + sr * 0.3},${sy}L${sx},${sy + sr}L${sx - sr * 0.3},${sy}Z`, fill: "#fff" });
    }
    // Ground hearts
    for (let g = 0; g < 3; g++) {
      const gx = 100 + rng() * 200;
      R.push({ id: `r${id++}`, d: heartPath(gx, 310 + rng() * 30, 8 + rng() * 5, 7), fill: "#fff" });
    }
  } else { // heart bouquet
    // Vase
    R.push({ id: `r${id++}`, d: "M175,295 Q170,350 180,370 L220,370 Q230,350 225,295 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M168,295 L232,295 L230,305 L170,305 Z", fill: "#fff" });
    // Heart flowers
    const heartCount = 4 + Math.floor(rng() * 3);
    for (let h = 0; h < heartCount; h++) {
      const angle = -60 + h * (120 / (heartCount - 1));
      const dist = 60 + rng() * 40;
      const [hx, hy] = polarXY(200, 260, dist, angle - 90);
      const hs = 14 + rng() * 10;
      R.push({ id: `r${id++}`, d: heartPath(hx, hy, hs, hs * 0.85), fill: "#fff" });
      // Stem
      R.push({ id: `r${id++}`, d: `M${hx},${hy + hs * 0.7} Q${200 + (hx - 200) * 0.3},${280} 200,295`, fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    }
    // Leaves
    R.push({ id: `r${id++}`, d: "M195,280 Q175,268 170,280 Q178,275 195,280", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M205,275 Q225,262 228,275 Q222,270 205,275", fill: "#fff" });
    // Ribbon on vase
    R.push({ id: `r${id++}`, d: "M182,315 Q200,325 218,315 Q200,320 182,315", fill: "#fff" });
  }

  return R;
}
