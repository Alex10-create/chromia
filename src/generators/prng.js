export function polarXY(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export function makeRng(seed) {
  let h = Math.abs(seed * 2654435761 + 1013904223) % 2147483647 || 1;
  return () => { h = (h * 48271) % 2147483647; return (h - 1) / 2147483646; };
}
