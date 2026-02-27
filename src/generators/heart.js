import { makeRng } from './prng';

export function generateHeart(seed) {
  const rng = makeRng(seed * 37 + 23);
  const R = []; let id = 0;
  const t = seed % 4;

  if (t === 0) { // nested
    [1, .72, .46, .26].forEach(s => {
      const w = 76 * s, h = 66 * s, hcy = 196 - 16 * (1 - s);
      R.push({ id: `r${id++}`, d: `M200,${hcy + h} Q${200 - w * 1.5},${hcy + h * .3} ${200 - w},${hcy - h * .3} Q${200 - w * .5},${hcy - h} 200,${hcy - h * .3} Q${200 + w * .5},${hcy - h} ${200 + w},${hcy - h * .3} Q${200 + w * 1.5},${hcy + h * .3} 200,${hcy + h}`, fill: "#fff" });
    });
  } else if (t === 1) { // winged
    R.push({ id: `r${id++}`, d: "M200,265 Q80,225 116,145 Q146,95 200,145 Q254,95 284,145 Q320,225 200,265", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M116,165 Q56,135 36,175 Q26,195 56,205 Q86,195 116,180", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M284,165 Q344,135 364,175 Q374,195 344,205 Q314,195 284,180", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M106,185 Q51,165 31,195 Q46,210 76,205", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M294,185 Q349,165 369,195 Q354,210 324,205", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,145 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", fill: "#fff" });
  } else if (t === 2) { // mosaic
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      const hcx = 86 + c * 72, hcy = 86 + r * 72, s = 20;
      R.push({ id: `r${id++}`, d: `M${hcx},${hcy + s} Q${hcx - s},${hcy + s * .3} ${hcx - s * .7},${hcy - s * .2} Q${hcx - s * .3},${hcy - s * .7} ${hcx},${hcy - s * .2} Q${hcx + s * .3},${hcy - s * .7} ${hcx + s * .7},${hcy - s * .2} Q${hcx + s},${hcy + s * .3} ${hcx},${hcy + s}`, fill: "#fff" });
    }
  } else { // with arrow
    R.push({ id: `r${id++}`, d: "M200,285 Q66,235 106,135 Q141,75 200,135 Q259,75 294,135 Q334,235 200,285", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M76,155 L316,235", fill: "none", stroke: "#aaa", strokeWidth: 2.5 });
    R.push({ id: `r${id++}`, d: "M316,235 L296,220 L306,240 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M76,155 L91,170 L81,150 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,135 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M156,195 Q200,225 244,195 Q200,255 156,195", fill: "#fff" });
  }
  return R;
}
