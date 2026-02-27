import React, { useMemo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getGenerator } from '../generators';

export default function ImageThumbnail({ index, genId, categoryColor, hasProgress: hasProg, onPress }) {
  const paths = useMemo(() => {
    const gen = getGenerator(genId);
    return gen ? gen(index) : [];
  }, [genId, index]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <Svg viewBox="0 0 400 400" style={styles.svg}>
        {paths.map(r => (
          <Path
            key={r.id}
            d={r.d}
            fill={r.fill || 'none'}
            stroke={r.stroke || `${categoryColor}77`}
            strokeWidth={r.strokeWidth || 1.1}
            strokeLinejoin="round"
          />
        ))}
      </Svg>
      <Text style={styles.number}>#{index + 1}</Text>
      {hasProg && <View style={[styles.dot, { backgroundColor: categoryColor }]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.022)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.045)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  svg: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  number: {
    position: 'absolute',
    bottom: 3,
    right: 5,
    fontSize: 8,
    color: '#f0e6d3',
    opacity: 0.22,
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
