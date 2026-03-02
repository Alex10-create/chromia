import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import ImageThumbnail from '../components/ImageThumbnail';
import { CATEGORIES } from '../generators';
import { getAllProgress } from '../utils/storage';

export default function GalleryScreen({ layout, catId, onSelectImage, onBack }) {
  const cat = useMemo(() => CATEGORIES.find(c => c.id === catId), [catId]);
  const [progress, setProgress] = useState({});
  const { sp } = layout;
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
      <View style={[styles.header, { gap: sp(9, 14), paddingHorizontal: sp(13, 20), paddingVertical: sp(11, 16) }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={[styles.backText, { fontSize: sp(17, 22) }]}>{"\u2190"}</Text>
        </Pressable>
        <Text style={{ fontSize: sp(18, 24) }}>{cat.emoji}</Text>
        <View>
          <Text style={[styles.name, { fontSize: sp(14, 18) }]}>{cat.name}</Text>
          <Text style={[styles.count, { fontSize: sp(9, 12) }]}>{cat.count} {"\u043a\u0430\u0440\u0442\u0438\u043d\u043e\u043a"}</Text>
        </View>
      </View>

      {/* Grid */}
      <FlatList
        data={images}
        numColumns={layout.imageColumns}
        key={`gallery-${layout.imageColumns}`}
        keyExtractor={(item) => `${catId}-${item}`}
        contentContainerStyle={[styles.grid, { padding: sp(12, 20), maxWidth: sp(600, 900) }]}
        columnWrapperStyle={layout.imageColumns > 1 ? { gap: sp(9, 14), marginBottom: sp(9, 14) } : undefined}
        renderItem={({ item: idx }) => (
          <View style={{ width: `${(100 / layout.imageColumns) - 2}%` }}>
            <ImageThumbnail
              index={idx}
              genId={cat.gen}
              categoryColor={cat.color}
              hasProgress={!!progress[idx]}
              onPress={() => onSelectImage(catId, idx)}
              sp={sp}
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'rgba(250,246,240,0.95)',
  },
  backBtn: { padding: 4 },
  backText: { color: '#2c2c2c', opacity: 0.7 },
  name: { color: '#2c2c2c', letterSpacing: 1 },
  count: { color: '#2c2c2c', opacity: 0.35 },
  grid: {
    alignSelf: 'center',
    width: '100%',
  },
});
