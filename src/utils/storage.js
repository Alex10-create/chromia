import AsyncStorage from '@react-native-async-storage/async-storage';

const progressKey = (catId, imgIdx) => `chromia:progress:${catId}:${imgIdx}`;
const GALLERY_KEY = 'chromia:gallery';

export async function saveProgress(catId, imgIdx, filled, paletteId) {
  const data = { filled, paletteId, updatedAt: Date.now() };
  await AsyncStorage.setItem(progressKey(catId, imgIdx), JSON.stringify(data));
}

export async function loadProgress(catId, imgIdx) {
  try {
    const raw = await AsyncStorage.getItem(progressKey(catId, imgIdx));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function deleteProgress(catId, imgIdx) {
  await AsyncStorage.removeItem(progressKey(catId, imgIdx));
}

export async function addToGallery(catId, imgIdx, thumbnailUri) {
  const gallery = await loadGallery();
  const filtered = gallery.filter(g => !(g.catId === catId && g.imgIdx === imgIdx));
  filtered.unshift({ catId, imgIdx, thumbnailUri, completedAt: Date.now() });
  await AsyncStorage.setItem(GALLERY_KEY, JSON.stringify(filtered));
}

export async function loadGallery() {
  try {
    const raw = await AsyncStorage.getItem(GALLERY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function deleteFromGallery(catId, imgIdx) {
  const gallery = await loadGallery();
  const filtered = gallery.filter(g => !(g.catId === catId && g.imgIdx === imgIdx));
  await AsyncStorage.setItem(GALLERY_KEY, JSON.stringify(filtered));
}

export async function hasProgress(catId, imgIdx) {
  try {
    const raw = await AsyncStorage.getItem(progressKey(catId, imgIdx));
    if (!raw) return false;
    const data = JSON.parse(raw);
    return data.filled && Object.keys(data.filled).length > 0;
  } catch {
    return false;
  }
}

export async function getAllProgress(catId, count) {
  const keys = Array.from({ length: count }, (_, i) => progressKey(catId, i));
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    const result = {};
    pairs.forEach(([key, value]) => {
      if (value) {
        const data = JSON.parse(value);
        if (data.filled && Object.keys(data.filled).length > 0) {
          const idx = parseInt(key.split(':').pop());
          result[idx] = true;
        }
      }
    });
    return result;
  } catch {
    return {};
  }
}
