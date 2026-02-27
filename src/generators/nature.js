import { polarXY, makeRng } from './prng';

export function generateNature(seed) {
  const rng = makeRng(seed * 19 + 9);
  const R = []; let id = 0;
  const t = seed % 5;

  if (t === 0) { // pine tree
    R.push({ id: `r${id++}`, d: "M191,378 L209,378 L207,235 L193,235 Z", fill: "#fff" });
    for (let i = 0; i < 4; i++) { const y = 232 - i * 42, w = 82 - i * 14; R.push({ id: `r${id++}`, d: `M200,${y - 52} L${200 - w},${y + 15} L${200 + w},${y + 15} Z`, fill: "#fff" }); }
  } else if (t === 1) { // mountain
    R.push({ id: `r${id++}`, d: "M32,345 L155,95 L195,155 L255,75 L375,345 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M255,75 L235,125 L195,155 L255,125 L285,135 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M45,345 Q115,325 195,345 Q275,365 365,345 L365,385 L45,385 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M275,55 m-18,0 a18,11 0 1,0 36,0 a18,11 0 1,0 -36,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M295,50 m-14,0 a14,9 0 1,0 28,0 a14,9 0 1,0 -28,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M65,50 m-22,0 a22,11 0 1,0 44,0 a22,11 0 1,0 -44,0", fill: "#fff" });
  } else if (t === 2) { // sun + hills
    R.push({ id: `r${id++}`, d: "M95,55 m-32,0 a32,32 0 1,0 64,0 a32,32 0 1,0 -64,0", fill: "#fff" });
    for (let i = 0; i < 8; i++) {
      const a = i * 45;
      const [x1, y1] = polarXY(95, 55, 38, a);
      const [x2, y2] = polarXY(95, 55, 54, a);
      R.push({ id: `r${id++}`, d: `M${x1},${y1} L${x2},${y2}`, fill: "none", stroke: "#aaa", strokeWidth: 2 });
    }
    R.push({ id: `r${id++}`, d: "M0,295 Q95,195 195,275 Q295,195 400,295 L400,400 L0,400 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M0,335 Q75,275 175,325 Q275,255 400,335 L400,400 L0,400 Z", fill: "#fff" });
  } else if (t === 3) { // mushroom
    R.push({ id: `r${id++}`, d: "M200,165 Q118,165 98,225 Q98,255 200,255 Q302,255 302,225 Q282,165 200,165", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M178,255 L176,365 L224,365 L222,255", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M158,195 m-12,0 a12,10 0 1,0 24,0 a12,10 0 1,0 -24,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M222,205 m-10,0 a10,8 0 1,0 20,0 a10,8 0 1,0 -20,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M193,225 m-8,0 a8,6 0 1,0 16,0 a8,6 0 1,0 -16,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M248,235 m-7,0 a7,5 0 1,0 14,0 a7,5 0 1,0 -14,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M136,235 m-7,0 a7,5 0 1,0 14,0 a7,5 0 1,0 -14,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M125,365 Q145,345 165,360 Q150,350 125,365", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M245,370 Q265,355 275,365 Q262,357 245,370", fill: "#fff" });
  } else { // round tree
    R.push({ id: `r${id++}`, d: "M192,378 L208,378 L206,248 L194,248 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,120 m-75,0 a75,65 0 1,0 150,0 a75,65 0 1,0 -150,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,120 m-45,0 a45,38 0 1,0 90,0 a45,38 0 1,0 -90,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M150,185 Q120,195 115,178 Q125,188 150,185", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M250,185 Q280,195 285,178 Q275,188 250,185", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M180,295 Q145,275 125,298 Q150,285 175,298", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M220,295 Q255,275 275,298 Q250,285 225,298", fill: "#fff" });
  }
  return R;
}
