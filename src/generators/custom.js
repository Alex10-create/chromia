// Кастомные SVG-шаблоны для раздела "Тест"
// Сгенерированы по загруженным PNG/JPG картинкам мандал/цветов

import { polarXY } from './prng';

const CX = 200, CY = 200;
const $ = v => Math.round(v * 10) / 10;
const circ = (x, y, r) => `M${x},${y}m-${r},0a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;

// Каплевидный лепесток: от iR до oR, угол a, полуширина hw
function drop(iR, oR, a, hw) {
  const [tx, ty] = polarXY(CX, CY, oR, a);
  const [b1x, b1y] = polarXY(CX, CY, iR, a - hw);
  const [b2x, b2y] = polarXY(CX, CY, iR, a + hw);
  const cR = iR + (oR - iR) * 0.65;
  const [c1x, c1y] = polarXY(CX, CY, cR, a - hw * 0.7);
  const [c2x, c2y] = polarXY(CX, CY, cR, a + hw * 0.7);
  return `M${$(b1x)},${$(b1y)} Q${$(c1x)},${$(c1y)} ${$(tx)},${$(ty)} Q${$(c2x)},${$(c2y)} ${$(b2x)},${$(b2y)} Z`;
}

// Листовидный ромб: от iR до oR, широкий в середине
function leaf(iR, oR, a, hw) {
  const [ix, iy] = polarXY(CX, CY, iR, a);
  const [ox, oy] = polarXY(CX, CY, oR, a);
  const mR = (iR + oR) / 2;
  const [s1x, s1y] = polarXY(CX, CY, mR, a - hw);
  const [s2x, s2y] = polarXY(CX, CY, mR, a + hw);
  return `M${$(ix)},${$(iy)} Q${$(s1x)},${$(s1y)} ${$(ox)},${$(oy)} Q${$(s2x)},${$(s2y)} ${$(ix)},${$(iy)} Z`;
}

// Прожилка/линия (только обводка)
function vein(iR, oR, a) {
  const [ix, iy] = polarXY(CX, CY, iR, a);
  const [ox, oy] = polarXY(CX, CY, oR, a);
  return `M${$(ix)},${$(iy)} L${$(ox)},${$(oy)}`;
}

// Сердце по центру (cx, cy) размером s
function heartPath(x, y, s) {
  return `M${$(x)},${$(y - s * 0.2)} ` +
    `C${$(x)},${$(y - s * 0.55)} ${$(x - s * 0.5)},${$(y - s * 0.55)} ${$(x - s * 0.5)},${$(y - s * 0.15)} ` +
    `C${$(x - s * 0.5)},${$(y + s * 0.2)} ${$(x)},${$(y + s * 0.45)} ${$(x)},${$(y + s * 0.6)} ` +
    `C${$(x)},${$(y + s * 0.45)} ${$(x + s * 0.5)},${$(y + s * 0.2)} ${$(x + s * 0.5)},${$(y - s * 0.15)} ` +
    `C${$(x + s * 0.5)},${$(y - s * 0.55)} ${$(x)},${$(y - s * 0.55)} ${$(x)},${$(y - s * 0.2)} Z`;
}

// Ромб (прямые линии) — для геометрической мандалы
function diamond(iR, oR, a, hw) {
  const [tx, ty] = polarXY(CX, CY, oR, a);
  const [bx, by] = polarXY(CX, CY, iR, a);
  const mR = (iR + oR) / 2;
  const [lx, ly] = polarXY(CX, CY, mR, a - hw);
  const [rx, ry] = polarXY(CX, CY, mR, a + hw);
  return `M${$(tx)},${$(ty)} L${$(lx)},${$(ly)} L${$(bx)},${$(by)} L${$(rx)},${$(ry)} Z`;
}

// Широкий округлый лепесток (для плавных цветов)
function roundPetal(iR, oR, a, hw) {
  const [tx, ty] = polarXY(CX, CY, oR, a);
  const [b1x, b1y] = polarXY(CX, CY, iR, a - hw * 0.5);
  const [b2x, b2y] = polarXY(CX, CY, iR, a + hw * 0.5);
  const cR = iR + (oR - iR) * 0.5;
  const [c1x, c1y] = polarXY(CX, CY, cR, a - hw);
  const [c2x, c2y] = polarXY(CX, CY, cR, a + hw);
  const tR = iR + (oR - iR) * 0.85;
  const [t1x, t1y] = polarXY(CX, CY, tR, a - hw * 0.65);
  const [t2x, t2y] = polarXY(CX, CY, tR, a + hw * 0.65);
  return `M${$(b1x)},${$(b1y)} Q${$(c1x)},${$(c1y)} ${$(t1x)},${$(t1y)} Q${$(tx)},${$(ty)} ${$(t2x)},${$(t2y)} Q${$(c2x)},${$(c2y)} ${$(b2x)},${$(b2y)} Z`;
}

// ===== #0: Простой 8-лепестковый цветок =====
function makeImage0() {
  const P = []; let id = 0;
  const N = 8;

  // Внешние большие заострённые лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(85, 178, a, 19), fill: '#fff' });
  }

  // Маленькие акцентные листики между внешними лепестками
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: leaf(125, 162, a, 8), fill: '#fff' });
  }

  // Средние лепестки (смещены на 22.5°)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(40, 110, a, 18), fill: '#fff' });
  }

  // Внутренние маленькие лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(16, 50, a, 16), fill: '#fff' });
  }

  // Центр
  P.push({ id: `r${id++}`, d: circ(CX, CY, 13), fill: '#fff' });

  return P;
}

// ===== #1: Сложная детализированная мандала =====
function makeImage1() {
  const P = []; let id = 0;
  const N = 8;

  // Самые внешние заострённые лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(130, 188, a, 18), fill: '#fff' });
  }

  // Акценты между внешними
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: leaf(152, 180, a, 7), fill: '#fff' });
  }

  // Четвёртый слой: большие шевронные лепестки (смещены)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(82, 145, a, 17), fill: '#fff' });
  }

  // Детали внутри четвёртого слоя
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: leaf(92, 132, a, 8), fill: '#fff' });
  }

  // Третий слой: средние лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(50, 100, a, 16), fill: '#fff' });
  }

  // Прожилки в среднем слое
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: vein(54, 92, a - 5), fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
    P.push({ id: `r${id++}`, d: vein(54, 92, a + 5), fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  }

  // Второй слой: маленькие листики (смещены)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: leaf(28, 58, a, 13), fill: '#fff' });
  }

  // Внутренние крошечные лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(13, 34, a, 12), fill: '#fff' });
  }

  // Точки-акценты в среднем слое
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [dx, dy] = polarXY(CX, CY, 70, a);
    P.push({ id: `r${id++}`, d: circ($(dx), $(dy), 3), fill: '#fff' });
  }

  // Центр
  P.push({ id: `r${id++}`, d: circ(CX, CY, 10), fill: '#fff' });

  return P;
}

// ===== #2: Декоративный цветок с точками =====
function makeImage2() {
  const P = []; let id = 0;
  const N = 8;

  // Внешние крупные лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(90, 170, a, 18), fill: '#fff' });
  }

  // Акцентные листики
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: leaf(118, 158, a, 8), fill: '#fff' });
  }

  // Средние лепестки (смещены)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(44, 108, a, 17), fill: '#fff' });
  }

  // Внутренние лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(16, 54, a, 16), fill: '#fff' });
  }

  // Центр
  P.push({ id: `r${id++}`, d: circ(CX, CY, 13), fill: '#fff' });

  // Большие точки между внешними лепестками
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [dx, dy] = polarXY(CX, CY, 178, a);
    P.push({ id: `r${id++}`, d: circ($(dx), $(dy), 5), fill: '#fff' });
  }

  // Малые точки вдоль внешнего края (по 2 на секцию)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    const [d1x, d1y] = polarXY(CX, CY, 185, a + 10);
    P.push({ id: `r${id++}`, d: circ($(d1x), $(d1y), 3), fill: '#fff' });
    const [d2x, d2y] = polarXY(CX, CY, 185, a - 10);
    P.push({ id: `r${id++}`, d: circ($(d2x), $(d2y), 3), fill: '#fff' });
  }

  // Совсем маленькие точки (декор)
  for (let i = 0; i < 16; i++) {
    const a = (360 / 16) * i + 11.25;
    const [dx, dy] = polarXY(CX, CY, 192, a);
    P.push({ id: `r${id++}`, d: circ($(dx), $(dy), 2), fill: '#fff' });
  }

  // Прожилки-бусинки между слоями
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [bx, by] = polarXY(CX, CY, 82, a);
    P.push({ id: `r${id++}`, d: circ($(bx), $(by), 3.5), fill: '#fff' });
  }

  return P;
}

// ===== #3: Плотная хризантема (много листьев) =====
function makeImage3() {
  const P = []; let id = 0;

  // Кольцо 5 (самое внешнее): 24 листа
  for (let i = 0; i < 24; i++) {
    const a = (360 / 24) * i + 2;
    P.push({ id: `r${id++}`, d: leaf(132, 192, a, 6.5), fill: '#fff' });
  }

  // Кольцо 4: 20 листьев
  for (let i = 0; i < 20; i++) {
    const a = (360 / 20) * i + 5;
    P.push({ id: `r${id++}`, d: leaf(98, 168, a, 7.5), fill: '#fff' });
  }

  // Кольцо 3: 16 листьев
  for (let i = 0; i < 16; i++) {
    const a = (360 / 16) * i + 8;
    P.push({ id: `r${id++}`, d: leaf(62, 135, a, 9), fill: '#fff' });
  }

  // Кольцо 2: 12 листьев
  for (let i = 0; i < 12; i++) {
    const a = (360 / 12) * i + 12;
    P.push({ id: `r${id++}`, d: leaf(32, 95, a, 11), fill: '#fff' });
  }

  // Кольцо 1 (внутреннее): 8 листьев
  for (let i = 0; i < 8; i++) {
    const a = (360 / 8) * i;
    P.push({ id: `r${id++}`, d: leaf(8, 58, a, 14), fill: '#fff' });
  }

  return P;
}

// ===== #4: Цветок с листовыми прожилками =====
function makeImage4() {
  const P = []; let id = 0;
  const N = 8;

  // Внешние крупные лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(84, 175, a, 18), fill: '#fff' });
  }

  // Прожилки внешних лепестков (центральная + боковые)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: vein(88, 168, a), fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
    P.push({ id: `r${id++}`, d: vein(98, 152, a - 6), fill: 'none', stroke: '#fff', strokeWidth: 1 });
    P.push({ id: `r${id++}`, d: vein(98, 152, a + 6), fill: 'none', stroke: '#fff', strokeWidth: 1 });
  }

  // Акцентные листочки на кончиках лепестков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: leaf(148, 172, a, 5), fill: '#fff' });
  }

  // Маленькие акценты между внешними лепестками
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: leaf(120, 158, a, 7), fill: '#fff' });
  }

  // Средние лепестки (смещены)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(40, 102, a, 17), fill: '#fff' });
  }

  // Прожилки средних лепестков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: vein(44, 95, a), fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  }

  // Центральный цветок: 6 круглых лепестков
  for (let i = 0; i < 6; i++) {
    const a = (360 / 6) * i;
    const [px, py] = polarXY(CX, CY, 26, a);
    P.push({ id: `r${id++}`, d: circ($(px), $(py), 13), fill: '#fff' });
  }

  // Центральная точка
  P.push({ id: `r${id++}`, d: circ(CX, CY, 10), fill: '#fff' });

  return P;
}

// ===== #5: Мандала с точечными цепочками и штриховкой =====
function makeImage5() {
  const P = []; let id = 0;
  const N = 8;

  // Внешние заострённые лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(88, 175, a, 18), fill: '#fff' });
  }

  // Прожилки внешних лепестков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: vein(92, 168, a), fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
    P.push({ id: `r${id++}`, d: vein(100, 155, a - 6), fill: 'none', stroke: '#fff', strokeWidth: 1 });
    P.push({ id: `r${id++}`, d: vein(100, 155, a + 6), fill: 'none', stroke: '#fff', strokeWidth: 1 });
  }

  // Средний слой лепестков (смещён)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(52, 115, a, 16), fill: '#fff' });
  }

  // Листочки-акценты между средними
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: leaf(78, 108, a, 6), fill: '#fff' });
  }

  // Внутренние лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(18, 58, a, 14), fill: '#fff' });
  }

  // Центр
  P.push({ id: `r${id++}`, d: circ(CX, CY, 14), fill: '#fff' });

  // Точечные цепочки между внешними лепестками (3 точки, убывающие)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [d1x, d1y] = polarXY(CX, CY, 180, a);
    P.push({ id: `r${id++}`, d: circ($(d1x), $(d1y), 4.5), fill: '#fff' });
    const [d2x, d2y] = polarXY(CX, CY, 190, a);
    P.push({ id: `r${id++}`, d: circ($(d2x), $(d2y), 3), fill: '#fff' });
    const [d3x, d3y] = polarXY(CX, CY, 197, a);
    P.push({ id: `r${id++}`, d: circ($(d3x), $(d3y), 2), fill: '#fff' });
  }

  // Лучи-линии от кончиков лепестков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: vein(176, 195, a), fill: 'none', stroke: '#fff', strokeWidth: 1.2 });
  }

  // Точки-акценты у основания лепестков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [dx, dy] = polarXY(CX, CY, 55, a);
    P.push({ id: `r${id++}`, d: circ($(dx), $(dy), 3), fill: '#fff' });
  }

  return P;
}

// ===== #6: Мандала с сердцем в круглой рамке =====
function makeImage6() {
  const P = []; let id = 0;
  const N = 8;

  // Внешняя круглая рамка (кольцо)
  P.push({ id: `r${id++}`, d: circ(CX, CY, 195), fill: 'none', stroke: '#fff', strokeWidth: 3 });
  P.push({ id: `r${id++}`, d: circ(CX, CY, 188), fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Внешний слой: крупные цветочные лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: roundPetal(85, 178, a, 20), fill: '#fff' });
  }

  // Маленькие цветочки между внешними лепестками
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [fx, fy] = polarXY(CX, CY, 155, a);
    // Лепесточки маленького цветка (по 4)
    for (let j = 0; j < 4; j++) {
      const fa = (360 / 4) * j;
      const [px, py] = polarXY($(fx), $(fy), 10, fa);
      P.push({ id: `r${id++}`, d: circ($(px), $(py), 5), fill: '#fff' });
    }
    // Центр маленького цветка
    P.push({ id: `r${id++}`, d: circ($(fx), $(fy), 3.5), fill: '#fff' });
  }

  // Средний слой: лепестки (смещены)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(48, 108, a, 16), fill: '#fff' });
  }

  // Листочки-акценты
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: leaf(65, 95, a, 7), fill: '#fff' });
  }

  // Внутренние лепестки вокруг сердца
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(28, 62, a, 14), fill: '#fff' });
  }

  // Точки-акценты
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [dx, dy] = polarXY(CX, CY, 180, a);
    P.push({ id: `r${id++}`, d: circ($(dx), $(dy), 3), fill: '#fff' });
  }

  // Сердце в центре
  P.push({ id: `r${id++}`, d: heartPath(CX, CY, 42), fill: '#fff' });

  return P;
}

// ===== #7: Геометрическая мандала (витражный стиль) =====
function makeImage7() {
  const P = []; let id = 0;
  const N = 8;

  // Большие круги по внешнему краю
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    const [cx, cy] = polarXY(CX, CY, 145, a);
    P.push({ id: `r${id++}`, d: circ($(cx), $(cy), 45), fill: '#fff' });
  }

  // Ромбы между кругами
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: diamond(105, 175, a, 14), fill: '#fff' });
  }

  // Средние каплевидные лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(42, 120, a, 15), fill: '#fff' });
  }

  // Овальные формы между средними лепестками
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    const [ox, oy] = polarXY(CX, CY, 78, a);
    P.push({ id: `r${id++}`, d: circ($(ox), $(oy), 18), fill: '#fff' });
  }

  // Маленькие ромбики внутри средних лепестков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: diamond(55, 100, a, 7), fill: '#fff' });
  }

  // Лучи от центра (тонкие линии)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: vein(22, 115, a), fill: 'none', stroke: '#fff', strokeWidth: 1.2 });
  }
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: vein(22, 100, a), fill: 'none', stroke: '#fff', strokeWidth: 1 });
  }

  // Внутренние каплевидные лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(18, 52, a, 12), fill: '#fff' });
  }

  // Центральный круг
  P.push({ id: `r${id++}`, d: circ(CX, CY, 16), fill: '#fff' });

  return P;
}

// ===== #8: Плавный 12-лепестковый цветок =====
function makeImage8() {
  const P = []; let id = 0;
  const N = 12;

  // Внешние крупные округлые лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: roundPetal(72, 185, a, 16), fill: '#fff' });
  }

  // Загнутые кончики лепестков (декоративная деталь)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 8;
    const [cx, cy] = polarXY(CX, CY, 165, a);
    P.push({ id: `r${id++}`, d: circ($(cx), $(cy), 12), fill: '#fff' });
  }

  // Средний слой: лепестки с прожилками (смещены на пол-шага)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 15;
    P.push({ id: `r${id++}`, d: drop(38, 118, a, 12), fill: '#fff' });
  }

  // Прожилки средних лепестков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 15;
    P.push({ id: `r${id++}`, d: vein(42, 110, a), fill: 'none', stroke: '#fff', strokeWidth: 1.2 });
  }

  // Внутренние листочки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: leaf(16, 48, a, 10), fill: '#fff' });
  }

  // Прожилки внутренних листочков
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: vein(18, 44, a), fill: 'none', stroke: '#fff', strokeWidth: 1 });
  }

  // Центр
  P.push({ id: `r${id++}`, d: circ(CX, CY, 12), fill: '#fff' });

  return P;
}

// ===== #9: Морской дракон с кораблём =====
function makeImage9() {
  const P = []; let id = 0;

  // Облака (3 штуки)
  P.push({ id: `r${id++}`, d: 'M20,30 Q40,5 70,20 Q90,0 115,18 Q135,5 145,30 Q135,50 110,48 Q80,55 50,48 Q25,52 20,30 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M280,15 Q300,0 320,12 Q340,-5 360,15 Q375,10 370,35 Q365,50 340,45 Q310,52 290,42 Q270,48 280,15 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M150,55 Q170,38 190,50 Q205,35 220,52 Q230,42 225,65 Q210,72 185,68 Q160,72 150,55 Z', fill: '#fff' });

  // Голова дракона
  P.push({ id: `r${id++}`, d: 'M230,80 Q260,60 290,75 Q310,85 305,110 Q310,130 290,145 Q265,155 240,140 Q220,125 220,105 Q218,88 230,80 Z', fill: '#fff' });
  // Глаз дракона
  P.push({ id: `r${id++}`, d: circ(268, 105, 10), fill: '#fff' });
  // Рог / гребень
  P.push({ id: `r${id++}`, d: 'M255,78 L265,45 L275,50 L280,72 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M275,72 L282,42 L290,48 L288,75 Z', fill: '#fff' });
  // Пасть
  P.push({ id: `r${id++}`, d: 'M295,120 Q315,115 320,128 Q315,140 295,138 Z', fill: '#fff' });

  // Шея дракона
  P.push({ id: `r${id++}`, d: 'M235,145 Q220,180 225,220 Q228,240 250,250 L260,240 Q245,225 240,200 Q238,175 250,145 Z', fill: '#fff' });

  // Тело дракона (чешуйчатое, упрощённо)
  P.push({ id: `r${id++}`, d: 'M225,220 Q200,260 210,310 Q230,350 270,340 Q300,330 310,290 Q315,260 290,235 Q265,218 225,220 Z', fill: '#fff' });

  // Чешуя (ряды полукругов)
  for (let row = 0; row < 4; row++) {
    const y = 245 + row * 25;
    for (let col = 0; col < 3; col++) {
      const x = 235 + col * 25 + (row % 2 ? 12 : 0);
      P.push({ id: `r${id++}`, d: `M${x-10},${y} Q${x},${y-12} ${x+10},${y}`, fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
    }
  }

  // Хвост дракона (свёрнутый)
  P.push({ id: `r${id++}`, d: 'M260,340 Q280,370 320,380 Q350,375 360,350 Q365,330 345,325 Q330,330 325,350 Z', fill: '#fff' });

  // Корабль — корпус
  P.push({ id: `r${id++}`, d: 'M50,200 L170,200 L155,240 L35,240 Z', fill: '#fff' });
  // Палуба
  P.push({ id: `r${id++}`, d: 'M55,195 L165,195 L170,200 L50,200 Z', fill: '#fff' });
  // Мачта
  P.push({ id: `r${id++}`, d: 'M108,100 L112,100 L112,195 L108,195 Z', fill: '#fff' });
  // Парус большой
  P.push({ id: `r${id++}`, d: 'M112,105 L160,140 L112,175 Z', fill: '#fff' });
  // Парус малый
  P.push({ id: `r${id++}`, d: 'M108,110 L70,140 L108,170 Z', fill: '#fff' });

  // Волны (отдельные волнистые полосы)
  P.push({ id: `r${id++}`, d: 'M0,250 Q30,232 60,250 Q90,268 120,250 Q150,232 180,250 Q180,262 150,262 Q120,280 90,262 Q60,244 30,262 Q0,268 0,250 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M200,250 Q230,232 260,250 Q290,268 320,250 Q350,232 380,250 Q380,262 350,262 Q320,280 290,262 Q260,244 230,262 Q200,268 200,250 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M0,290 Q40,272 80,290 Q120,308 160,290 Q200,272 240,290 Q240,302 200,302 Q160,320 120,302 Q80,284 40,302 Q0,310 0,290 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M180,320 Q220,302 260,320 Q300,338 340,320 Q380,302 400,320 Q400,332 380,332 Q340,350 300,332 Q260,314 220,332 Q180,340 180,320 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M0,355 Q50,338 100,355 Q150,372 200,355 Q250,338 300,355 Q300,367 250,367 Q200,385 150,367 Q100,350 50,367 Q0,375 0,355 Z', fill: '#fff' });

  // Завитки волн (декор)
  P.push({ id: `r${id++}`, d: 'M35,260 Q25,250 35,245 Q45,250 38,260', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M320,260 Q310,250 320,245 Q330,250 323,260', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M170,305 Q160,295 170,290 Q180,295 173,305', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  return P;
}

// ===== #10: Крылатый единорог (пони) =====
function makeImage10() {
  const P = []; let id = 0;

  // Тело
  P.push({ id: `r${id++}`, d: 'M140,200 Q130,170 150,150 Q175,135 210,140 Q250,145 265,170 Q280,200 270,235 Q260,265 235,280 Q200,290 170,280 Q145,265 140,240 Q138,220 140,200 Z', fill: '#fff' });

  // Голова
  P.push({ id: `r${id++}`, d: 'M210,90 Q240,75 270,85 Q295,100 290,130 Q285,155 260,165 Q235,175 215,160 Q195,150 195,125 Q195,100 210,90 Z', fill: '#fff' });

  // Мордочка
  P.push({ id: `r${id++}`, d: 'M275,115 Q295,112 300,125 Q298,140 280,140 Q268,138 270,125 Z', fill: '#fff' });

  // Глаз большой
  P.push({ id: `r${id++}`, d: 'M245,105 Q255,92 265,105 Q258,118 248,115 Q242,112 245,105 Z', fill: '#fff' });

  // Ушко левое
  P.push({ id: `r${id++}`, d: 'M215,88 Q210,65 225,60 Q235,65 230,85 Z', fill: '#fff' });
  // Ушко правое
  P.push({ id: `r${id++}`, d: 'M250,82 Q255,58 270,58 Q278,65 265,82 Z', fill: '#fff' });

  // Рог
  P.push({ id: `r${id++}`, d: 'M238,72 L245,28 L252,72 Z', fill: '#fff' });
  // Полоски рога
  P.push({ id: `r${id++}`, d: 'M241,60 L249,60', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M242,50 L248,50', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M243,40 L247,40', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Грива (3 пряди)
  P.push({ id: `r${id++}`, d: 'M205,85 Q185,100 180,130 Q175,155 185,165 Q195,155 195,130 Q196,105 210,92 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M200,95 Q175,115 168,145 Q162,170 172,180 Q185,170 182,145 Q183,118 205,100 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M195,105 Q165,130 160,160 Q155,185 165,192 Q178,182 175,158 Q178,132 200,112 Z', fill: '#fff' });

  // Крыло (5 перьев)
  P.push({ id: `r${id++}`, d: 'M160,165 Q130,140 110,155 Q120,170 145,168 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M155,175 Q118,155 95,170 Q108,188 140,180 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M152,185 Q110,170 88,188 Q102,205 138,192 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M150,195 Q115,185 98,200 Q112,215 140,205 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M152,205 Q125,200 115,212 Q128,222 148,215 Z', fill: '#fff' });

  // Ноги (4 штуки)
  P.push({ id: `r${id++}`, d: 'M170,275 Q165,310 168,340 Q172,355 185,355 Q190,345 185,310 Q182,280 178,275 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M195,280 Q192,315 195,345 Q200,358 212,355 Q215,345 210,315 Q207,285 202,280 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M228,275 Q230,310 232,340 Q236,355 248,352 Q250,342 245,310 Q242,280 238,275 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M250,265 Q258,300 262,335 Q265,350 275,348 Q278,338 272,305 Q268,275 260,265 Z', fill: '#fff' });

  // Копытца
  P.push({ id: `r${id++}`, d: circ(177, 355, 8), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(204, 358, 8), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(240, 354, 8), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(270, 350, 8), fill: '#fff' });

  // Хвост (пышный)
  P.push({ id: `r${id++}`, d: 'M135,230 Q110,250 95,280 Q85,310 100,330 Q115,310 115,280 Q118,255 140,238 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M130,240 Q100,265 88,295 Q80,325 95,340 Q110,320 108,290 Q112,268 135,248 Z', fill: '#fff' });

  return P;
}

// ===== #11: Милый пенёк-персонаж =====
function makeImage11() {
  const P = []; let id = 0;

  // Крона-листва (пышная шапка)
  P.push({ id: `r${id++}`, d: 'M95,95 Q80,70 100,55 Q120,40 145,50 Q160,35 185,45 Q205,35 220,50 Q245,40 260,55 Q280,45 295,65 Q310,80 300,100 Q310,115 290,120 L110,120 Q85,115 95,95 Z', fill: '#fff' });

  // Листочки сверху (3 штуки)
  P.push({ id: `r${id++}`, d: 'M155,52 Q160,30 170,38 Q168,50 160,55 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M200,42 Q210,22 218,32 Q215,48 208,50 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M240,55 Q248,35 255,42 Q252,58 246,60 Z', fill: '#fff' });

  // Ствол (основное тело)
  P.push({ id: `r${id++}`, d: 'M130,120 Q125,140 128,200 Q130,260 140,300 Q155,320 200,325 Q245,320 260,300 Q270,260 272,200 Q275,140 270,120 Z', fill: '#fff' });

  // Текстура коры (вертикальные линии)
  P.push({ id: `r${id++}`, d: 'M170,130 Q168,200 172,290', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M200,125 Q198,200 202,300', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M230,130 Q232,200 228,290', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Глаза (большие, милые)
  P.push({ id: `r${id++}`, d: circ(172, 215, 18), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(228, 215, 18), fill: '#fff' });
  // Зрачки
  P.push({ id: `r${id++}`, d: circ(172, 215, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(228, 215, 10), fill: '#fff' });
  // Блики
  P.push({ id: `r${id++}`, d: circ(178, 210, 4), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(234, 210, 4), fill: '#fff' });

  // Улыбка
  P.push({ id: `r${id++}`, d: 'M185,248 Q200,262 215,248', fill: 'none', stroke: '#fff', strokeWidth: 2 });

  // Ветки-руки
  // Левая рука
  P.push({ id: `r${id++}`, d: 'M130,180 Q105,175 85,190 Q75,200 80,215 L90,210 Q88,198 98,192 Q115,182 132,185 Z', fill: '#fff' });
  // Ладошка левая
  P.push({ id: `r${id++}`, d: 'M75,200 Q60,195 55,208 Q60,220 75,215 Z', fill: '#fff' });

  // Правая рука
  P.push({ id: `r${id++}`, d: 'M270,180 Q295,175 315,190 Q325,200 320,215 L310,210 Q312,198 302,192 Q285,182 268,185 Z', fill: '#fff' });
  // Ладошка правая
  P.push({ id: `r${id++}`, d: 'M325,200 Q340,195 345,208 Q340,220 325,215 Z', fill: '#fff' });

  // Корни-ноги (5 корней)
  P.push({ id: `r${id++}`, d: 'M145,310 Q130,340 110,355 Q100,360 95,370 L115,370 Q120,358 135,345 Q150,330 155,315 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M165,320 Q155,350 145,370 L165,375 Q170,355 175,325 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M195,325 Q198,355 200,380 L215,378 Q210,350 205,325 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M235,320 Q245,350 255,370 L238,375 Q230,355 225,325 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M255,310 Q270,340 290,355 Q300,360 305,370 L285,370 Q280,358 265,345 Q250,330 245,315 Z', fill: '#fff' });

  return P;
}

// ===== #12: Единорог в свитере с сердечками =====
function makeImage12() {
  const P = []; let id = 0;

  // Свитер / тело
  P.push({ id: `r${id++}`, d: 'M120,195 Q115,170 130,155 Q155,140 200,138 Q245,140 270,155 Q285,170 280,195 Q285,260 275,310 Q260,335 200,340 Q140,335 125,310 Q115,260 120,195 Z', fill: '#fff' });

  // Полоски свитера (верх)
  P.push({ id: `r${id++}`, d: 'M132,160 Q165,148 200,146 Q235,148 268,160 L270,170 Q235,158 200,156 Q165,158 130,170 Z', fill: '#fff' });
  // Полоски свитера (низ)
  P.push({ id: `r${id++}`, d: 'M128,305 Q160,320 200,322 Q240,320 272,305 L275,318 Q240,332 200,335 Q160,332 125,318 Z', fill: '#fff' });

  // Сердечки на свитере (5 штук)
  P.push({ id: `r${id++}`, d: heartPath(170, 210, 18), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(230, 210, 18), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(200, 255, 22), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(155, 270, 15), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(245, 270, 15), fill: '#fff' });

  // Голова
  P.push({ id: `r${id++}`, d: 'M150,70 Q148,40 170,25 Q200,15 230,25 Q252,40 250,70 Q252,100 240,120 Q220,138 200,140 Q180,138 160,120 Q148,100 150,70 Z', fill: '#fff' });

  // Ушки
  P.push({ id: `r${id++}`, d: 'M158,55 Q145,30 155,20 Q165,18 168,40 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M242,55 Q255,30 245,20 Q235,18 232,40 Z', fill: '#fff' });

  // Рог
  P.push({ id: `r${id++}`, d: 'M192,25 L200,0 L208,25 Z', fill: '#fff' });
  // Полоски рога
  P.push({ id: `r${id++}`, d: 'M195,18 L205,18', fill: 'none', stroke: '#fff', strokeWidth: 1.2 });
  P.push({ id: `r${id++}`, d: 'M196,12 L204,12', fill: 'none', stroke: '#fff', strokeWidth: 1.2 });
  P.push({ id: `r${id++}`, d: 'M197,6 L203,6', fill: 'none', stroke: '#fff', strokeWidth: 1.2 });

  // Чёлка / грива
  P.push({ id: `r${id++}`, d: 'M168,40 Q160,55 155,75 Q153,90 160,95 Q165,85 165,70 Q167,55 175,45 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M175,35 Q165,50 162,72 Q160,88 168,92 Q172,80 172,65 Q174,48 182,40 Z', fill: '#fff' });

  // Глаза
  P.push({ id: `r${id++}`, d: circ(180, 78, 14), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(220, 78, 14), fill: '#fff' });
  // Блики
  P.push({ id: `r${id++}`, d: circ(184, 74, 4), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(224, 74, 4), fill: '#fff' });

  // Носик
  P.push({ id: `r${id++}`, d: 'M195,100 Q200,96 205,100', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  // Ротик
  P.push({ id: `r${id++}`, d: 'M192,108 Q200,115 208,108', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  // Щёчки
  P.push({ id: `r${id++}`, d: 'M163,95 L170,93', fill: 'none', stroke: '#fff', strokeWidth: 1 });
  P.push({ id: `r${id++}`, d: 'M230,93 L237,95', fill: 'none', stroke: '#fff', strokeWidth: 1 });

  // Ручки
  P.push({ id: `r${id++}`, d: 'M120,190 Q100,195 88,210 Q80,225 90,235 Q100,225 98,210 Q105,198 125,195 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M280,190 Q300,195 312,210 Q320,225 310,235 Q300,225 302,210 Q295,198 275,195 Z', fill: '#fff' });

  // Копытце-рукавичка
  P.push({ id: `r${id++}`, d: circ(85, 228, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(315, 228, 10), fill: '#fff' });

  // Ножки
  P.push({ id: `r${id++}`, d: 'M165,330 Q162,355 165,375 Q170,385 185,385 Q188,375 185,355 Q183,335 178,328 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M222,328 Q217,355 215,375 Q218,385 232,385 Q238,375 235,355 Q235,335 232,330 Z', fill: '#fff' });

  // Ботиночки
  P.push({ id: `r${id++}`, d: 'M160,378 Q162,392 178,395 Q192,392 190,378 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M210,378 Q215,392 228,395 Q240,392 238,378 Z', fill: '#fff' });

  // Хвостик
  P.push({ id: `r${id++}`, d: 'M275,290 Q300,300 310,320 Q315,340 300,355 Q290,345 295,330 Q292,315 275,305 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M280,300 Q308,312 318,335 Q322,355 308,365 Q298,352 302,338 Q300,320 282,310 Z', fill: '#fff' });

  // Косичка на гриве
  P.push({ id: `r${id++}`, d: 'M148,80 Q135,100 130,130 Q128,155 138,160 L145,150 Q138,135 140,110 Q142,90 152,78 Z', fill: '#fff' });

  return P;
}

// ===== #13: Цветочная мандала с листовыми деталями =====
function makeImage13() {
  const P = []; let id = 0;
  const N = 8;

  // Внешние заострённые лепестки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(88, 178, a, 19), fill: '#fff' });
  }

  // Маленькие листочки-акценты на кончиках
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: leaf(150, 175, a, 5), fill: '#fff' });
  }

  // Листочки между внешними лепестками
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: leaf(125, 165, a, 7), fill: '#fff' });
  }

  // Средние лепестки (смещены)
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: drop(42, 112, a, 17), fill: '#fff' });
  }

  // Листовые прожилки в средних лепестках
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i + 22.5;
    P.push({ id: `r${id++}`, d: vein(46, 105, a), fill: 'none', stroke: '#fff', strokeWidth: 1.2 });
    P.push({ id: `r${id++}`, d: vein(55, 90, a - 5), fill: 'none', stroke: '#fff', strokeWidth: 0.8 });
    P.push({ id: `r${id++}`, d: vein(55, 90, a + 5), fill: 'none', stroke: '#fff', strokeWidth: 0.8 });
  }

  // Внутренние маленькие капельки
  for (let i = 0; i < N; i++) {
    const a = (360 / N) * i;
    P.push({ id: `r${id++}`, d: drop(18, 48, a, 14), fill: '#fff' });
  }

  // Центральный цветок: 5 округлых лепестков
  for (let i = 0; i < 5; i++) {
    const a = (360 / 5) * i;
    const [px, py] = polarXY(CX, CY, 22, a);
    P.push({ id: `r${id++}`, d: circ($(px), $(py), 11), fill: '#fff' });
  }

  // Центральная точка
  P.push({ id: `r${id++}`, d: circ(CX, CY, 9), fill: '#fff' });

  return P;
}

// ===== #14: Кухня — миска с венчиком и капкейк =====
function makeImage14() {
  const P = []; let id = 0;

  // Полка с банками
  P.push({ id: `r${id++}`, d: 'M260,25 L390,25 L390,35 L260,35 Z', fill: '#fff' });
  // Банки (3 штуки)
  P.push({ id: `r${id++}`, d: 'M272,10 Q275,5 285,5 Q290,5 293,10 L293,25 L272,25 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M305,8 Q308,3 318,3 Q323,3 326,8 L326,25 L305,25 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M340,10 Q343,5 352,5 Q357,5 360,10 L360,25 L340,25 Z', fill: '#fff' });

  // Большая миска (kawaii)
  P.push({ id: `r${id++}`, d: 'M60,200 Q55,190 70,180 L200,180 Q215,190 210,200 Q215,280 195,305 Q175,315 140,315 Q105,315 85,305 Q55,280 60,200 Z', fill: '#fff' });

  // Глаза миски
  P.push({ id: `r${id++}`, d: circ(112, 240, 12), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(158, 240, 12), fill: '#fff' });
  // Блики
  P.push({ id: `r${id++}`, d: circ(116, 236, 4), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(162, 236, 4), fill: '#fff' });
  // Ротик миски
  P.push({ id: `r${id++}`, d: 'M122,268 Q135,282 148,268', fill: 'none', stroke: '#fff', strokeWidth: 2 });

  // Тесто в миске (бугорки)
  P.push({ id: `r${id++}`, d: 'M75,185 Q90,160 110,170 Q130,155 150,168 Q170,155 190,170 Q205,162 210,180 L70,180 Z', fill: '#fff' });

  // Венчик
  P.push({ id: `r${id++}`, d: 'M155,170 L165,80 L170,78 L175,170', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  // Петли венчика
  P.push({ id: `r${id++}`, d: 'M160,140 Q155,120 160,100 Q165,85 170,100 Q175,120 170,140', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M158,140 Q150,115 158,95 Q165,80 172,95 Q180,115 172,140', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Ложка в миске
  P.push({ id: `r${id++}`, d: 'M80,185 L45,110 L50,108 L90,180', fill: 'none', stroke: '#fff', strokeWidth: 2.5 });
  // Головка ложки
  P.push({ id: `r${id++}`, d: 'M40,115 Q35,100 45,95 Q55,100 50,115 Z', fill: '#fff' });

  // Капкейк справа
  // Основание (формочка)
  P.push({ id: `r${id++}`, d: 'M260,260 L335,260 L325,310 L270,310 Z', fill: '#fff' });
  // Полоски формочки
  P.push({ id: `r${id++}`, d: 'M275,265 L272,308', fill: 'none', stroke: '#fff', strokeWidth: 1 });
  P.push({ id: `r${id++}`, d: 'M290,265 L288,308', fill: 'none', stroke: '#fff', strokeWidth: 1 });
  P.push({ id: `r${id++}`, d: 'M305,265 L303,308', fill: 'none', stroke: '#fff', strokeWidth: 1 });
  P.push({ id: `r${id++}`, d: 'M320,265 L318,308', fill: 'none', stroke: '#fff', strokeWidth: 1 });

  // Крем сверху (три слоя)
  P.push({ id: `r${id++}`, d: 'M255,260 Q265,240 280,248 Q298,235 310,248 Q325,238 340,260 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M268,245 Q278,225 298,230 Q315,222 325,240 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M280,230 Q290,210 300,215 Q310,210 315,228 Z', fill: '#fff' });
  // Пик крема
  P.push({ id: `r${id++}`, d: 'M290,215 Q295,195 302,212', fill: '#fff' });

  // Глаза капкейка (на формочке)
  P.push({ id: `r${id++}`, d: 'M282,280 Q288,270 294,280', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  P.push({ id: `r${id++}`, d: 'M302,280 Q308,270 314,280', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  // Ротик капкейка
  P.push({ id: `r${id++}`, d: 'M290,292 Q298,300 306,292', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Скалка на переднем плане
  P.push({ id: `r${id++}`, d: 'M30,330 Q35,320 50,318 L340,298 Q355,296 362,306 Q358,316 345,318 L55,338 Q38,340 30,330 Z', fill: '#fff' });
  // Ручки скалки
  P.push({ id: `r${id++}`, d: 'M20,335 Q15,325 25,320 L50,318 Q42,328 42,335 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M370,300 Q378,295 380,305 L362,308 Q365,300 370,300 Z', fill: '#fff' });

  // Декоративные сердечки
  P.push({ id: `r${id++}`, d: heartPath(15, 130, 14), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(240, 90, 10), fill: '#fff' });

  // Печеньки на столе слева
  P.push({ id: `r${id++}`, d: circ(25, 370, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(50, 385, 8), fill: '#fff' });

  // Формочки для печенья справа
  P.push({ id: `r${id++}`, d: heartPath(365, 370, 12), fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M385,385 L390,375 L395,385 L390,380 L385,385 Z', fill: '#fff' });

  return P;
}

// ===== #15: Кухня — скалка и мисочки на доске =====
function makeImage15() {
  const P = []; let id = 0;

  // Окно (4 стекла)
  P.push({ id: `r${id++}`, d: 'M20,15 L160,15 L160,130 L20,130 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M25,20 L85,20 L85,68 L25,68 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M95,20 L155,20 L155,68 L95,68 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M25,78 L85,78 L85,125 L25,125 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M95,78 L155,78 L155,125 L95,125 Z', fill: '#fff' });

  // Полка
  P.push({ id: `r${id++}`, d: 'M230,40 L390,40 L390,50 L230,50 Z', fill: '#fff' });
  // Баночки на полке
  P.push({ id: `r${id++}`, d: 'M245,15 Q248,10 260,10 Q268,10 270,15 L270,40 L245,40 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M290,20 Q293,15 305,15 Q312,15 315,20 L315,40 L290,40 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M335,12 Q338,8 348,8 Q355,8 358,12 L358,40 L335,40 Z', fill: '#fff' });

  // Разделочная доска
  P.push({ id: `r${id++}`, d: 'M60,290 Q55,280 70,270 L310,260 Q325,258 330,268 L330,300 L60,310 Z', fill: '#fff' });

  // Большая миска справа (kawaii)
  P.push({ id: `r${id++}`, d: 'M240,155 Q235,148 248,140 L365,140 Q378,148 375,155 Q380,225 360,252 Q340,262 310,262 Q280,262 260,252 Q235,225 240,155 Z', fill: '#fff' });
  // Тесто в миске
  P.push({ id: `r${id++}`, d: 'M250,145 Q270,125 295,135 Q320,120 345,132 Q365,125 375,142 L248,142 Z', fill: '#fff' });
  // Глаза
  P.push({ id: `r${id++}`, d: circ(285, 195, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(325, 195, 10), fill: '#fff' });
  // Ротик
  P.push({ id: `r${id++}`, d: 'M295,218 Q305,228 315,218', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Маленькая миска с кремом слева
  P.push({ id: `r${id++}`, d: 'M55,175 Q52,168 62,162 L145,162 Q155,168 152,175 Q155,220 142,238 Q128,245 105,245 Q82,245 68,238 Q52,220 55,175 Z', fill: '#fff' });
  // Крем сверху
  P.push({ id: `r${id++}`, d: 'M62,165 Q75,148 95,155 Q115,142 130,155 Q148,148 155,165 L60,165 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M80,152 Q95,138 110,148 Q125,135 135,150 Z', fill: '#fff' });
  // Пик
  P.push({ id: `r${id++}`, d: 'M100,140 Q108,120 115,138', fill: '#fff' });

  // Скалка на доске (kawaii)
  P.push({ id: `r${id++}`, d: 'M80,270 Q88,258 100,256 L280,248 Q292,246 298,256 Q295,268 282,270 L98,278 Q85,280 80,270 Z', fill: '#fff' });
  // Глаза скалки
  P.push({ id: `r${id++}`, d: circ(170, 260, 7), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(200, 258, 7), fill: '#fff' });
  // Ротик скалки
  P.push({ id: `r${id++}`, d: 'M178,272 Q185,278 192,272', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  // Ручки
  P.push({ id: `r${id++}`, d: circ(78, 275, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(300, 253, 10), fill: '#fff' });

  // Венчик в миске
  P.push({ id: `r${id++}`, d: 'M330,142 L342,70 L347,68 L350,140', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  P.push({ id: `r${id++}`, d: 'M335,120 Q330,100 336,85 Q342,72 348,85 Q354,100 348,120', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Декоративные сердечки и звёздочки
  P.push({ id: `r${id++}`, d: heartPath(195, 85, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(215, 105, 8), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(180, 115, 7), fill: '#fff' });

  // Формочки на столе
  P.push({ id: `r${id++}`, d: 'M340,340 L348,325 L356,340 L348,334 L340,340 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(375, 355, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(30, 350, 12), fill: '#fff' });

  // Масло
  P.push({ id: `r${id++}`, d: 'M350,365 L385,365 L385,390 L350,390 Z', fill: '#fff' });

  return P;
}

// ===== #16: Карандаш и сердечко на книжке =====
function makeImage16() {
  const P = []; let id = 0;

  // Фон (россыпь мелких элементов — точки)
  const dots = [[15,15],[385,20],[50,50],[350,55],[390,100],[20,120],[370,160],[30,200],[380,210],[15,280],[385,290],[50,350],[360,370],[200,15],[200,385]];
  for (const [dx, dy] of dots) {
    P.push({ id: `r${id++}`, d: circ(dx, dy, 3), fill: '#fff' });
  }

  // Книга (основная)
  P.push({ id: `r${id++}`, d: 'M80,220 L320,200 L330,260 L90,280 Z', fill: '#fff' });
  // Обложка книги (толщина)
  P.push({ id: `r${id++}`, d: 'M90,280 L330,260 L332,272 L92,292 Z', fill: '#fff' });
  // Страницы
  P.push({ id: `r${id++}`, d: 'M88,282 L328,262 L330,268 L90,288 Z', fill: '#fff' });
  // Закладка
  P.push({ id: `r${id++}`, d: 'M140,200 L148,200 L150,240 L144,250 L138,240 Z', fill: '#fff' });

  // Карандаш (kawaii, стоит на книге слева)
  P.push({ id: `r${id++}`, d: 'M130,100 L155,100 L160,210 L125,215 Z', fill: '#fff' });
  // Кончик (грифель)
  P.push({ id: `r${id++}`, d: 'M133,100 L142,70 L152,100 Z', fill: '#fff' });
  // Деревянная часть
  P.push({ id: `r${id++}`, d: 'M133,100 L137,88 L148,88 L152,100 Z', fill: '#fff' });
  // Ластик сверху
  P.push({ id: `r${id++}`, d: 'M126,210 L159,208 L162,225 L128,228 Z', fill: '#fff' });
  // Полоски карандаша
  P.push({ id: `r${id++}`, d: 'M133,120 L153,119', fill: 'none', stroke: '#fff', strokeWidth: 1 });
  P.push({ id: `r${id++}`, d: 'M132,140 L154,138', fill: 'none', stroke: '#fff', strokeWidth: 1 });
  P.push({ id: `r${id++}`, d: 'M130,160 L156,158', fill: 'none', stroke: '#fff', strokeWidth: 1 });
  // Глаза карандаша
  P.push({ id: `r${id++}`, d: circ(138, 155, 7), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(152, 154, 7), fill: '#fff' });
  // Ротик
  P.push({ id: `r${id++}`, d: 'M140,170 Q145,178 150,170', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Сердечко-персонаж (kawaii, справа на книге)
  P.push({ id: `r${id++}`, d: heartPath(235, 155, 55), fill: '#fff' });
  // Глаза сердечка
  P.push({ id: `r${id++}`, d: circ(220, 155, 8), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(250, 155, 8), fill: '#fff' });
  // Блики
  P.push({ id: `r${id++}`, d: circ(223, 152, 3), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(253, 152, 3), fill: '#fff' });
  // Ротик
  P.push({ id: `r${id++}`, d: 'M228,172 Q235,182 242,172', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  // Ручки сердечка
  P.push({ id: `r${id++}`, d: 'M200,160 Q190,165 188,175 Q192,180 200,175', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  P.push({ id: `r${id++}`, d: 'M270,160 Q280,165 282,175 Q278,180 270,175', fill: 'none', stroke: '#fff', strokeWidth: 2 });

  // Большие карандаши по углам (декор)
  // Верхний левый
  P.push({ id: `r${id++}`, d: 'M10,65 L25,65 L65,10 L52,8 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M62,12 L55,5 L68,0 Z', fill: '#fff' });
  // Нижний левый
  P.push({ id: `r${id++}`, d: 'M15,330 L30,325 L70,390 L55,395 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M68,388 L58,398 L75,400 Z', fill: '#fff' });
  // Верхний правый
  P.push({ id: `r${id++}`, d: 'M355,10 L370,15 L395,65 L380,68 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M352,12 L358,2 L368,10 Z', fill: '#fff' });
  // Нижний правый
  P.push({ id: `r${id++}`, d: 'M340,385 L355,380 L390,330 L375,328 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M388,332 L398,340 L392,325 Z', fill: '#fff' });

  // Звёздочки разбросанные
  P.push({ id: `r${id++}`, d: 'M90,40 L95,28 L100,40 L110,35 L102,44 L110,52 L100,48 L95,60 L90,48 L80,52 L88,44 L80,35 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M300,30 L304,20 L308,30 L316,26 L310,34 L316,42 L308,38 L304,48 L300,38 L292,42 L298,34 L292,26 Z', fill: '#fff' });

  // Сердечки декоративные
  P.push({ id: `r${id++}`, d: heartPath(50, 290, 12), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(355, 110, 14), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(70, 160, 10), fill: '#fff' });

  // Ластик
  P.push({ id: `r${id++}`, d: 'M310,330 L345,325 L350,345 L315,350 Z', fill: '#fff' });

  // Листочек бумаги
  P.push({ id: `r${id++}`, d: 'M55,300 L80,295 L82,320 L57,325 Z', fill: '#fff' });

  return P;
}

// ===== #17: Кухня — миски и инструменты (вариант 3) =====
function makeImage17() {
  const P = []; let id = 0;

  // Полка
  P.push({ id: `r${id++}`, d: 'M200,35 L395,35 L395,45 L200,45 Z', fill: '#fff' });
  // Баночки
  P.push({ id: `r${id++}`, d: 'M215,12 Q220,5 235,5 Q245,5 250,12 L250,35 L215,35 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M270,15 Q274,8 285,8 Q293,8 297,15 L297,35 L270,35 Z', fill: '#fff' });
  // Стакан с лопатками
  P.push({ id: `r${id++}`, d: 'M340,10 L365,10 L362,35 L343,35 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M348,10 L345,0 L350,-5 L352,10', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  P.push({ id: `r${id++}`, d: 'M355,10 L358,0 L362,-2 L360,10', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Большая миска (kawaii) — по центру-справа
  P.push({ id: `r${id++}`, d: 'M195,165 Q190,158 205,150 L345,150 Q360,158 355,165 Q360,240 340,265 Q318,275 280,275 Q245,275 225,265 Q195,240 195,165 Z', fill: '#fff' });
  // Крем/тесто сверху
  P.push({ id: `r${id++}`, d: 'M205,155 Q225,135 250,145 Q275,130 300,142 Q325,132 345,148 L355,155 L205,155 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M230,140 Q255,122 280,132 Q305,120 325,135 Z', fill: '#fff' });
  P.push({ id: `r${id++}`, d: 'M260,125 Q275,108 290,122', fill: '#fff' });
  // Глаза
  P.push({ id: `r${id++}`, d: circ(252, 210, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(302, 210, 10), fill: '#fff' });
  // Ротик
  P.push({ id: `r${id++}`, d: 'M265,232 Q278,244 290,232', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Маленькая мисочка слева (kawaii)
  P.push({ id: `r${id++}`, d: 'M30,195 Q28,188 38,182 L128,182 Q138,188 136,195 Q138,245 125,262 Q112,270 85,270 Q58,270 45,262 Q28,245 30,195 Z', fill: '#fff' });
  // Тесто
  P.push({ id: `r${id++}`, d: 'M38,185 Q55,168 75,178 Q95,165 115,175 Q130,168 138,184 L35,184 Z', fill: '#fff' });
  // Глаза (прищуренные — дуги)
  P.push({ id: `r${id++}`, d: 'M58,218 Q65,210 72,218', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  P.push({ id: `r${id++}`, d: 'M92,218 Q99,210 106,218', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  // Ротик
  P.push({ id: `r${id++}`, d: 'M72,235 Q82,242 92,235', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Венчик
  P.push({ id: `r${id++}`, d: 'M310,148 L325,60 L330,58 L333,146', fill: 'none', stroke: '#fff', strokeWidth: 2 });
  P.push({ id: `r${id++}`, d: 'M315,125 Q310,105 316,88 Q324,70 330,88 Q336,105 330,125', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });

  // Скалка на столе (kawaii)
  P.push({ id: `r${id++}`, d: 'M50,305 Q58,292 72,290 L320,280 Q335,278 342,288 Q338,300 325,302 L68,312 Q55,314 50,305 Z', fill: '#fff' });
  // Глаза скалки
  P.push({ id: `r${id++}`, d: circ(175, 292, 6), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(205, 290, 6), fill: '#fff' });
  // Ротик
  P.push({ id: `r${id++}`, d: 'M182,302 Q190,308 198,302', fill: 'none', stroke: '#fff', strokeWidth: 1.5 });
  // Ручки скалки
  P.push({ id: `r${id++}`, d: circ(48, 310, 9), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(344, 285, 9), fill: '#fff' });

  // Звёздочка-формочка
  P.push({ id: `r${id++}`, d: 'M30,340 L35,328 L40,340 L50,335 L42,344 L50,352 L40,348 L35,360 L30,348 L20,352 L28,344 L20,335 Z', fill: '#fff' });

  // Сердечки
  P.push({ id: `r${id++}`, d: heartPath(170, 80, 10), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(150, 105, 8), fill: '#fff' });
  P.push({ id: `r${id++}`, d: heartPath(190, 100, 7), fill: '#fff' });

  // Формочки на столе
  P.push({ id: `r${id++}`, d: heartPath(370, 345, 12), fill: '#fff' });
  P.push({ id: `r${id++}`, d: circ(340, 365, 10), fill: '#fff' });

  return P;
}

// Собираем все шаблоны
const CUSTOM_IMAGES = [
  makeImage0(),
  makeImage1(),
  makeImage2(),
  makeImage3(),
  makeImage4(),
  makeImage5(),
  makeImage6(),
  makeImage7(),
  makeImage8(),
  makeImage9(),
  makeImage10(),
  makeImage11(),
  makeImage12(),
  makeImage13(),
  makeImage14(),
  makeImage15(),
  makeImage16(),
  makeImage17(),
];

export function generateCustom(index) {
  return CUSTOM_IMAGES[index % CUSTOM_IMAGES.length];
}
