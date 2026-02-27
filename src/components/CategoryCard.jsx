import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';

export default function CategoryCard({ category, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${category.color}22`, borderColor: `${category.color}44` }]}>
        <Text style={styles.emoji}>{category.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.count}>{category.count} \u043a\u0430\u0440\u0442\u0438\u043d\u043e\u043a</Text>
      </View>
      <Text style={styles.arrow}>\u203a</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 13,
    paddingHorizontal: 16,
    marginBottom: 7,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.035)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 20 },
  info: { flex: 1 },
  name: { fontSize: 14, color: '#f0e6d3', letterSpacing: 1 },
  count: { fontSize: 10, color: '#f0e6d3', opacity: 0.35, marginTop: 1 },
  arrow: { fontSize: 15, color: '#f0e6d3', opacity: 0.22 },
});
