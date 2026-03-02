export { makeRng, polarXY } from './prng';
export { generateMandala } from './mandala';
export { generateFlower } from './flower';
export { generateAnimal } from './animal';
export { generateButterfly } from './butterfly';
export { generatePattern } from './pattern';
export { generateNature } from './nature';
export { generateSea } from './sea';
export { generateSpace } from './space';
export { generateHeart } from './heart';
export { generateCustom } from './custom';

export const CATEGORIES = [
  { id: "mandalas", name: "\u041c\u0430\u043d\u0434\u0430\u043b\u044b", emoji: "\ud83d\udd8c\ufe0f", gen: "mandala", count: 24, color: "#9b59b6" },
  { id: "flowers", name: "\u0426\u0432\u0435\u0442\u044b", emoji: "\ud83c\udf38", gen: "flower", count: 24, color: "#e74c3c" },
  { id: "animals", name: "\u0416\u0438\u0432\u043e\u0442\u043d\u044b\u0435", emoji: "\ud83e\udd81", gen: "animal", count: 24, color: "#f39c12" },
  { id: "butterflies", name: "\u0411\u0430\u0431\u043e\u0447\u043a\u0438", emoji: "\ud83e\udd8b", gen: "butterfly", count: 20, color: "#1abc9c" },
  { id: "patterns", name: "\u0423\u0437\u043e\u0440\u044b", emoji: "\u2726", gen: "pattern", count: 20, color: "#3498db" },
  { id: "nature", name: "\u041f\u0440\u0438\u0440\u043e\u0434\u0430", emoji: "\ud83c\udfde\ufe0f", gen: "nature", count: 20, color: "#27ae60" },
  { id: "sea", name: "\u041c\u043e\u0440\u0435", emoji: "\ud83c\udf0a", gen: "sea", count: 20, color: "#0077b6" },
  { id: "space", name: "\u041a\u043e\u0441\u043c\u043e\u0441", emoji: "\ud83e\ude90", gen: "space", count: 16, color: "#6c3483" },
  { id: "hearts", name: "\u0421\u0435\u0440\u0434\u0435\u0447\u043a\u0438", emoji: "\u2764\ufe0f", gen: "heart", count: 16, color: "#e91e63" },
  { id: "test", name: "\u0422\u0435\u0441\u0442", emoji: "\ud83e\uddea", gen: "custom", count: 18, color: "#ff6b35" },
];

export const GENERATORS = {
  mandala: require('./mandala').generateMandala,
  flower: require('./flower').generateFlower,
  animal: require('./animal').generateAnimal,
  butterfly: require('./butterfly').generateButterfly,
  pattern: require('./pattern').generatePattern,
  nature: require('./nature').generateNature,
  sea: require('./sea').generateSea,
  space: require('./space').generateSpace,
  heart: require('./heart').generateHeart,
  custom: require('./custom').generateCustom,
};

export function getGenerator(genId) {
  return GENERATORS[genId];
}

export const PALETTES = {
  sunset:["#FF6B6B","#FFA07A","#FFD700","#FF8C69","#E74C3C","#F39C12","#D35400","#C0392B"],
  ocean:["#0077B6","#00B4D8","#90E0EF","#48CAE4","#023E8A","#0096C7","#ADE8F4","#CAF0F8"],
  forest:["#2D6A4F","#40916C","#52B788","#74C69D","#95D5B2","#B7E4C7","#1B4332","#D8F3DC"],
  berry:["#7B2D8E","#9B59B6","#E91E9C","#F06292","#CE93D8","#AB47BC","#880E4F","#AD1457"],
  earth:["#8D6E63","#A1887F","#D7CCC8","#795548","#6D4C41","#BCAAA4","#4E342E","#3E2723"],
  pastel:["#FFB5E8","#B5DEFF","#E7FFAC","#FFC9DE","#C4FAF8","#FFE4A0","#DCD3FF","#BAFFC9"],
  neon:["#FF00FF","#00FFFF","#FFFF00","#FF3366","#00FF88","#FF6600","#AA00FF","#00FFAA"],
  skin:["#FDEBD0","#F5CBA7","#E0AC69","#C68642","#8D5524","#5C3317","#F8D5B0","#D4A57B"],
  candy:["#FF69B4","#FF1493","#FFB6C1","#FFC0CB","#FF85A1","#F72585","#B5179E","#7209B7"],
  mono:["#FFFFFF","#E0E0E0","#BDBDBD","#9E9E9E","#757575","#616161","#424242","#212121"],
  autumn:["#D4A017","#C35831","#8B4513","#CD853F","#DAA520","#B8860B","#A0522D","#F4A460"],
  arctic:["#E8F4FD","#B3E5FC","#81D4FA","#4FC3F7","#29B6F6","#039BE5","#0277BD","#01579B"],
  tropical:["#00C853","#FFD600","#FF6D00","#FF1744","#00BFA5","#64DD17","#FFAB00","#D50000"],
  lavender:["#E1BEE7","#CE93D8","#BA68C8","#AB47BC","#9C27B0","#8E24AA","#7B1FA2","#6A1B9A"],
  vintage:["#D4C5A9","#A67B5B","#8B7355","#C9B79C","#E8D5B7","#967259","#785E49","#BFA98A"],
  ruby:["#E53935","#C62828","#B71C1C","#FF5252","#FF1744","#D32F2F","#F44336","#EF9A9A"],
  mint:["#B2DFDB","#80CBC4","#4DB6AC","#26A69A","#009688","#00897B","#00796B","#E0F2F1"],
  golden:["#FFF8E1","#FFECB3","#FFD54F","#FFCA28","#FFC107","#FFB300","#FFA000","#FF8F00"],
  night:["#1A237E","#283593","#303F9F","#3949AB","#3F51B5","#5C6BC0","#7986CB","#9FA8DA"],
  rose:["#FCE4EC","#F8BBD0","#F48FB1","#F06292","#EC407A","#E91E63","#D81B60","#C2185B"],
};

export const PALETTE_NAMES = Object.keys(PALETTES);
