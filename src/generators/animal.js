import { polarXY, makeRng } from './prng';

export function generateAnimal(seed) {
  const rng = makeRng(seed * 11 + 5);
  const R = []; let id = 0;
  const t = Math.floor(rng() * 10);
  const circ = (cx, cy, r) => `M${cx},${cy}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;
  const ellipse = (cx, cy, rx, ry) => `M${cx},${cy}m-${rx},0a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 -${rx*2},0`;

  if (t === 0) { // cat
    const earH = 55 + rng() * 25;
    R.push({ id: `r${id++}`, d: "M140,195 Q140,115 200,95 Q260,115 260,195 Q260,255 200,275 Q140,255 140,195", fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M145,150 L${125 - rng()*10},${80 - rng()*15} L175,130 Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M255,150 L${275 + rng()*10},${80 - rng()*15} L225,130 Z`, fill: "#fff" });
    // Inner ears
    R.push({ id: `r${id++}`, d: "M152,148 L135,95 L170,135 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M248,148 L265,95 L230,135 Z", fill: "#fff" });
    const eyeR = 7 + rng() * 5;
    R.push({ id: `r${id++}`, d: circ(177, 172, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(223, 172, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(177, 172, eyeR * 0.4), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(223, 172, eyeR * 0.4), fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M194,198 Q200,206 206,198", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Whiskers
    R.push({ id: `r${id++}`, d: "M175,200 L130,190", fill: "none", stroke: "#aaa", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: "M175,205 L128,210", fill: "none", stroke: "#aaa", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: "M225,200 L270,190", fill: "none", stroke: "#aaa", strokeWidth: 1 });
    R.push({ id: `r${id++}`, d: "M225,205 L272,210", fill: "none", stroke: "#aaa", strokeWidth: 1 });
    // Body
    R.push({ id: `r${id++}`, d: "M155,275 Q168,355 200,370 Q232,355 245,275", fill: "#fff" });
    // Paws
    R.push({ id: `r${id++}`, d: ellipse(175, 370, 14, 8), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(225, 370, 14, 8), fill: "#fff" });
    // Tail
    const tailDir = rng() > 0.5 ? 1 : -1;
    R.push({ id: `r${id++}`, d: `M${tailDir > 0 ? 245 : 155},315 Q${200 + tailDir * 95},298 ${200 + tailDir * 115},328 Q${200 + tailDir * 88},315 ${200 + tailDir * 58},328`, fill: "#fff" });
    // Stripes (optional)
    if (rng() > 0.4) {
      for (let s = 0; s < 3; s++) {
        const sy = 130 + s * 25;
        R.push({ id: `r${id++}`, d: `M${170 + s * 5},${sy} Q200,${sy - 8} ${230 - s * 5},${sy}`, fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
      }
    }
  } else if (t === 1) { // bunny
    const earW = 10 + rng() * 6;
    R.push({ id: `r${id++}`, d: "M160,215 Q160,155 200,145 Q240,155 240,215 Q240,275 200,285 Q160,275 160,215", fill: "#fff" });
    // Ears — varied droop
    const droop = rng() * 20;
    R.push({ id: `r${id++}`, d: `M177,150 Q${172 - earW},${55 + droop} ${182 - earW/2},${45 + droop} Q${196 + earW/3},55 190,150`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M210,150 Q${208 + earW},${55 + droop} ${218 + earW/2},${45 + droop} Q${230 - earW/3},55 223,150`, fill: "#fff" });
    // Inner ears
    R.push({ id: `r${id++}`, d: `M180,145 Q${175 - earW + 3},${65 + droop} ${184 - earW/3},${55 + droop} Q192,65 188,145`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M212,145 Q${213 + earW - 3},${65 + droop} ${216 + earW/3},${55 + droop} Q226,65 222,145`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(183, 198, 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(217, 198, 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M195,233 Q200,241 205,233", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    // Cheeks
    R.push({ id: `r${id++}`, d: ellipse(168, 225, 10, 7), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(232, 225, 10, 7), fill: "#fff" });
    // Body
    R.push({ id: `r${id++}`, d: "M160,285 Q163,360 200,375 Q237,360 240,285", fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(200, 375, 14, 7), fill: "#fff" });
    // Paws
    R.push({ id: `r${id++}`, d: ellipse(170, 365, 10, 6), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(230, 365, 10, 6), fill: "#fff" });
  } else if (t === 2) { // owl
    const bodyW = 45 + rng() * 10;
    R.push({ id: `r${id++}`, d: `M${200 - bodyW},178 Q${200 - bodyW},108 200,88 Q${200 + bodyW},108 ${200 + bodyW},178 Q${200 + bodyW},298 200,318 Q${200 - bodyW},298 ${200 - bodyW},178`, fill: "#fff" });
    // Big eyes
    const eyeR = 18 + rng() * 6;
    R.push({ id: `r${id++}`, d: circ(176, 165, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(224, 165, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(176, 165, eyeR * 0.4), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(224, 165, eyeR * 0.4), fill: "#fff" });
    // Brow line
    R.push({ id: `r${id++}`, d: `M${176 - eyeR},${165 - eyeR * 0.6} Q176,${165 - eyeR - 5} 200,${165 - eyeR * 0.3} Q224,${165 - eyeR - 5} ${224 + eyeR},${165 - eyeR * 0.6}`, fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Beak
    R.push({ id: `r${id++}`, d: "M196,196 L200,213 L204,196 Z", fill: "#fff" });
    // Wings
    R.push({ id: `r${id++}`, d: `M${200 - bodyW + 5},196 Q${200 - bodyW - 40},214 ${200 - bodyW - 50},254 Q${200 - bodyW - 20},236 ${200 - bodyW + 2},226`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 + bodyW - 5},196 Q${200 + bodyW + 40},214 ${200 + bodyW + 50},254 Q${200 + bodyW + 20},236 ${200 + bodyW - 2},226`, fill: "#fff" });
    // Feet
    R.push({ id: `r${id++}`, d: "M172,296 Q182,356 200,366 Q218,356 228,296", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M180,366 L172,380 M190,366 L190,382 M200,366 L204,382 M210,366 L214,380 M220,366 L226,378", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    // Ear tufts
    R.push({ id: `r${id++}`, d: `M${200 - bodyW + 10},108 L${200 - bodyW},78 L${200 - bodyW + 25},103`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    R.push({ id: `r${id++}`, d: `M${200 + bodyW - 10},108 L${200 + bodyW},78 L${200 + bodyW - 25},103`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    // Chest feather pattern
    const feathers = 3 + Math.floor(rng() * 3);
    for (let f = 0; f < feathers; f++) {
      const fy = 230 + f * 18;
      const fw = 12 + f * 4;
      R.push({ id: `r${id++}`, d: `M${200 - fw},${fy} Q200,${fy + 10} ${200 + fw},${fy}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
    }
  } else if (t === 3) { // fish
    const bodyH = 80 + rng() * 40;
    R.push({ id: `r${id++}`, d: `M82,200 Q200,${200 - bodyH} 318,200 Q200,${200 + bodyH} 82,200`, fill: "#fff" });
    // Tail
    const tailW = 45 + rng() * 25;
    R.push({ id: `r${id++}`, d: `M308,200 L${308 + tailW},${200 - tailW} L${308 + tailW},${200 + tailW} Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(138, 188, 7), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(138, 188, 3), fill: "#fff" });
    // Scales
    const scaleRows = 3 + Math.floor(rng() * 3);
    for (let s = 0; s < scaleRows; s++) {
      const sy = 170 + s * 20;
      R.push({ id: `r${id++}`, d: `M${160 + s * 10},${sy} Q${210 + s * 5},${sy - 4} ${260 - s * 8},${sy + s * 4}`, fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    }
    // Fins
    const finH = 30 + rng() * 25;
    R.push({ id: `r${id++}`, d: `M200,${200 - bodyH * 0.7} Q${210},${200 - bodyH * 0.7 - finH} ${226},${200 - bodyH * 0.5} Q214,${200 - bodyH * 0.5 - 5} 210,${200 - bodyH * 0.6}`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M200,${200 + bodyH * 0.5} Q210,${200 + bodyH * 0.5 + finH * 0.6} 196,${200 + bodyH * 0.7} Q200,${200 + bodyH * 0.55} 196,${200 + bodyH * 0.45}`, fill: "#fff" });
    // Mouth
    R.push({ id: `r${id++}`, d: "M100,200 Q108,196 116,200", fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    // Bubbles
    for (let b = 0; b < 3; b++) {
      const bx = 70 + rng() * 20, by = 140 + rng() * 40, br = 3 + rng() * 5;
      R.push({ id: `r${id++}`, d: circ(bx, by, br), fill: "#fff" });
    }
  } else if (t === 4) { // bear
    const headW = 46 + rng() * 8;
    R.push({ id: `r${id++}`, d: `M${200-headW},208 Q${200-headW},138 200,118 Q${200+headW},138 ${200+headW},208 Q${200+headW},278 200,298 Q${200-headW},278 ${200-headW},208`, fill: "#fff" });
    // Ears
    const earR = 18 + rng() * 5;
    R.push({ id: `r${id++}`, d: circ(200 - headW + 5, 143, earR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + headW - 5, 143, earR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 - headW + 5, 143, earR * 0.5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(200 + headW - 5, 143, earR * 0.5), fill: "#fff" });
    // Eyes
    R.push({ id: `r${id++}`, d: circ(181, 193, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(219, 193, 5), fill: "#fff" });
    // Nose/muzzle
    R.push({ id: `r${id++}`, d: ellipse(200, 218, 16, 10), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(200, 213, 6, 4), fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,217 L200,224", fill: "none", stroke: "#aaa", strokeWidth: 1 });
    // Body
    R.push({ id: `r${id++}`, d: "M152,298 Q157,375 200,390 Q243,375 248,298", fill: "#fff" });
    // Belly circle
    R.push({ id: `r${id++}`, d: ellipse(200, 345, 22, 20), fill: "#fff" });
    // Arms/paws
    R.push({ id: `r${id++}`, d: "M152,336 Q114,346 104,366 L152,366 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M248,336 Q286,346 296,366 L248,366 Z", fill: "#fff" });
  } else if (t === 5) { // fox
    const earH = 80 + rng() * 20;
    R.push({ id: `r${id++}`, d: "M157,208 Q157,148 200,128 Q243,148 243,208 Q243,268 200,288 Q157,268 157,208", fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M157,163 L${122 - rng()*8},${68 - rng()*12} L187,143 Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M243,163 L${278 + rng()*8},${68 - rng()*12} L213,143 Z`, fill: "#fff" });
    // Inner ears
    R.push({ id: `r${id++}`, d: "M162,160 L132,82 L182,142 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M238,160 L268,82 L218,142 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(181, 193, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(219, 193, 5), fill: "#fff" });
    // Nose
    R.push({ id: `r${id++}`, d: "M191,223 Q200,233 209,223 L200,243 Z", fill: "#fff" });
    // Cheek/mouth area
    R.push({ id: `r${id++}`, d: "M172,228 Q157,258 200,288 Q243,258 228,228 Q200,268 172,228", fill: "#fff" });
    // Body + tail
    R.push({ id: `r${id++}`, d: "M200,288 L196,375 L204,375 Z", fill: "#fff" });
    // Bushy tail
    const tailSide = rng() > 0.5 ? 1 : -1;
    R.push({ id: `r${id++}`, d: `M${200 + tailSide * 48},268 Q${200 + tailSide * 110},278 ${200 + tailSide * 130},298 Q${200 + tailSide * 105},308 ${200 + tailSide * 60},298 Q${200 + tailSide * 85},288 ${200 + tailSide * 48},268`, fill: "#fff" });
    // Tail tip
    R.push({ id: `r${id++}`, d: `M${200 + tailSide * 118},295 Q${200 + tailSide * 138},298 ${200 + tailSide * 130},308`, fill: "#fff" });
    // Paws
    R.push({ id: `r${id++}`, d: ellipse(190, 375, 10, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(210, 375, 10, 5), fill: "#fff" });
  } else if (t === 6) { // penguin
    // Body
    R.push({ id: `r${id++}`, d: "M155,180 Q155,115 200,100 Q245,115 245,180 Q245,305 200,320 Q155,305 155,180", fill: "#fff" });
    // Belly
    R.push({ id: `r${id++}`, d: "M172,165 Q172,135 200,125 Q228,135 228,165 Q228,290 200,305 Q172,290 172,165", fill: "#fff" });
    // Eyes
    const eyeR = 5 + rng() * 3;
    R.push({ id: `r${id++}`, d: circ(185, 150, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(215, 150, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(185, 150, eyeR * 0.4), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(215, 150, eyeR * 0.4), fill: "#fff" });
    // Beak
    R.push({ id: `r${id++}`, d: "M192,170 L200,185 L208,170 Z", fill: "#fff" });
    // Flippers
    R.push({ id: `r${id++}`, d: "M155,190 Q125,210 128,265 Q140,245 155,228", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M245,190 Q275,210 272,265 Q260,245 245,228", fill: "#fff" });
    // Feet
    R.push({ id: `r${id++}`, d: "M175,318 L158,345 L195,340 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M225,318 L242,345 L205,340 Z", fill: "#fff" });
    // Bow tie
    if (rng() > 0.4) {
      R.push({ id: `r${id++}`, d: "M190,195 L200,202 L210,195 L210,210 L200,203 L190,210 Z", fill: "#fff" });
    }
  } else if (t === 7) { // turtle
    // Shell
    const shellRx = 65 + rng() * 15;
    const shellRy = 50 + rng() * 10;
    R.push({ id: `r${id++}`, d: ellipse(200, 195, shellRx, shellRy), fill: "#fff" });
    // Inner shell
    R.push({ id: `r${id++}`, d: ellipse(200, 195, shellRx * 0.55, shellRy * 0.55), fill: "#fff" });
    // Shell pattern lines
    const patLines = 5 + Math.floor(rng() * 3);
    for (let i = 0; i < patLines; i++) {
      const a = (360 / patLines) * i;
      const [ix, iy] = polarXY(200, 195, shellRx * 0.55, a);
      const [ox, oy] = polarXY(200, 195, shellRx * 0.88, a);
      R.push({ id: `r${id++}`, d: `M${ix},${iy}L${ox},${oy}`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    }
    // Head
    R.push({ id: `r${id++}`, d: "M200,145 Q178,115 182,95 Q200,80 218,95 Q222,115 200,145", fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(192, 98, 3), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(208, 98, 3), fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M196,106 Q200,110 204,106", fill: "none", stroke: "#aaa", strokeWidth: 1 });
    // Legs
    R.push({ id: `r${id++}`, d: `M${200 - shellRx + 10},195 Q${200 - shellRx - 18},210 ${200 - shellRx - 15},228 L${200 - shellRx + 5},218 Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 + shellRx - 10},195 Q${200 + shellRx + 18},210 ${200 + shellRx + 15},228 L${200 + shellRx - 5},218 Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 - shellRx + 15},225 Q${200 - shellRx - 8},245 ${200 - shellRx - 5},258 L${200 - shellRx + 12},248 Z`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M${200 + shellRx - 15},225 Q${200 + shellRx + 8},245 ${200 + shellRx + 5},258 L${200 + shellRx - 12},248 Z`, fill: "#fff" });
    // Tail
    R.push({ id: `r${id++}`, d: "M200,245 Q200,260 196,268", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
  } else if (t === 8) { // dog
    R.push({ id: `r${id++}`, d: "M155,200 Q155,135 200,115 Q245,135 245,200 Q245,265 200,285 Q155,265 155,200", fill: "#fff" });
    // Floppy ears
    const earLen = 70 + rng() * 30;
    R.push({ id: `r${id++}`, d: `M155,165 Q115,160 108,${165 + earLen * 0.6} Q108,${165 + earLen} ${130},${165 + earLen - 5} Q145,${165 + earLen * 0.7} 155,210`, fill: "#fff" });
    R.push({ id: `r${id++}`, d: `M245,165 Q285,160 292,${165 + earLen * 0.6} Q292,${165 + earLen} ${270},${165 + earLen - 5} Q255,${165 + earLen * 0.7} 245,210`, fill: "#fff" });
    // Eyes
    const eyeR = 6 + rng() * 4;
    R.push({ id: `r${id++}`, d: circ(182, 185, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(218, 185, eyeR), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(182, 185, eyeR * 0.4), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(218, 185, eyeR * 0.4), fill: "#fff" });
    // Nose
    R.push({ id: `r${id++}`, d: ellipse(200, 218, 8, 5), fill: "#fff" });
    // Tongue
    R.push({ id: `r${id++}`, d: "M196,228 Q200,252 204,228", fill: "#fff" });
    // Spots
    if (rng() > 0.4) {
      R.push({ id: `r${id++}`, d: circ(170, 170, 15), fill: "#fff" });
    }
    // Body
    R.push({ id: `r${id++}`, d: "M160,285 Q165,365 200,380 Q235,365 240,285", fill: "#fff" });
    // Paws
    R.push({ id: `r${id++}`, d: ellipse(170, 378, 12, 7), fill: "#fff" });
    R.push({ id: `r${id++}`, d: ellipse(230, 378, 12, 7), fill: "#fff" });
    // Tail
    R.push({ id: `r${id++}`, d: "M240,305 Q285,280 295,295 Q280,290 258,312", fill: "#fff" });
    // Collar
    R.push({ id: `r${id++}`, d: `M160,275 Q200,290 240,275 Q200,283 160,275`, fill: "#fff" });
  } else { // hedgehog
    // Body
    R.push({ id: `r${id++}`, d: "M130,225 Q130,175 200,150 Q270,175 270,225 Q270,285 200,305 Q130,285 130,225", fill: "#fff" });
    // Spikes
    const spikeCount = 7 + Math.floor(rng() * 5);
    for (let i = 0; i < spikeCount; i++) {
      const angle = -70 + i * (140 / (spikeCount - 1));
      const [bx1, by1] = polarXY(200, 215, 60, angle - 6);
      const [bx2, by2] = polarXY(200, 215, 60, angle + 6);
      const spikeLen = 82 + rng() * 28;
      const [tx, ty] = polarXY(200, 215, spikeLen, angle);
      R.push({ id: `r${id++}`, d: `M${bx1},${by1}L${tx},${ty}L${bx2},${by2}Z`, fill: "#fff" });
    }
    // Face area
    R.push({ id: `r${id++}`, d: "M165,240 Q200,270 235,240 Q200,260 165,240", fill: "#fff" });
    // Eyes
    R.push({ id: `r${id++}`, d: circ(183, 230, 5), fill: "#fff" });
    R.push({ id: `r${id++}`, d: circ(217, 230, 5), fill: "#fff" });
    // Nose
    R.push({ id: `r${id++}`, d: circ(200, 250, 5), fill: "#fff" });
    // Legs
    R.push({ id: `r${id++}`, d: "M155,295 L150,335 L172,330 L168,295", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M232,295 L228,335 L250,330 L245,295", fill: "#fff" });
  }

  // Ground decoration (common to all)
  R.push({ id: `r${id++}`, d: "M45,382 L355,382", fill: "none", stroke: "#aaa", strokeWidth: 1 });
  const grassCount = 3 + Math.floor(rng() * 5);
  for (let g = 0; g < grassCount; g++) {
    const gx = 55 + rng() * 290;
    const gh = 5 + rng() * 12;
    const gdir = rng() > 0.5 ? 3 : -3;
    R.push({ id: `r${id++}`, d: `M${gx},382 Q${gx + gdir},${382 - gh} ${gx + gdir * 0.5},${382 - gh - 3}`, fill: "none", stroke: "#aaa", strokeWidth: 1 });
  }

  return R;
}
