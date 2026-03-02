import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BG = '#faf6f0';
const SECTORS = 16;
const RINGS = [0, 55, 130, 350];

// Pre-compute background cells: 3 rings × 16 sectors = 48 cells
const BG_CELLS = (() => {
  const cells = [];
  const toRad = deg => (deg - 90) * Math.PI / 180;
  const cx = 200, cy = 200;
  const px = (r, a) => Math.round(cx + r * Math.cos(toRad(a)));
  const py = (r, a) => Math.round(cy + r * Math.sin(toRad(a)));

  for (let ri = 0; ri < RINGS.length - 1; ri++) {
    const rIn = RINGS[ri], rOut = RINGS[ri + 1];
    for (let si = 0; si < SECTORS; si++) {
      const a1 = (360 / SECTORS) * si;
      const a2 = (360 / SECTORS) * (si + 1);
      const d = rIn === 0
        ? `M${cx},${cy} L${px(rOut, a1)},${py(rOut, a1)} L${px(rOut, a2)},${py(rOut, a2)} Z`
        : `M${px(rIn, a1)},${py(rIn, a1)} L${px(rOut, a1)},${py(rOut, a1)} L${px(rOut, a2)},${py(rOut, a2)} L${px(rIn, a2)},${py(rIn, a2)} Z`;
      cells.push({ id: `bg${ri}_${si}`, d });
    }
  }
  return cells;
})();

export default function SVGCanvas({ paths, filled, onPathPress, size, categoryColor, canvasRef }) {
  return (
    <View
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        alignSelf: 'center',
        backgroundColor: BG,
        overflow: 'hidden',
      }}
      collapsable={false}
    >
      <Svg width={size} height={size} viewBox="0 0 400 400">
        {/* Background: 3 rings × 16 sectors = 48 colorable cells */}
        {BG_CELLS.map(bg => (
          <Path
            key={bg.id}
            d={bg.d}
            fill={filled[bg.id] || BG}
            stroke="none"
            onPress={() => onPathPress(bg.id)}
          />
        ))}
        {paths.map(r => {
          const isStrokeOnly = r.fill === 'none' || (!r.fill && r.stroke);
          const userColor = filled[r.id];

          let pathFill, pathStroke, pathStrokeWidth;

          if (userColor) {
            if (isStrokeOnly) {
              pathFill = 'none';
              pathStroke = userColor;
              pathStrokeWidth = (r.strokeWidth || 2) + 1;
            } else {
              pathFill = userColor;
              pathStroke = 'rgba(0,0,0,1)';
              pathStrokeWidth = r.strokeWidth || 1.2;
            }
          } else {
            pathFill = r.fill || 'none';
            pathStroke = 'rgba(0,0,0,1)';
            pathStrokeWidth = r.strokeWidth || 1.4;
          }

          return (
            <React.Fragment key={r.id}>
              {isStrokeOnly && (
                <Path
                  d={r.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={20}
                  onPress={() => onPathPress(r.id)}
                />
              )}
              <Path
                d={r.d}
                fill={pathFill}
                stroke={pathStroke}
                strokeWidth={pathStrokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                onPress={() => onPathPress(r.id)}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
