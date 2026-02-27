import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import ImageThumbnail from '../components/ImageThumbnail';
import { CATEGORIES } from '../generators';
import { getAllProgress } from '../utils/storage';

export default function GalleryScreen({ layout, catId, onSelectImage, onBack }) {
  const cat = useMemo(() => CATEGORIES.find(c => c.id === catId), [catId]);
  const [progress, setProgress] = useState({});
  const images = useMemo(
    () => cat ? Array.from({ length: cat.count }, (_, i) => i) : [],
    [cat]
  );

  useEffect(() => {
    if (cat) {
      getAllProgress(cat.id, cat.count).then(setProgress);
    }
  }, [cat]);

  if (!cat) return null;

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>{"\u2190"}</Text>
        </Pressable>
        <Text style={styles.emoji}>{cat.emoji}</Text>
        <View>
          <Text style={styles.name}>{cat.name}</Text>
          <Text style={styles.count}>{cat.count} {"\u043a\u0430\u0440\u0442\u0438\u043d\u043e\u043a"}</Text>
        </View>
      </View>

      {/* Grid */}
      <FlatList
        data={images}
        numColumns={layout.imageColumns}
        key={`gallery-${layout.imageColumns}`}
        keyExtractor={(item) => `${catId}-${item}`}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={layout.imageColumns > 1 ? styles.row : undefined}
        renderItem={({ item: idx }) => (
          <View style={{ width: `${(100 / layout.imageColumns) - 2}%` }}>
            <ImageThumbnail
              index={idx}
              genId={cat.gen}
              categoryColor={cat.color}
              hasProgress={!!progress[idx]}
              onPress={() => onSelectImage(catId, idx)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(10,10,26,0.92)',
  },
  backBtn: {
    padding: 4,
  },
  backText: {
    fontSize: 17,
    color: '#f0e6d3',
    opacity: 0.7,
  },
  emoji: { fontSize: 18 },
  name: { fontSize: 14, color: '#f0e6d3', letterSpacing: 1 },
  count: { fontSize: 9, color: '#f0e6d3', opacity: 0.3 },
  grid: {
    padding: 12,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  row: {
    gap: 9,
    marginBottom: 9,
  },
});
