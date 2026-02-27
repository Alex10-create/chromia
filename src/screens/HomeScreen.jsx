import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import CompletedGallery from '../components/CompletedGallery';
import { CATEGORIES } from '../generators';
import { loadGallery } from '../utils/storage';

export default function HomeScreen({ layout, onSelectCategory, onSelectImage }) {
  const [tab, setTab] = useState('categories'); // 'categories' | 'gallery'
  const [gallery, setGallery] = useState([]);
  const total = CATEGORIES.reduce((s, c) => s + c.count, 0);

  useEffect(() => {
    loadGallery().then(setGallery);
  }, []);

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CHROMIA</Text>
        <Text style={styles.subtitle}>
          {"\u0420\u0430\u0441\u043a\u0440\u0430\u0441\u044c \u0441\u0432\u043e\u0439 \u043f\u043e\u043a\u043e\u0439"} {"\u00b7"} {total} {"\u043a\u0430\u0440\u0442\u0438\u043d\u043e\u043a"}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable onPress={() => setTab('categories')} style={[styles.tab, tab === 'categories' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'categories' && styles.tabTextActive]}>{"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438"}</Text>
        </Pressable>
        <Pressable onPress={() => { setTab('gallery'); loadGallery().then(setGallery); }} style={[styles.tab, tab === 'gallery' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'gallery' && styles.tabTextActive]}>
            {"\u041c\u043e\u0438 \u0440\u0430\u0431\u043e\u0442\u044b"} {gallery.length > 0 ? `(${gallery.length})` : ''}
          </Text>
        </Pressable>
      </View>

      {tab === 'categories' ? (
        <ScrollView contentContainerStyle={styles.list}>
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onPress={() => onSelectCategory(cat.id)}
            />
          ))}
          {/* AI placeholder */}
          <View style={styles.aiCard}>
            <View style={styles.aiIcon}>
              <Text style={{ fontSize: 20 }}>{"\u2728"}</Text>
            </View>
            <View>
              <Text style={styles.aiTitle}>AI-{"\u0413\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044f"}</Text>
              <Text style={styles.aiSub}>{"\u0421\u043a\u043e\u0440\u043e"}</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <CompletedGallery
          items={gallery}
          columns={layout.imageColumns}
          onPress={(catId, imgIdx) => onSelectImage(catId, imgIdx)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 12,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 8,
    color: '#f0e6d3',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 5,
    color: '#f0e6d3',
    opacity: 0.4,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tabText: {
    fontSize: 12,
    color: '#f0e6d3',
    opacity: 0.4,
    letterSpacing: 1,
  },
  tabTextActive: {
    opacity: 1,
  },
  list: {
    padding: 14,
    paddingTop: 10,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 13,
    paddingHorizontal: 16,
    marginTop: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(120,80,200,0.16)',
    backgroundColor: 'rgba(120,80,200,0.04)',
    opacity: 0.4,
  },
  aiIcon: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: 'rgba(120,80,200,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(120,80,200,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTitle: { fontSize: 14, color: '#f0e6d3', letterSpacing: 1 },
  aiSub: { fontSize: 10, color: '#f0e6d3', opacity: 0.5, marginTop: 1 },
});
