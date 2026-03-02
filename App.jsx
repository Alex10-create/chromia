import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ColoringScreen from './src/screens/ColoringScreen';
import { useLayout } from './src/hooks/useLayout';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [catId, setCatId] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const layout = useLayout();

  const goHome = useCallback(() => setScreen('home'), []);

  const goGallery = useCallback((id) => {
    setCatId(id);
    setScreen('gallery');
  }, []);

  const goColor = useCallback((id, idx) => {
    setCatId(id);
    setImgIdx(idx);
    setScreen('color');
  }, []);

  return (
    <View style={styles.root} onLayout={layout.onLayout}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
      {screen === 'home' && (
        <HomeScreen
          layout={layout}
          onSelectCategory={goGallery}
          onSelectImage={goColor}
        />
      )}
      {screen === 'gallery' && (
        <GalleryScreen
          layout={layout}
          catId={catId}
          onSelectImage={goColor}
          onBack={goHome}
        />
      )}
      {screen === 'color' && (
        <ColoringScreen
          layout={layout}
          catId={catId}
          imgIdx={imgIdx}
          onBack={() => goGallery(catId)}
        />
      )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#faf6f0',
  },
  safe: {
    flex: 1,
    paddingTop: 20,
  },
});
