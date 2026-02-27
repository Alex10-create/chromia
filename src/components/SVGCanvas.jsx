import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

export default function SVGCanvas({ paths, filled, onPathPress, size, categoryColor, canvasRef }) {
  return (
    <View
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        alignSelf: 'center',
        backgroundColor: '#0e0e1c',
      }}
      collapsable={false}
    >
      <Svg width={size} height={size} viewBox="0 0 400 400">
        <Defs>
          <RadialGradient id="gl" cx="200" cy="200" rx="195" ry="195">
            <Stop offset="0%" stopColor={`${categoryColor || '#7b4dff'}22`} />
            <Stop offset="100%" stopColor="transparent" />
          </RadialGradient>
        </Defs>
        <Circle cx="200" cy="200" r="195" fill="url(#gl)" />
        {paths.map(r => (
          <Path
            key={r.id}
            d={r.d}
            fill={filled[r.id] || r.fill || 'none'}
            stroke={
              filled[r.id]
                ? 'rgba(255,255,255,0.12)'
                : (r.stroke || 'rgba(200,180,240,0.3)')
            }
            strokeWidth={r.strokeWidth || 1.4}
            strokeLinejoin="round"
            onPress={() => onPathPress(r.id)}
          />
        ))}
      </Svg>
    </View>
  );
}
