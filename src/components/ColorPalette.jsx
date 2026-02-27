import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { PALETTES, PALETTE_NAMES } from '../generators';

export default function ColorPalette({ palette, setPalette, color, setColor, setTool, horizontal }) {
  const colors = PALETTES[palette] || PALETTES.sunset;

  return (
    <View style={[styles.container, horizontal && styles.containerH]}>
      {/* Palette name */}
      <Text style={styles.paletteName}>{palette}</Text>

      {/* Color dots */}
      <View style={styles.dotsWrap}>
        {colors.map(c => (
          <Pressable
            key={c}
            onPress={() => { setColor(c); setTool('fill'); }}
            style={[
              styles.dot,
              { backgroundColor: c },
              color === c && styles.dotActive,
              color === c && { borderColor: '#fff', shadowColor: c },
            ]}
          />
        ))}
      </View>

      {/* Palette selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.palScroll}
      >
        {PALETTE_NAMES.map(p => (
          <Pressable
            key={p}
            onPress={() => setPalette(p)}
            style={[styles.palChip, palette === p && styles.palChipActive]}
          >
            <View style={styles.palDots}>
              {PALETTES[p].slice(0, 3).map((c, i) => (
                <View key={i} style={[styles.palDot, { backgroundColor: c }]} />
              ))}
            </View>
            <Text style={styles.palLabel}>{p}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 9,
    paddingBottom: 8,
  },
  containerH: {
    width: 220,
    paddingHorizontal: 12,
  },
  paletteName: {
    textAlign: 'center',
    fontSize: 13,
    letterSpacing: 3,
    opacity: 0.35,
    color: '#f0e6d3',
    textTransform: 'uppercase',
    paddingBottom: 8,
  },
  dotsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 14,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.09)',
  },
  dotActive: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2.5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  palScroll: {
    gap: 6,
    paddingBottom: 4,
  },
  palChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  palChipActive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  palDots: {
    flexDirection: 'row',
    gap: 3,
  },
  palDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  palLabel: {
    fontSize: 12,
    color: '#f0e6d3',
    opacity: 0.5,
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
});
