import React from 'react';
import { View, Text, Image, Pressable, FlatList, StyleSheet } from 'react-native';

export default function CompletedGallery({ items, columns, onPress }) {
  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>{"\ud83c\udfa8"}</Text>
        <Text style={styles.emptyText}>{"\u0417\u0434\u0435\u0441\u044c \u043f\u043e\u044f\u0432\u044f\u0442\u0441\u044f \u0432\u0430\u0448\u0438 \u0433\u043e\u0442\u043e\u0432\u044b\u0435 \u0440\u0430\u0431\u043e\u0442\u044b"}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      numColumns={columns}
      key={`completed-${columns}`}
      keyExtractor={(item) => `${item.catId}-${item.imgIdx}`}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPress(item.catId, item.imgIdx)}
          style={({ pressed }) => [
            styles.card,
            { width: `${(100 / columns) - 2}%` },
            pressed && styles.pressed,
          ]}
        >
          {item.thumbnailUri ? (
            <Image source={{ uri: item.thumbnailUri }} style={styles.thumb} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>{"\ud83d\uddbc\ufe0f"}</Text>
            </View>
          )}
          <Text style={styles.date}>
            {new Date(item.completedAt).toLocaleDateString('ru-RU')}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 13, color: '#f0e6d3', opacity: 0.35, textAlign: 'center' },
  grid: { padding: 12 },
  row: { gap: 9, marginBottom: 9 },
  card: {
    aspectRatio: 1,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.022)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.045)',
    overflow: 'hidden',
  },
  pressed: { opacity: 0.7 },
  thumb: { width: '100%', height: '100%', borderRadius: 12 },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { fontSize: 30 },
  date: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    fontSize: 8,
    color: '#f0e6d3',
    opacity: 0.3,
  },
});
