import React, { useMemo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getGenerator } from '../generators';

export default function ImageThumbnail({ index, genId, categoryColor, hasProgress: hasProg, onPress, sp }) {
  const paths = useMemo(() => {
    const gen = getGenerator(genId);
    return gen ? gen(index) : [];
  }, [genId, index]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { padding: sp(7, 12), borderRadius: sp(13, 16) },
        pressed && styles.pressed,
      ]}
    >
      <Svg viewBox="0 0 400 400" style={styles.svg}>
        {paths.map(r => (
          <Path
            key={r.id}
            d={r.d}
            fill={r.fill || 'none'}
            stroke={'rgba(0,0,0,1)'}
            strokeWidth={r.strokeWidth || 1.1}
            strokeLinejoin="round"
          />
        ))}
      </Svg>
      <Text style={[styles.number, { fontSize: sp(8, 11) }]}>#{index + 1}</Text>
      {hasProg && <View style={[styles.dot, { width: sp(8, 12), height: sp(8, 12), borderRadius: sp(4, 6), backgroundColor: categoryColor }]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1,
    backgroundColor: '#faf6f0',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  number: {
    position: 'absolute',
    bottom: 3,
    right: 5,
    color: '#333',
    opacity: 0.25,
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
