import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { PALETTES, PALETTE_NAMES } from '../generators';

export default function ColorPalette({ palette, setPalette, color, setColor, setTool, horizontal, sp }) {
  const colors = PALETTES[palette] || PALETTES.sunset;
  const dotSize = sp(32, 50);
  const dotActiveSize = sp(40, 58);

  return (
    <View style={[styles.container, { paddingHorizontal: sp(9, 16) }, horizontal && { width: sp(220, 300), paddingHorizontal: sp(12, 18) }]}>
      {/* Palette name */}
      <Text style={[styles.paletteName, { fontSize: sp(13, 16), paddingBottom: sp(8, 12) }]}>{palette}</Text>

      {/* Color dots */}
      <View style={[styles.dotsWrap, { gap: sp(10, 16), paddingBottom: sp(14, 20) }]}>
        {colors.map(c => (
          <Pressable
            key={c}
            onPress={() => { setColor(c); setTool('fill'); }}
            style={[
              {
                width: color === c ? dotActiveSize : dotSize,
                height: color === c ? dotActiveSize : dotSize,
                borderRadius: color === c ? dotActiveSize / 2 : dotSize / 2,
                backgroundColor: c,
                borderWidth: color === c ? 2.5 : 2,
                borderColor: color === c ? '#2c2c2c' : 'rgba(0,0,0,0.08)',
              },
              color === c && { shadowColor: c, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, shadowRadius: 6, elevation: 4 },
            ]}
          />
        ))}
      </View>

      {/* Palette selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.palScroll, { gap: sp(6, 10) }]}
      >
        {PALETTE_NAMES.map(p => (
          <Pressable
            key={p}
            onPress={() => setPalette(p)}
            style={[styles.palChip, { gap: sp(6, 8), paddingHorizontal: sp(14, 18), paddingVertical: sp(8, 12) }, palette === p && styles.palChipActive]}
          >
            <View style={[styles.palDots, { gap: sp(3, 5) }]}>
              {PALETTES[p].slice(0, 3).map((c, i) => (
                <View key={i} style={{ width: sp(10, 14), height: sp(10, 14), borderRadius: sp(5, 7), backgroundColor: c }} />
              ))}
            </View>
            <Text style={[styles.palLabel, { fontSize: sp(12, 15) }]}>{p}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  paletteName: {
    textAlign: 'center',
    letterSpacing: 3,
    opacity: 0.3,
    color: '#2c2c2c',
    textTransform: 'uppercase',
  },
  dotsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  palScroll: {
    paddingBottom: 4,
  },
  palChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  palChipActive: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  palDots: {
    flexDirection: 'row',
  },
  palLabel: {
    color: '#2c2c2c',
    opacity: 0.5,
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
});
