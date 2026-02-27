import { makeRng } from './prng';

export function generateAnimal(seed) {
  const rng = makeRng(seed * 11 + 5);
  const R = []; let id = 0;
  const t = seed % 6;

  if (t === 0) { // cat
    R.push({ id: `r${id++}`, d: "M140,195 Q140,115 200,95 Q260,115 260,195 Q260,255 200,275 Q140,255 140,195", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M145,150 L125,80 L175,130 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M255,150 L275,80 L225,130 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M177,172 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M223,172 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M194,198 Q200,206 206,198", fill: "none", stroke: "#aaa", strokeWidth: 1.5 });
    R.push({ id: `r${id++}`, d: "M155,275 Q168,355 200,370 Q232,355 245,275", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M245,315 Q290,298 315,328 Q288,315 258,328", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M155,315 Q110,298 85,328 Q112,315 142,328", fill: "#fff" });
  } else if (t === 1) { // bunny
    R.push({ id: `r${id++}`, d: "M160,215 Q160,155 200,145 Q240,155 240,215 Q240,275 200,285 Q160,275 160,215", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M177,150 Q172,55 182,45 Q196,55 190,150", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M210,150 Q208,55 218,45 Q230,55 223,150", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M183,198 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M217,198 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M195,233 Q200,241 205,233", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    R.push({ id: `r${id++}`, d: "M160,285 Q163,360 200,375 Q237,360 240,285", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,375 m-14,0 a14,7 0 1,0 28,0 a14,7 0 1,0 -28,0", fill: "#fff" });
  } else if (t === 2) { // owl
    R.push({ id: `r${id++}`, d: "M152,178 Q152,108 200,88 Q248,108 248,178 Q248,298 200,318 Q152,298 152,178", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M176,165 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M224,165 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M176,165 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M224,165 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M196,196 L200,210 L204,196 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M147,196 Q102,214 92,254 Q122,236 150,226", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M253,196 Q298,214 308,254 Q278,236 250,226", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M172,296 Q182,356 200,366 Q218,356 228,296", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M152,108 L142,78 L167,103", fill: "none", stroke: "#aaa", strokeWidth: 2 });
    R.push({ id: `r${id++}`, d: "M248,108 L258,78 L233,103", fill: "none", stroke: "#aaa", strokeWidth: 2 });
  } else if (t === 3) { // fish
    R.push({ id: `r${id++}`, d: "M82,200 Q200,102 318,200 Q200,298 82,200", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M308,200 L365,150 L365,250 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M138,188 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M178,160 Q218,154 256,168", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    R.push({ id: `r${id++}`, d: "M178,200 Q218,196 256,200", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    R.push({ id: `r${id++}`, d: "M178,240 Q218,236 256,232", fill: "none", stroke: "#aaa", strokeWidth: 1.2 });
    R.push({ id: `r${id++}`, d: "M200,154 Q210,100 226,90 Q214,118 210,158", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,246 Q210,300 196,318 Q200,290 196,252", fill: "#fff" });
  } else if (t === 4) { // bear
    R.push({ id: `r${id++}`, d: "M152,208 Q152,138 200,118 Q248,138 248,208 Q248,278 200,298 Q152,278 152,208", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M157,143 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M243,143 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M181,193 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M219,193 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,213 m-12,0 a12,7 0 1,0 24,0 a12,7 0 1,0 -24,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M152,298 Q157,375 200,390 Q243,375 248,298", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M152,336 Q114,346 104,366 L152,366 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M248,336 Q286,346 296,366 L248,366 Z", fill: "#fff" });
  } else { // fox
    R.push({ id: `r${id++}`, d: "M157,208 Q157,148 200,128 Q243,148 243,208 Q243,268 200,288 Q157,268 157,208", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M157,163 L122,68 L187,143 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M243,163 L278,68 L213,143 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M181,193 m-5,0 a5,4 0 1,0 10,0 a5,4 0 1,0 -10,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M219,193 m-5,0 a5,4 0 1,0 10,0 a5,4 0 1,0 -10,0", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M191,223 Q200,233 209,223 L200,243 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M172,228 Q157,258 200,288 Q243,258 228,228 Q200,268 172,228", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M200,288 L196,375 L204,375 Z", fill: "#fff" });
    R.push({ id: `r${id++}`, d: "M248,268 Q305,288 325,308 Q288,298 255,283", fill: "#fff" });
  }
  return R;
}
