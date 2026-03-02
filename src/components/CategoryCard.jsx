import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';

export default function CategoryCard({ category, onPress, sp }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { gap: sp(13, 18), padding: sp(13, 18), paddingHorizontal: sp(16, 22), marginBottom: sp(7, 11) },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconWrap, { width: sp(46, 60), height: sp(46, 60), backgroundColor: `${category.color}18`, borderColor: `${category.color}35` }]}>
        <Text style={{ fontSize: sp(20, 26) }}>{category.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { fontSize: sp(14, 18) }]}>{category.name}</Text>
        <Text style={[styles.count, { fontSize: sp(10, 13) }]}>{category.count} {"\u043a\u0430\u0440\u0442\u0438\u043d\u043e\u043a"}</Text>
      </View>
      <Text style={[styles.arrow, { fontSize: sp(15, 20) }]}>{"\u203a"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconWrap: {
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  name: { color: '#2c2c2c', letterSpacing: 1 },
  count: { color: '#2c2c2c', opacity: 0.35, marginTop: 1 },
  arrow: { color: '#2c2c2c', opacity: 0.22 },
});
