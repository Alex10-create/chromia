import { polarXY, makeRng } from './prng';

export function generateSea(seed) {
  const rng = makeRng(seed * 29 + 17);
  const R = []; let id = 0;
  const t = seed % 5;

  if (t === 0) { // shell
    R.push({ id: `r${id++}`, d: "M200,75 Q295,115 315,215 Q295,315 200,355 Q105,315 105,215 Q105,115 200,75", fill: "#fff" });
    for (let i = 1; i <= 5; i++) { const r = i * 23; R.push({ id: `r${id++}`, d: `M200,${215 - r} A${r},${r} 0 0,1 ${200 + r},215`, fill: "none", stroke: "#aaa", strokeWidth: 1.3 }); }
    R.push({ id: `r${id++}`, d: "M200,215 m-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0", fill: "#fff" });
  } else if (t === 1) { // whale
    R.push({ id: `r${id++}`, d: "M75,195 Q75,135 155,115 Q255,95 315,145 Q355,185 335,225 Q295,275 195,275 Q95,265 75,195", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M335,185 Q375,155 385,125 Q390,165 365,195 Q350,190 335,185", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M115,175 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M135,225 Q175,245 225,240", fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    R.push({ id: `r${id++}`, d: "M95,285 Q125,305 165,290 Q205,305 245,285", fill: "none", stroke: "#aaa", strokeWidth: 1.3 });
    R.push({ id: `r${id++}`, d: "M175,125 Q170,85 180,65 Q185,90 180,125", fill: "#fff" });
  } else if (t === 2) { // starfish
    for (let i = 0; i < 5; i++) {
      const a = 72 * i - 90;
      const [ox, oy] = polarXY(200, 200, 95, a);
      const [l1, l1y] = polarXY(200, 200, 32, a - 36);
      const [l2, l2y] = polarXY(200, 200, 32, a + 36);
      R.push({ id: `r${id++}`, d: `M200,200 L${l1},${l1y} Q${(l1 + ox) / 2 - 8},${(l1y + oy) / 2} ${ox},${oy} Q${(l2 + ox) / 2 + 8},${(l2y + oy) / 2} ${l2},${l2y} Z`, fill: "#fff" });
    }
    R.push({ id: `r${id++}`, d: "M200,200 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0", fill: "#fff" });
    for (let i = 0; i < 5; i++) { const a = 72 * i - 90; const [dx, dy] = polarXY(200, 200, 52, a); R.push({ id: `r${id++}`, d: `M${dx},${dy} m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0`, fill: "#fff" }); }
  } else if (t === 3) { // jellyfish
    R.push({ id: `r${id++}`, d: "M128,195 Q128,115 200,95 Q272,115 272,195 L128,195", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M178,165 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M222,165 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0", fill: "#fff" });
    for (let i = 0; i < 5; i++) { const x = 142 + i * 28; R.push({ id: `r${id++}`, d: `M${x},195 Q${x + 8},245 ${x - 4},295 Q${x + 4},335 ${x},355`, fill: "none", stroke: "#aaa", strokeWidth: 2 }); }
  } else { // crab
    R.push({ id: `r${id++}`, d: "M138,205 Q138,165 200,155 Q262,165 262,205 Q262,245 200,255 Q138,245 138,205", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M178,195 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M222,195 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M138,195 Q98,165 78,135", fill: "none", stroke: "#aaa", strokeWidth: 2.5 });
    R.push({ id: `r${id++}`, d: "M262,195 Q302,165 322,135", fill: "none", stroke: "#aaa", strokeWidth: 2.5 });
    R.push({ id: `r${id++}`, d: "M78,135 Q66,115 76,105 Q86,115 78,135", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M322,135 Q334,115 324,105 Q314,115 322,135", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M153,255 L146,295 L166,285 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M247,255 L254,295 L234,285 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M183,255 L178,285 L193,280 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M217,255 L222,285 L207,280 Z", fill: "#fff" });
  }
  return R;
}
