import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import CompletedGallery from '../components/CompletedGallery';
import { CATEGORIES } from '../generators';
import { loadGallery } from '../utils/storage';

export default function HomeScreen({ layout, onSelectCategory, onSelectImage }) {
  const [tab, setTab] = useState('categories');
  const [gallery, setGallery] = useState([]);
  const total = CATEGORIES.reduce((s, c) => s + c.count, 0);
  const { sp } = layout;

  useEffect(() => {
    loadGallery().then(setGallery);
  }, []);

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: sp(40, 56) }]}>
        <Text style={[styles.title, { fontSize: sp(40, 52) }]}>CHROMIA</Text>
        <Text style={[styles.subtitle, { fontSize: sp(10, 13) }]}>
          {"\u0420\u0430\u0441\u043a\u0440\u0430\u0441\u044c \u0441\u0432\u043e\u0439 \u043f\u043e\u043a\u043e\u0439"} {"\u00b7"} {total} {"\u043a\u0430\u0440\u0442\u0438\u043d\u043e\u043a"}
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { gap: sp(16, 24), paddingVertical: sp(10, 14) }]}>
        <Pressable onPress={() => setTab('categories')} style={[styles.tab, { paddingHorizontal: sp(16, 22), paddingVertical: sp(6, 10) }, tab === 'categories' && styles.tabActive]}>
          <Text style={[styles.tabText, { fontSize: sp(12, 15) }, tab === 'categories' && styles.tabTextActive]}>{"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438"}</Text>
        </Pressable>
        <Pressable onPress={() => { setTab('gallery'); loadGallery().then(setGallery); }} style={[styles.tab, { paddingHorizontal: sp(16, 22), paddingVertical: sp(6, 10) }, tab === 'gallery' && styles.tabActive]}>
          <Text style={[styles.tabText, { fontSize: sp(12, 15) }, tab === 'gallery' && styles.tabTextActive]}>
            {"\u041c\u043e\u0438 \u0440\u0430\u0431\u043e\u0442\u044b"} {gallery.length > 0 ? `(${gallery.length})` : ''}
          </Text>
        </Pressable>
      </View>

      {tab === 'categories' ? (
        <ScrollView contentContainerStyle={[styles.list, { maxWidth: sp(520, 800), padding: sp(14, 22) }]}>
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onPress={() => onSelectCategory(cat.id)}
              sp={sp}
            />
          ))}
          {/* AI placeholder */}
          <View style={[styles.aiCard, { gap: sp(13, 18), padding: sp(13, 18), paddingHorizontal: sp(16, 22) }]}>
            <View style={[styles.aiIcon, { width: sp(46, 60), height: sp(46, 60) }]}>
              <Text style={{ fontSize: sp(20, 26) }}>{"\u2728"}</Text>
            </View>
            <View>
              <Text style={[styles.aiTitle, { fontSize: sp(14, 18) }]}>AI-{"\u0413\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044f"}</Text>
              <Text style={[styles.aiSub, { fontSize: sp(10, 13) }]}>{"\u0421\u043a\u043e\u0440\u043e"}</Text>
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
    paddingBottom: 12,
  },
  title: {
    fontWeight: '700',
    letterSpacing: 8,
    color: '#2c2c2c',
    textTransform: 'uppercase',
  },
  subtitle: {
    letterSpacing: 5,
    color: '#2c2c2c',
    opacity: 0.4,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  tab: {
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  tabText: {
    color: '#2c2c2c',
    opacity: 0.4,
    letterSpacing: 1,
  },
  tabTextActive: {
    opacity: 1,
  },
  list: {
    paddingTop: 10,
    alignSelf: 'center',
    width: '100%',
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(120,80,200,0.2)',
    backgroundColor: 'rgba(120,80,200,0.05)',
    opacity: 0.4,
  },
  aiIcon: {
    borderRadius: 11,
    backgroundColor: 'rgba(120,80,200,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(120,80,200,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTitle: { color: '#2c2c2c', letterSpacing: 1 },
  aiSub: { color: '#2c2c2c', opacity: 0.5, marginTop: 1 },
});
