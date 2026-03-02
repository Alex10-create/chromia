import { polarXY, makeRng } from './prng';

export function generateSpace(seed) {
  const rng = makeRng(seed * 31 + 19);
  const R = []; let id = 0;
  const t = Math.floor(rng() * 8);
  const circ = (cx, cy, r) => `M${cx},${cy}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;
  const ellipse = (cx, cy, rx, ry) => `M${cx},${cy}m-${rx},0a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 -${rx*2},0`;

  // Stars background (common)
  const addStars = (count) => {
    for (let i = 0; i < count; i++) {
      const sx = 25 + rng() * 350, sy = 25 + rng() * 350;
      const sr = 1.5 + rng() * 2;
      // 4-pointed star
      R.push({ id: `r${id++}`, d: `M${sx},${sy - sr}L${sx + sr * 0.3},${sy}L${sx},${sy + sr}L${sx - sr * 0.3},${sy}Z`, fill: "#fff" });
    }
  };

  if (t === 0) { // rocket
    const bodyW = 16 + rng() * 8;
    const bodyH = 140 + rng() * 30;
    const noseH = 35 + rng() * 15;
    const cy = 165;
    // Nose cone
    R.push({ id: `r${id++}`, d: `M${200 - bodyW},${cy - bodyH / 2 + noseH} Q200,${cy - bodyH / 2 - noseH} ${200 + bodyW},${cy - bodyH / 2 + noseH}`, fill: "#fff" });
    // Body
    R.push({ id: `r${id++}`, d: `M${200 - bodyW},${cy - bodyH / 2 + noseH} L${200 + bodyW},${cy - bodyH / 2 + noseH} L${200 + bodyW},${cy + bodyH / 2} L${200 - bodyW},${cy + bodyH / 2} Z`, fill: "#fff" });
    // Window(s)
    const windows = 1 + Math.floor(rng() * 2);
    for (let w = 0; w < windows; w++) {
      const wy = cy - bodyH * 0.15 + w * 35;
      const wr = 7 + rng() * 4;
      R.push({ id: `r${id++}`, d: circ(200, wy, wr), fill: "#fff" });
    }
    // Fins
    const finW = 18 + rng() * 12;
    const finH = 40 + rng() * 15;
    R.push({ id: `r${id++}`, d: `M${200 - bodyW},${cy + bodyH / 2 - 10} L${200 - bodyW - finW},${cy + bodyH / 2 + finH} L${200 - bodyW},${cy + bodyH / 2} Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 + bodyW},${cy + bodyH / 2 - 10} L${200 + bodyW + finW},${cy + bodyH / 2 + finH} L${200 + bodyW},${cy + bodyH / 2} Z`, fill: "#fff" });
    // Exhaust flame
    R.push({ id: `r${id++}`, d: `M${200 - bodyW + 4},${cy + bodyH / 2} Q200,${cy + bodyH / 2 + 50 + rng() * 25} ${200 + bodyW - 4},${cy + bodyH / 2}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 - bodyW / 2},${cy + bodyH / 2} Q200,${cy + bodyH / 2 + 30 + rng() * 15} ${200 + bodyW / 2},${cy + bodyH / 2}`, fill: "#fff" });
    // Stripes on body
    R.push({ id: `r${id++}`, d: `M${200 - bodyW},${cy + bodyH / 2 - 20} L${200 + bodyW},${cy + bodyH / 2 - 20}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    addStars(6 + Math.floor(rng() * 4));
  } else if (t === 1) { // planet with rings
    const planetR = 55 + rng() * 20;
    R.push({ id: `r${id++}`, d: circ(200, 200, planetR), fill: "#fff" });
    // Planet bands
    const bands = 2 + Math.floor(rng() * 3);
    for (let b = 0; b < bands; b++) {
      const by = 200 - planetR * 0.6 + b * (planetR * 1.2 / bands);
      const bw = planetR * (0.7 + Math.sin(b * 1.2) * 0.3);
      R.push({ id: `r${id++}`, d: `M${200 - bw},${by} Q200,${by + 5} ${200 + bw},${by}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    }
    // Ring
    const ringTilt = 10 + rng() * 20;
    const ringW = planetR * (1.5 + rng() * 0.5);
    R.push({ id: `r${id++}`, d: ellipse(200, 200, ringW, ringTilt), fill: "none", stroke: "#aaa", strokeWidth: 3 });
    R.push({ id: `r${id++}`, d: ellipse(200, 200, ringW * 0.8, ringTilt * 0.75), fill: "none", stroke: "#aaa", strokeWidth: 2 });
    // Small moon
    const moonA = rng() * 360;
    const [mx, my] = polarXY(200, 200, planetR + 45 + rng() * 20, moonA);
    R.push({ id: `r${id++}`, d: circ(mx, my, 8 + rng() * 5), fill: "#fff" });
    addStars(5 + Math.floor(rng() * 4));
  } else if (t === 2) { // moon with craters
    const moonR = 75 + rng() * 15;
    R.push({ id: `r${id++}`, d: circ(200, 200, moonR), fill: "#fff" });
    // Craters
    const craterCount = 4 + Math.floor(rng() * 4);
    for (let c = 0; c < craterCount; c++) {
      const a = rng() * 360;
      const dist = rng() * moonR * 0.7;
      const [cx, cy] = polarXY(200, 200, dist, a);
      const cr = 5 + rng() * 12;
      R.push({ id: `r${id++}`, d: circ(cx, cy, cr), fill: "#fff" });
      // Crater shadow arc
      if (cr > 7) {
        R.push({ id: `r${id++}`, d: `M${cx - cr * 0.6},${cy + cr * 0.3} A${cr * 0.6},${cr * 0.3} 0 0,0 ${cx + cr * 0.6},${cy + cr * 0.3}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
      }
    }
    // Moon surface texture
    for (let l = 0; l < 3; l++) {
      const lx = 200 - moonR * 0.5 + rng() * moonR;
      const ly = 200 + moonR * 0.2 + rng() * moonR * 0.4;
      R.push({ id: `r${id++}`, d: `M${lx},${ly} Q${lx + 10},${ly - 3} ${lx + 20},${ly}`, fill: "none", stroke: "#aaa", strokeWidth: 0.8 });
    }
    addStars(8 + Math.floor(rng() * 4));
  } else if (t === 3) { // UFO
    const domeW = 30 + rng() * 15;
    const bodyW = 60 + rng() * 20;
    const cy = 180;
    // Dome
    R.push({ id: `r${id++}`, d: `M${200 - domeW},${cy} Q${200 - domeW},${cy - 45} 200,${cy - 50} Q${200 + domeW},${cy - 45} ${200 + domeW},${cy}`, fill: "#fff" });
    // Body disc
    R.push({ id: `r${id++}`, d: ellipse(200, cy + 5, bodyW, 18), fill: "#fff" });
    // Dome window
    R.push({ id: `r${id++}`, d: circ(200, cy - 25, 10 + rng() * 5), fill: "#fff" });
    // Lights on body
    const lightCount = 3 + Math.floor(rng() * 3);
    for (let l = 0; l < lightCount; l++) {
      const la = -60 + l * (120 / (lightCount - 1));
      const [lx, ly] = polarXY(200, cy + 5, bodyW * 0.65, la + 90);
      R.push({ id: `r${id++}`, d: circ(lx, ly + 3, 3), fill: "#fff" });
    }
    // Beam
    const beamW = bodyW * (0.4 + rng() * 0.3);
    R.push({ id: `r${id++}`, d: `M${200 - beamW * 0.4},${cy + 23} L${200 - beamW},${cy + 130} L${200 + beamW},${cy + 130} L${200 + beamW * 0.4},${cy + 23} Z`, fill: "#fff" });
    // Antenna
    R.push({ id: `r${id++}`, d: `M200,${cy - 50} L200,${cy - 65}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: circ(200, cy - 68, 3), fill: "#fff" });
    addStars(5 + Math.floor(rng() * 3));
  } else if (t === 4) { // satellite
    const cx = 200, cy = 185;
    // Body box
    R.push({ id: `r${id++}`, d: `M${cx - 18},${cy - 22} L${cx + 18},${cy - 22} L${cx + 18},${cy + 22} L${cx - 18},${cy + 22} Z`, fill: "#fff" });
    // Dish/antenna
    R.push({ id: `r${id++}`, d: `M${cx},${cy - 22} L${cx - 8},${cy - 50} L${cx + 8},${cy - 50} Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx - 20},${cy - 55} Q${cx},${cy - 70} ${cx + 20},${cy - 55}`, fill: "#fff" });
    // Solar panels
    const panelW = 55 + rng() * 20;
    const panelH = 30 + rng() * 15;
    // Left panel
    R.push({ id: `r${id++}`, d: `M${cx - 18},${cy - panelH / 2} L${cx - 18 - panelW},${cy - panelH / 2} L${cx - 18 - panelW},${cy + panelH / 2} L${cx - 18},${cy + panelH / 2} Z`, fill: "#fff" });
    // Panel grid
    R.push({ id: `r${id++}`, d: `M${cx - 18 - panelW / 2},${cy - panelH / 2} L${cx - 18 - panelW / 2},${cy + panelH / 2}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: `M${cx - 18 - panelW},${cy} L${cx - 18},${cy}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    // Right panel
    R.push({ id: `r${id++}`, d: `M${cx + 18},${cy - panelH / 2} L${cx + 18 + panelW},${cy - panelH / 2} L${cx + 18 + panelW},${cy + panelH / 2} L${cx + 18},${cy + panelH / 2} Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${cx + 18 + panelW / 2},${cy - panelH / 2} L${cx + 18 + panelW / 2},${cy + panelH / 2}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: `M${cx + 18},${cy} L${cx + 18 + panelW},${cy}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    // Signal waves
    for (let w = 1; w <= 3; w++) {
      const wr = 8 + w * 8;
      R.push({ id: `r${id++}`, d: `M${cx - wr * 0.3},${cy - 65 - w * 6} A${wr},${wr} 0 0,1 ${cx + wr * 0.3},${cy - 65 - w * 6}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    }
    addStars(7 + Math.floor(rng() * 4));
  } else if (t === 5) { // astronaut helmet
    // Helmet visor
    const helmetR = 65 + rng() * 15;
    R.push({ id: `r${id++}`, d: circ(200, 175, helmetR), fill: "#fff" });
    // Visor
    R.push({ id: `r${id++}`, d: circ(200, 175, helmetR * 0.7), fill: "#fff" });
    // Visor reflection
    R.push({ id: `r${id++}`, d: `M${200 - helmetR * 0.35},${175 - helmetR * 0.25} Q${200 - helmetR * 0.15},${175 - helmetR * 0.4} ${200 + helmetR * 0.1},${175 - helmetR * 0.3}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Body/suit
    R.push({ id: `r${id++}`, d: `M${200 - helmetR * 0.7},${175 + helmetR - 5} Q${200 - helmetR},${175 + helmetR + 60} 200,${175 + helmetR + 80} Q${200 + helmetR},${175 + helmetR + 60} ${200 + helmetR * 0.7},${175 + helmetR - 5}`, fill: "#fff" });
    // Backpack
    R.push({ id: `r${id++}`, d: `M${200 + helmetR * 0.5},${175 + helmetR * 0.3} L${200 + helmetR + 15},${175 + helmetR * 0.3} L${200 + helmetR + 15},${175 + helmetR + 30} L${200 + helmetR * 0.5},${175 + helmetR + 30} Z`, fill: "#fff" });
    // Flag/badge
    if (rng() > 0.5) {
      R.push({ id: `r${id++}`, d: `M${200 - helmetR * 0.3},${175 + helmetR + 20} L${200 - helmetR * 0.3 + 15},${175 + helmetR + 18} L${200 - helmetR * 0.3 + 15},${175 + helmetR + 30} L${200 - helmetR * 0.3},${175 + helmetR + 30} Z`, fill: "#fff" });
    }
    // Oxygen tube
    R.push({ id: `r${id++}`, d: `M${200 + helmetR * 0.6},${175 + helmetR * 0.1} Q${200 + helmetR + 5},${175 + helmetR * 0.1} ${200 + helmetR + 10},${175 + helmetR * 0.5}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    addStars(6 + Math.floor(rng() * 3));
  } else if (t === 6) { // constellation
    // Generate star positions
    const starCount = 6 + Math.floor(rng() * 5);
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push([60 + rng() * 280, 60 + rng() * 280]);
    }
    // Draw stars as small shapes
    for (let i = 0; i < stars.length; i++) {
      const [sx, sy] = stars[i];
      const sr = 4 + rng() * 4;
      // Small 4-pointed star
      R.push({ id: `r${id++}`, d: `M${sx},${sy - sr}L${sx + sr * 0.35},${sy}L${sx},${sy + sr}L${sx - sr * 0.35},${sy}Z`, fill: "#fff" });
      R.push({ id: `r${id++}`, d: `M${sx - sr},${sy}L${sx},${sy - sr * 0.35}L${sx + sr},${sy}L${sx},${sy + sr * 0.35}Z`, fill: "#fff" });
    }
    // Connect stars with lines
    for (let i = 0; i < stars.length - 1; i++) {
      const [x1, y1] = stars[i];
      const j = i + 1 + Math.floor(rng() * Math.min(2, stars.length - i - 1));
      const [x2, y2] = stars[Math.min(j, stars.length - 1)];
      R.push({ id: `r${id++}`, d: `M${x1},${y1}L${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    }
    // One big central star
    const bigR = 15 + rng() * 8;
    const bx = 180 + rng() * 40, by = 180 + rng() * 40;
    R.push({ id: `r${id++}`, d: circ(bx, by, bigR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(bx, by, bigR * 0.5), fill: "#fff" });
    // Rays from big star
    for (let r = 0; r < 4; r++) {
      const [rx, ry] = polarXY(bx, by, bigR + 5, r * 90);
      const [rx2, ry2] = polarXY(bx, by, bigR + 15, r * 90);
      R.push({ id: `r${id++}`, d: `M${rx},${ry}L${rx2},${ry2}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    }
    addStars(4);
  } else { // comet
    const cometR = 25 + rng() * 12;
    const angle = 30 + rng() * 30; // tail direction
    const tailLen = 160 + rng() * 60;
    const cx = 140 + rng() * 40, cy = 140 + rng() * 40;
    // Comet head
    R.push({ id: `r${id++}`, d: circ(cx, cy, cometR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(cx, cy, cometR * 0.5), fill: "#fff" });
    // Tail (fan shape)
    const [t1x, t1y] = polarXY(cx, cy, tailLen, angle - 8);
    const [t2x, t2y] = polarXY(cx, cy, tailLen, angle + 8);
    const [t3x, t3y] = polarXY(cx, cy, tailLen * 0.8, angle);
    R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${t3x},${t3y} ${t1x},${t1y}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    R.push({ id: `r${id++}`, d: `M${cx},${cy} Q${t3x},${t3y} ${t2x},${t2y}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    R.push({ id: `r${id++}`, d: `M${cx},${cy} L${t3x},${t3y}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Debris
    for (let d = 0; d < 4; d++) {
      const dist = 30 + rng() * tailLen * 0.6;
      const spread = (rng() - 0.5) * 20;
      const [dx, dy] = polarXY(cx, cy, dist, angle + spread);
      R.push({ id: `r${id++}`, d: circ(dx, dy, 2 + rng() * 3), fill: "#fff" });
    }
    // Glow ring
    R.push({ id: `r${id++}`, d: circ(cx, cy, cometR + 8), fill: "none", stroke: "#aaa", strokeWidth: 1 });
    addStars(8 + Math.floor(rng() * 4));
  }

  return R;
}
