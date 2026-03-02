import { polarXY, makeRng } from './prng';

export function generateNature(seed) {
  const rng = makeRng(seed * 19 + 9);
  const R = []; let id = 0;
  const t = Math.floor(rng() * 8);
  const circ = (cx, cy, r) => `M${cx},${cy}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;
  const ellipse = (cx, cy, rx, ry) => `M${cx},${cy}m-${rx},0a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 -${rx*2},0`;

  if (t === 0) { // pine tree
    const layers = 3 + Math.floor(rng() * 3);
    const trunkW = 6 + rng() * 6;
    R.push({ id: `r${id++}`, d: `M${200 - trunkW/2},378 L${200 + trunkW/2},378 L${200 + trunkW/2 - 1},${240 - layers * 5} L${200 - trunkW/2 + 1},${240 - layers * 5} Z`, fill: "#fff" });
    for (let i = 0; i < layers; i++) {
      const baseW = 85 - i * (45 / layers) + rng() * 10;
      const y = 240 - i * (180 / layers);
      const tipY = y - 55 - rng() * 15;
      R.push({ id: `r${id++}`, d: `M200,${tipY} L${200 - baseW},${y + 15} L${200 + baseW},${y + 15} Z`, fill: "#fff" });
    }
    // Snow on branches (optional)
    if (rng() > 0.5) {
      for (let i = 0; i < layers; i++) {
        const y = 240 - i * (180 / layers) - 30;
        const w = 20 + rng() * 15;
        R.push({ id: `r${id++}`, d: `M${200 - w},${y} Q200,${y - 8} ${200 + w},${y}`, fill: "#fff" });
      }
    }
    // Ground
    R.push({ id: `r${id++}`, d: "M120,378 Q160,368 200,378 Q240,368 280,378", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
  } else if (t === 1) { // mountain
    const peak1 = 75 + rng() * 40;
    const peak2 = 65 + rng() * 35;
    const mid = 170 + rng() * 60;
    R.push({ id: `r${id++}`, d: `M32,345 L${mid - 45},${peak1} L${mid},${peak1 + 60} L${mid + 55},${peak2} L375,345 Z`, fill: "#fff" });
    // Snow cap
    R.push({ id: `r${id++}`, d: `M${mid - 45},${peak1} L${mid - 25},${peak1 + 30} L${mid},${peak1 + 20} L${mid + 10},${peak1 + 35} L${mid - 45 - 15},${peak1 + 25} Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${mid + 55},${peak2} L${mid + 35},${peak2 + 25} L${mid + 55 + 5},${peak2 + 18} L${mid + 70},${peak2 + 30} Z`, fill: "#fff" });
    // Foothills
    R.push({ id: `r${id++}`, d: "M30,345 Q100,310 180,345 Q260,310 370,345 L370,385 L30,385 Z", fill: "#fff" });
    // Clouds
    const cloudX = 50 + rng() * 80;
    R.push({ id: `r${id++}`, d: ellipse(cloudX, 55, 22, 11), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(cloudX + 20, 50, 18, 9), fill: "#fff" });
    const cloud2X = 280 + rng() * 60;
    R.push({ id: `r${id++}`, d: ellipse(cloud2X, 45, 20, 10), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(cloud2X + 18, 42, 15, 8), fill: "#fff" });
    // Birds
    for (let b = 0; b < 2 + Math.floor(rng() * 3); b++) {
      const bx = 100 + rng() * 200, by = 60 + rng() * 40;
      R.push({ id: `r${id++}`, d: `M${bx - 6},${by} Q${bx - 3},${by - 4} ${bx},${by} Q${bx + 3},${by - 4} ${bx + 6},${by}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    }
  } else if (t === 2) { // sun + hills
    const sunR = 28 + rng() * 15;
    const sunX = 70 + rng() * 60;
    const sunY = 50 + rng() * 20;
    R.push({ id: `r${id++}`, d: circ(sunX, sunY, sunR), fill: "#fff" });
    const rays = 8 + Math.floor(rng() * 5);
    const rayLen = 14 + rng() * 10;
    for (let i = 0; i < rays; i++) {
      const a = i * (360 / rays);
      const [x1, y1] = polarXY(sunX, sunY, sunR + 4, a);
      const [x2, y2] = polarXY(sunX, sunY, sunR + rayLen, a);
      R.push({ id: `r${id++}`, d: `M${x1},${y1} L${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    }
    // Hills
    const hillCount = 2 + Math.floor(rng() * 2);
    for (let h = 0; h < hillCount; h++) {
      const hy = 270 + h * 40;
      const amp = 60 + rng() * 40;
      R.push({ id: `r${id++}`, d: `M0,${hy + amp} Q${100 + rng() * 50},${hy} ${200 + rng() * 30},${hy + amp * 0.8} Q${300 + rng() * 50},${hy - 10} 400,${hy + amp} L400,400 L0,400 Z`, fill: "#fff" });
    }
    // Flowers on hills
    for (let f = 0; f < 3 + Math.floor(rng() * 3); f++) {
      const fx = 50 + rng() * 300, fy = 330 + rng() * 30;
      R.push({ id: `r${id++}`, d: `M${fx},${fy} L${fx},${fy - 12}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
      R.push({ id: `r${id++}`, d: circ(fx, fy - 14, 3), fill: "#fff" });
    }
  } else if (t === 3) { // mushroom
    const capW = 95 + rng() * 30;
    const capH = 80 + rng() * 20;
    const cx = 200, cy = 180;
    R.push({ id: `r${id++}`, d: `M${cx},${cy - capH * 0.5} Q${cx - capW},${cy - capH * 0.5} ${cx - capW + 10},${cy + 10} Q${cx - capW + 10},${cy + capH * 0.3} ${cx},${cy + capH * 0.3} Q${cx + capW - 10},${cy + capH * 0.3} ${cx + capW - 10},${cy + 10} Q${cx + capW},${cy - capH * 0.5} ${cx},${cy - capH * 0.5}`, fill: "#fff" });
    // Stem
    const stemW = 20 + rng() * 10;
    R.push({ id: `r${id++}`, d: `M${cx - stemW},${cy + capH * 0.3} L${cx - stemW + 2},365 L${cx + stemW - 2},365 L${cx + stemW},${cy + capH * 0.3}`, fill: "#fff" });
    // Spots on cap
    const spots = 3 + Math.floor(rng() * 4);
    for (let s = 0; s < spots; s++) {
      const sx = cx - capW * 0.5 + rng() * capW;
      const sy = cy - capH * 0.3 + rng() * capH * 0.4;
      const sr = 6 + rng() * 8;
      R.push({ id: `r${id++}`, d: ellipse(sx, sy, sr, sr * 0.8), fill: "#fff" });
    }
    // Grass at base
    R.push({ id: `r${id++}`, d: `M${cx - 50},365 Q${cx - 35},350 ${cx - 25},360 Q${cx - 10},348 ${cx},358 Q${cx + 15},345 ${cx + 25},358 Q${cx + 35},348 ${cx + 50},365`, fill: "#fff" });
    // Small mushroom nearby
    if (rng() > 0.4) {
      const mx = rng() > 0.5 ? 310 + rng() * 30 : 50 + rng() * 30;
      R.push({ id: `r${id++}`, d: `M${mx},340 Q${mx - 22},340 ${mx - 18},355 Q${mx - 18},362 ${mx},362 Q${mx + 18},362 ${mx + 18},355 Q${mx + 22},340 ${mx},340`, fill: "#fff" });
      R.push({ id: `r${id++}`, d: `M${mx - 5},362 L${mx - 4},378 L${mx + 4},378 L${mx + 5},362`, fill: "#fff" });
    }
  } else if (t === 4) { // round tree
    const crownRx = 65 + rng() * 25;
    const crownRy = 55 + rng() * 20;
    const crownY = 130 - rng() * 20;
    R.push({ id: `r${id++}`, d: `M192,378 L208,378 L206,${crownY + crownRy - 10} L194,${crownY + crownRy - 10} Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(200, crownY, crownRx, crownRy), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(200, crownY, crownRx * 0.5, crownRy * 0.5), fill: "#fff" });
    // Fruit / flowers on tree
    const fruitCount = 3 + Math.floor(rng() * 4);
    for (let f = 0; f < fruitCount; f++) {
      const angle = rng() * 360;
      const dist = crownRx * 0.3 + rng() * crownRx * 0.4;
      const [fx, fy] = polarXY(200, crownY, dist, angle);
      R.push({ id: `r${id++}`, d: circ(fx, fy, 4 + rng() * 3), fill: "#fff" });
    }
    // Branches
    R.push({ id: `r${id++}`, d: `M${200 - 12},${crownY + crownRy - 15} Q${200 - crownRx * 0.6},${crownY + crownRy * 0.6} ${200 - crownRx * 0.7},${crownY + crownRy * 0.3}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: `M${200 + 12},${crownY + crownRy - 15} Q${200 + crownRx * 0.6},${crownY + crownRy * 0.6} ${200 + crownRx * 0.7},${crownY + crownRy * 0.3}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Ground
    R.push({ id: `r${id++}`, d: "M100,378 Q150,370 200,378 Q250,370 300,378", fill: "none", stroke: "#aaa", strokeWidth: 1 });
  } else if (t === 5) { // cactus
    const armCount = 1 + Math.floor(rng() * 2);
    const h = 160 + rng() * 40;
    const w = 28 + rng() * 12;
    const baseY = 355;
    // Main body
    R.push({ id: `r${id++}`, d: `M${200 - w},${baseY} L${200 - w},${baseY - h} Q${200 - w},${baseY - h - 20} 200,${baseY - h - 20} Q${200 + w},${baseY - h - 20} ${200 + w},${baseY - h} L${200 + w},${baseY} Z`, fill: "#fff" });
    // Spines
    for (let s = 0; s < 6; s++) {
      const sy = baseY - 20 - s * (h / 6);
      R.push({ id: `r${id++}`, d: `M${200 - w},${sy} L${200 - w - 8},${sy - 4}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
      R.push({ id: `r${id++}`, d: `M${200 + w},${sy} L${200 + w + 8},${sy - 4}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    }
    // Arms
    if (armCount >= 1) {
      const ay = baseY - h * 0.5;
      R.push({ id: `r${id++}`, d: `M${200 - w},${ay} L${200 - w - 35},${ay} Q${200 - w - 50},${ay} ${200 - w - 50},${ay - 15} L${200 - w - 50},${ay - 50} Q${200 - w - 50},${ay - 65} ${200 - w - 35},${ay - 65} Q${200 - w - 20},${ay - 65} ${200 - w - 20},${ay - 50} L${200 - w - 20},${ay}`, fill: "#fff" });
    }
    if (armCount >= 2) {
      const ay = baseY - h * 0.35;
      R.push({ id: `r${id++}`, d: `M${200 + w},${ay} L${200 + w + 35},${ay} Q${200 + w + 50},${ay} ${200 + w + 50},${ay - 15} L${200 + w + 50},${ay - 40} Q${200 + w + 50},${ay - 55} ${200 + w + 35},${ay - 55} Q${200 + w + 20},${ay - 55} ${200 + w + 20},${ay - 40} L${200 + w + 20},${ay}`, fill: "#fff" });
    }
    // Flower on top
    if (rng() > 0.3) {
      const fcy = baseY - h - 25;
      for (let p = 0; p < 5; p++) {
        const [px, py] = polarXY(200, fcy, 10, p * 72);
        R.push({ id: `r${id++}`, d: circ(px, py, 5), fill: "#fff" });
      }
      R.push({ id: `r${id++}`, d: circ(200, fcy, 4), fill: "#fff" });
    }
    // Ground
    R.push({ id: `r${id++}`, d: `M100,${baseY} Q200,${baseY - 8} 300,${baseY}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
  } else if (t === 6) { // waterfall
    // Cliff
    R.push({ id: `r${id++}`, d: "M50,80 L170,80 L170,250 Q170,290 130,310 Q80,340 50,380 L50,80 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M230,80 L350,80 L350,380 Q310,340 270,310 Q230,290 230,250 L230,80 Z", fill: "#fff" });
    // Water streams
    const streams = 3 + Math.floor(rng() * 3);
    for (let s = 0; s < streams; s++) {
      const sx = 175 + s * (50 / streams);
      const wobble = rng() * 15;
      R.push({ id: `r${id++}`, d: `M${sx},80 Q${sx + wobble},160 ${sx - wobble},250 Q${sx + wobble * 0.5},320 ${sx},380`, fill: "none", stroke: "#aaa", strokeWidth: 2 + rng() * 2 });
    }
    // Splash at bottom
    for (let sp = 0; sp < 4; sp++) {
      const spx = 170 + rng() * 60;
      R.push({ id: `r${id++}`, d: circ(spx, 375 + rng() * 10, 3 + rng() * 4), fill: "#fff" });
    }
    // Rocks
    R.push({ id: `r${id++}`, d: "M160,375 Q175,365 190,375 Q180,370 160,375", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M210,378 Q225,370 240,378 Q228,373 210,378", fill: "#fff" });
    // Plants on cliff
    R.push({ id: `r${id++}`, d: "M60,75 Q55,55 65,45 Q70,60 75,75", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M320,75 Q325,58 335,48 Q330,62 340,75", fill: "#fff" });
    // Top foliage
    R.push({ id: `r${id++}`, d: "M50,80 Q100,70 170,80", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M230,80 Q300,70 350,80", fill: "#fff" });
  } else { // cloud landscape
    // Sky with multiple clouds
    const cloudCount = 3 + Math.floor(rng() * 3);
    for (let c = 0; c < cloudCount; c++) {
      const cx = 40 + rng() * 320;
      const cy = 60 + rng() * 80;
      const cw = 30 + rng() * 30;
      const ch = 15 + rng() * 10;
      R.push({ id: `r${id++}`, d: ellipse(cx, cy, cw, ch), fill: "#fff" });
      R.push({ id: `r${id++}`, d: ellipse(cx - cw * 0.4, cy + 2, cw * 0.6, ch * 0.7), fill: "#fff" });
      R.push({ id: `r${id++}`, d: ellipse(cx + cw * 0.4, cy + 3, cw * 0.5, ch * 0.6), fill: "#fff" });
    }
    // Rolling hills
    R.push({ id: `r${id++}`, d: "M0,280 Q80,210 180,260 Q280,210 400,280 L400,400 L0,400 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M0,320 Q100,270 200,310 Q300,260 400,320 L400,400 L0,400 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M0,360 Q120,330 200,355 Q280,330 400,360 L400,400 L0,400 Z", fill: "#fff" });
    // Trees on hills
    for (let tr = 0; tr < 3 + Math.floor(rng() * 3); tr++) {
      const tx = 40 + rng() * 320;
      const ty = 280 + rng() * 50;
      const th = 15 + rng() * 15;
      R.push({ id: `r${id++}`, d: `M${tx - 2},${ty} L${tx + 2},${ty} L${tx + 1},${ty - th * 0.6} L${tx - 1},${ty - th * 0.6} Z`, fill: "#fff" });
      R.push({ id: `r${id++}`, d: ellipse(tx, ty - th * 0.6 - 5, 8 + rng() * 5, 6 + rng() * 4), fill: "#fff" });
    }
    // Sun
    R.push({ id: `r${id++}`, d: circ(340, 45, 20), fill: "#fff" });
    for (let r = 0; r < 8; r++) {
      const [rx, ry] = polarXY(340, 45, 26, r * 45);
      const [rx2, ry2] = polarXY(340, 45, 35, r * 45);
      R.push({ id: `r${id++}`, d: `M${rx},${ry}L${rx2},${ry2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    }
  }

  return R;
}
