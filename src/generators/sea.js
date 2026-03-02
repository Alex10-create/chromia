import { polarXY, makeRng } from './prng';

export function generateSea(seed) {
  const rng = makeRng(seed * 29 + 17);
  const R = []; let id = 0;
  const t = Math.floor(rng() * 8);
  const circ = (cx, cy, r) => `M${cx},${cy}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;
  const ellipse = (cx, cy, rx, ry) => `M${cx},${cy}m-${rx},0a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 -${rx*2},0`;

  if (t === 0) { // shell (spiral)
    const shellW = 85 + rng() * 25;
    R.push({ id: `r${id++}`, d: `M200,${200 - shellW} Q${200 + shellW * 1.2},${200 - shellW * 0.6} ${200 + shellW * 1.1},200 Q${200 + shellW * 1.2},${200 + shellW * 0.6} 200,${200 + shellW} Q${200 - shellW},${200 + shellW * 0.8} ${200 - shellW},200 Q${200 - shellW},${200 - shellW * 0.8} 200,${200 - shellW}`, fill: "#fff" });
    // Spiral lines
    const spirals = 4 + Math.floor(rng() * 3);
    for (let i = 1; i <= spirals; i++) {
      const r = i * (shellW * 0.7 / spirals);
      R.push({ id: `r${id++}`, d: `M200,${200 - r} A${r},${r} 0 0,1 ${200 + r},200`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    }
    R.push({ id: `r${id++}`, d: circ(200, 200, 10 + rng() * 5), fill: "#fff" });
    // Radial lines
    const radials = 6 + Math.floor(rng() * 4);
    for (let i = 0; i < radials; i++) {
      const a = (360 / radials) * i;
      const [x1, y1] = polarXY(200, 200, 15, a);
      const [x2, y2] = polarXY(200, 200, shellW * 0.85, a);
      R.push({ id: `r${id++}`, d: `M${x1},${y1}L${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    }
  } else if (t === 1) { // whale
    const bodyLen = 110 + rng() * 30;
    R.push({ id: `r${id++}`, d: `M${200 - bodyLen},195 Q${200 - bodyLen},135 ${200 - bodyLen * 0.3},115 Q${200 + bodyLen * 0.4},95 ${200 + bodyLen * 0.7},145 Q${200 + bodyLen},185 ${200 + bodyLen * 0.8},225 Q${200 + bodyLen * 0.5},275 ${200 - bodyLen * 0.1},275 Q${200 - bodyLen * 0.8},265 ${200 - bodyLen},195`, fill: "#fff" });
    // Tail
    R.push({ id: `r${id++}`, d: `M${200 + bodyLen * 0.8},185 Q${200 + bodyLen + 20},155 ${200 + bodyLen + 35},125 Q${200 + bodyLen + 15},165 ${200 + bodyLen},195 Q${200 + bodyLen + 5},190 ${200 + bodyLen * 0.8},185`, fill: "#fff" });
    // Eye
    R.push({ id: `r${id++}`, d: circ(200 - bodyLen + 35, 175, 5), fill: "#fff" });
    // Belly line
    R.push({ id: `r${id++}`, d: `M${200 - bodyLen + 25},225 Q${200},245 ${200 + bodyLen * 0.3},240`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    // Fin
    R.push({ id: `r${id++}`, d: `M${200 - bodyLen * 0.1},125 Q${200 - bodyLen * 0.15},85 ${200 - bodyLen * 0.05},65 Q${200 - bodyLen * 0.02},90 ${200},125`, fill: "#fff" });
    // Water spout
    R.push({ id: `r${id++}`, d: `M${200 - bodyLen * 0.1},118 Q${200 - bodyLen * 0.15},80 ${200 - bodyLen * 0.2},60`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: `M${200 - bodyLen * 0.1},118 Q${200 - bodyLen * 0.05},80 ${200},60`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Waves
    R.push({ id: `r${id++}`, d: `M60,290 Q100,280 140,290 Q180,300 220,290 Q260,280 300,290 Q340,300 370,290`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    // Bubbles
    for (let b = 0; b < 3; b++) {
      R.push({ id: `r${id++}`, d: circ(200 - bodyLen + 15 + rng() * 20, 140 + rng() * 30, 2 + rng() * 4), fill: "#fff" });
    }
  } else if (t === 2) { // starfish
    const arms = 5 + Math.floor(rng() * 2); // 5-6 arms
    const outerR = 80 + rng() * 25;
    const innerR = outerR * (0.3 + rng() * 0.1);
    for (let i = 0; i < arms; i++) {
      const a = (360 / arms) * i - 90;
      const [ox, oy] = polarXY(200, 200, outerR, a);
      const [l1, l1y] = polarXY(200, 200, innerR, a - 360 / arms / 2);
      const [l2, l2y] = polarXY(200, 200, innerR, a + 360 / arms / 2);
      R.push({ id: `r${id++}`, d: `M200,200 L${l1},${l1y} Q${(l1 + ox) / 2 - 8},${(l1y + oy) / 2} ${ox},${oy} Q${(l2 + ox) / 2 + 8},${(l2y + oy) / 2} ${l2},${l2y} Z`, fill: "#fff" });
      // Arm detail dots
      const [dx, dy] = polarXY(200, 200, outerR * 0.5, a);
      R.push({ id: `r${id++}`, d: circ(dx, dy, 3 + rng() * 2), fill: "#fff" });
      const [dx2, dy2] = polarXY(200, 200, outerR * 0.7, a);
      R.push({ id: `r${id++}`, d: circ(dx2, dy2, 2 + rng() * 1.5), fill: "#fff" });
    }
    R.push({ id: `r${id++}`, d: circ(200, 200, 14 + rng() * 5), fill: "#fff" });
    // Eye dots
    R.push({ id: `r${id++}`, d: circ(196, 197, 3), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(204, 197, 3), fill: "#fff" });
  } else if (t === 3) { // jellyfish
    const bellW = 65 + rng() * 25;
    const bellH = 45 + rng() * 20;
    // Bell
    R.push({ id: `r${id++}`, d: `M${200 - bellW},195 Q${200 - bellW},${195 - bellH * 1.5} 200,${195 - bellH} Q${200 + bellW},${195 - bellH * 1.5} ${200 + bellW},195 L${200 - bellW},195`, fill: "#fff" });
    // Inner bell pattern
    R.push({ id: `r${id++}`, d: `M${200 - bellW * 0.6},190 Q${200 - bellW * 0.6},${195 - bellH * 1.1} 200,${195 - bellH + 10} Q${200 + bellW * 0.6},${195 - bellH * 1.1} ${200 + bellW * 0.6},190`, fill: "#fff" });
    // Eyes
    R.push({ id: `r${id++}`, d: circ(200 - bellW * 0.25, 195 - bellH * 0.5, 7), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + bellW * 0.25, 195 - bellH * 0.5, 7), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 - bellW * 0.25, 195 - bellH * 0.5, 3), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + bellW * 0.25, 195 - bellH * 0.5, 3), fill: "#fff" });
    // Tentacles
    const tentCount = 4 + Math.floor(rng() * 4);
    for (let i = 0; i < tentCount; i++) {
      const x = 200 - bellW + 10 + i * ((bellW * 2 - 20) / (tentCount - 1));
      const len = 100 + rng() * 60;
      const w1 = rng() * 15, w2 = rng() * 15;
      R.push({ id: `r${id++}`, d: `M${x},195 Q${x + w1},${195 + len * 0.33} ${x - w2},${195 + len * 0.66} Q${x + w1 * 0.5},${195 + len * 0.85} ${x},${195 + len}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 + rng() });
    }
    // Frilly edge
    const frilCount = 8 + Math.floor(rng() * 4);
    for (let f = 0; f < frilCount; f++) {
      const fx = 200 - bellW + 5 + f * ((bellW * 2 - 10) / (frilCount - 1));
      R.push({ id: `r${id++}`, d: `M${fx},195 Q${fx + 5},205 ${fx + 10},195`, fill: "#fff" });
    }
  } else if (t === 4) { // crab
    const bodyW = 58 + rng() * 15;
    R.push({ id: `r${id++}`, d: `M${200 - bodyW},205 Q${200 - bodyW},165 200,155 Q${200 + bodyW},165 ${200 + bodyW},205 Q${200 + bodyW},245 200,255 Q${200 - bodyW},245 ${200 - bodyW},205`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 - bodyW * 0.35, 195, 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + bodyW * 0.35, 195, 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 - bodyW * 0.35, 195, 2.5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + bodyW * 0.35, 195, 2.5), fill: "#fff" });
    // Mouth
    R.push({ id: `r${id++}`, d: "M192,222 Q200,228 208,222", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    // Claws
    const clawSize = 25 + rng() * 15;
    R.push({ id: `r${id++}`, d: `M${200 - bodyW},195 Q${200 - bodyW - 30},165 ${200 - bodyW - 45},135`, fill: "none", stroke: "#aaa", strokeWidth: 2.5 });
    R.push({ id: `r${id++}`, d: `M${200 + bodyW},195 Q${200 + bodyW + 30},165 ${200 + bodyW + 45},135`, fill: "none", stroke: "#aaa", strokeWidth: 2.5 });
    // Pincer
    R.push({ id: `r${id++}`, d: `M${200 - bodyW - 45},135 Q${200 - bodyW - 60},115 ${200 - bodyW - 50},105 Q${200 - bodyW - 40},115 ${200 - bodyW - 45},135`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 - bodyW - 45},135 Q${200 - bodyW - 30},120 ${200 - bodyW - 35},108 Q${200 - bodyW - 42},118 ${200 - bodyW - 45},135`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 + bodyW + 45},135 Q${200 + bodyW + 60},115 ${200 + bodyW + 50},105 Q${200 + bodyW + 40},115 ${200 + bodyW + 45},135`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 + bodyW + 45},135 Q${200 + bodyW + 30},120 ${200 + bodyW + 35},108 Q${200 + bodyW + 42},118 ${200 + bodyW + 45},135`, fill: "#fff" });
    // Legs
    const legCount = 3;
    for (let l = 0; l < legCount; l++) {
      const ly = 230 + l * 10;
      const lx1 = 200 - bodyW + 5 + l * 8;
      const lx2 = 200 + bodyW - 5 - l * 8;
      R.push({ id: `r${id++}`, d: `M${lx1},255 L${lx1 - 15},${ly + 35} L${lx1 - 5},${ly + 30} Z`, fill: "#fff" });
      R.push({ id: `r${id++}`, d: `M${lx2},255 L${lx2 + 15},${ly + 35} L${lx2 + 5},${ly + 30} Z`, fill: "#fff" });
    }
  } else if (t === 5) { // seahorse
    // Body curve
    R.push({ id: `r${id++}`, d: "M200,80 Q235,85 240,120 Q245,155 230,180 Q218,200 215,230 Q212,260 225,280 Q240,300 230,320 Q215,340 195,340 Q175,340 165,320 Q155,300 170,280 Q185,260 188,230 Q190,200 175,180 Q160,155 155,120 Q155,85 200,80", fill: "#fff" });
    // Inner body
    R.push({ id: `r${id++}`, d: "M200,95 Q225,100 228,125 Q230,150 220,170 Q210,185 208,210 Q206,235 215,255 Q225,270 220,290 Q210,310 195,310 Q180,310 175,290 Q170,270 180,255 Q190,235 192,210 Q194,185 182,170 Q172,150 170,125 Q170,100 200,95", fill: "#fff" });
    // Eye
    R.push({ id: `r${id++}`, d: circ(200, 105, 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200, 105, 2.5), fill: "#fff" });
    // Snout
    R.push({ id: `r${id++}`, d: "M200,80 Q215,70 225,65 Q218,72 210,80", fill: "#fff" });
    // Crown/fin
    const finSpikes = 4 + Math.floor(rng() * 3);
    for (let f = 0; f < finSpikes; f++) {
      const fy = 110 + f * 30;
      const fx = 155 - f * 2;
      R.push({ id: `r${id++}`, d: `M${fx + 10},${fy} L${fx - 10},${fy - 8} L${fx + 5},${fy + 12}`, fill: "#fff" });
    }
    // Belly segments
    for (let s = 0; s < 5; s++) {
      const sy = 160 + s * 25;
      R.push({ id: `r${id++}`, d: `M${185 + s * 2},${sy} Q200,${sy + 5} ${215 - s * 2},${sy}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    }
    // Tail curl detail
    R.push({ id: `r${id++}`, d: circ(195, 330, 5), fill: "#fff" });
    // Bubbles
    for (let b = 0; b < 3; b++) {
      R.push({ id: `r${id++}`, d: circ(240 + rng() * 40, 80 + rng() * 100, 2 + rng() * 4), fill: "#fff" });
    }
  } else if (t === 6) { // octopus
    // Head
    const headR = 55 + rng() * 15;
    R.push({ id: `r${id++}`, d: ellipse(200, 140, headR, headR * 0.85), fill: "#fff" });
    // Eyes
    const eyeR = headR * 0.2;
    R.push({ id: `r${id++}`, d: circ(200 - headR * 0.3, 140, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + headR * 0.3, 140, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 - headR * 0.3, 140, eyeR * 0.4), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + headR * 0.3, 140, eyeR * 0.4), fill: "#fff" });
    // Mouth
    R.push({ id: `r${id++}`, d: `M${200 - headR * 0.15},${140 + headR * 0.4} Q200,${140 + headR * 0.55} ${200 + headR * 0.15},${140 + headR * 0.4}`, fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    // Head spots
    for (let s = 0; s < 3; s++) {
      const [sx, sy] = polarXY(200, 130, headR * 0.4, -60 + s * 60);
      R.push({ id: `r${id++}`, d: circ(sx, sy, 4 + rng() * 3), fill: "#fff" });
    }
    // Tentacles (8)
    const tentacles = 8;
    for (let i = 0; i < tentacles; i++) {
      const baseAngle = 100 + i * (160 / (tentacles - 1));
      const [bx, by] = polarXY(200, 140 + headR * 0.5, headR * 0.6, baseAngle);
      const len = 80 + rng() * 50;
      const curl = 20 + rng() * 30;
      const dir = i < tentacles / 2 ? -1 : 1;
      R.push({ id: `r${id++}`, d: `M${bx},${by} Q${bx + dir * curl},${by + len * 0.5} ${bx + dir * curl * 0.5},${by + len}`, fill: "none", stroke: "#aaa", strokeWidth: 2.5 - (i % 2) * 0.5 });
      // Suction cups
      const [sx, sy] = [bx + dir * curl * 0.5, by + len * 0.4];
      R.push({ id: `r${id++}`, d: circ(sx, sy, 2), fill: "#fff" });
    }
  } else { // tropical fish
    const bodyH = 50 + rng() * 25;
    // Body (rounded diamond)
    R.push({ id: `r${id++}`, d: `M100,200 Q200,${200 - bodyH * 1.4} 280,200 Q200,${200 + bodyH * 1.4} 100,200`, fill: "#fff" });
    // Stripes
    const stripes = 3 + Math.floor(rng() * 3);
    const stripeGap = 160 / (stripes + 1);
    for (let s = 0; s < stripes; s++) {
      const sx = 120 + (s + 1) * stripeGap;
      R.push({ id: `r${id++}`, d: `M${sx},${200 - bodyH * 0.8} L${sx},${200 + bodyH * 0.8}`, fill: "none", stroke: "#aaa", strokeWidth: 3 + rng() * 3 });
    }
    // Tail
    const tailH = bodyH * (0.7 + rng() * 0.4);
    R.push({ id: `r${id++}`, d: `M275,200 L330,${200 - tailH} L340,200 L330,${200 + tailH} Z`, fill: "#fff" });
    // Tail detail
    R.push({ id: `r${id++}`, d: `M280,200 L320,${200 - tailH * 0.5}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: `M280,200 L320,${200 + tailH * 0.5}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    // Eye
    R.push({ id: `r${id++}`, d: circ(135, 195, 9), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(135, 195, 4), fill: "#fff" });
    // Mouth
    R.push({ id: `r${id++}`, d: "M108,202 Q112,198 116,202", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    // Top fin
    R.push({ id: `r${id++}`, d: `M160,${200 - bodyH * 1.1} Q180,${200 - bodyH * 1.6} 210,${200 - bodyH * 1.3} Q230,${200 - bodyH * 1.5} 250,${200 - bodyH * 1.1}`, fill: "#fff" });
    // Bottom fin
    R.push({ id: `r${id++}`, d: `M170,${200 + bodyH * 1.0} Q190,${200 + bodyH * 1.4} 220,${200 + bodyH * 1.1}`, fill: "#fff" });
    // Pectoral fin
    R.push({ id: `r${id++}`, d: `M165,210 Q180,235 200,220 Q185,215 165,210`, fill: "#fff" });
    // Bubbles
    for (let b = 0; b < 3; b++) {
      R.push({ id: `r${id++}`, d: circ(85 + rng() * 20, 170 + rng() * 30, 2 + rng() * 3), fill: "#fff" });
    }
  }

  return R;
}
