import { makeRng } from './prng';

export function generateSpace(seed) {
  const rng = makeRng(seed * 31 + 19);
  const R = []; let id = 0;
  const t = seed % 4;

  if (t === 0) { // rocket
    R.push({ id: `r${id++}`, d: "M185,75 Q200,35 215,75 L219,235 L181,235 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,135 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M181,235 L161,285 L181,265 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M219,235 L239,285 L219,265 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M185,265 Q200,325 215,265", fill: "#fff" });
    for (let i = 0; i < 7; i++) R.push({ id: `r${id++}`, d: `M${45 + rng() * 310},${45 + rng() * 145} l3,-3 l3,3 l-3,3 z`, fill: "#fff" });
  } else if (t === 1) { // planet
    R.push({ id: `r${id++}`, d: "M200,200 m-66,0 a66,66 0 1,0 132,0 a66,66 0 1,0 -132,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,200 m-36,0 a36,36 0 1,0 72,0 a36,36 0 1,0 -72,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M86,200 Q200,156 314,200 Q200,211 86,200", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M76,208 Q200,246 324,208 Q200,221 76,208", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M296,96 m-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0", fill: "#fff" });
    for (let i = 0; i < 6; i++) R.push({ id: `r${id++}`, d: `M${36 + rng() * 328},${36 + rng() * 328} l2,-2 l2,2 l-2,2 z`, fill: "#fff" });
  } else if (t === 2) { // moon
    R.push({ id: `r${id++}`, d: "M200,200 m-86,0 a86,86 0 1,0 172,0 a86,86 0 1,0 -172,0", fill: "#fff" });
    for (let i = 0; i < 5; i++) {
      const mcx = 150 + rng() * 100, mcy = 150 + rng() * 100, cr = 6 + rng() * 14;
      R.push({ id: `r${id++}`, d: `M${mcx},${mcy} m-${cr},0 a${cr},${cr} 0 1,0 ${cr * 2},0 a${cr},${cr} 0 1,0 -${cr * 2},0`, fill: "#fff" });
    }
    for (let i = 0; i < 8; i++) R.push({ id: `r${id++}`, d: `M${26 + rng() * 348},${26 + rng() * 348} l2,-2 l2,2 l-2,2 z`, fill: "#fff" });
  } else { // UFO
    R.push({ id: `r${id++}`, d: "M200,175 Q148,175 138,205 Q138,225 200,225 Q262,225 262,205 Q252,175 200,175", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M168,175 Q168,135 200,125 Q232,135 232,175", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,125 m-14,0 a14,11 0 1,0 28,0 a14,11 0 1,0 -28,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M158,225 L146,275", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: "M200,225 L200,285", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: "M242,225 L254,275", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: "M146,275 m-7,0 a7,4 0 1,0 14,0 a7,4 0 1,0 -14,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,285 m-7,0 a7,4 0 1,0 14,0 a7,4 0 1,0 -14,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M254,275 m-7,0 a7,4 0 1,0 14,0 a7,4 0 1,0 -14,0", fill: "#fff" });
    for (let i = 0; i < 5; i++) R.push({ id: `r${id++}`, d: `M${36 + rng() * 328},${36 + rng() * 98} l2,-2 l2,2 l-2,2 z`, fill: "#fff" });
  }
  return R;
}
