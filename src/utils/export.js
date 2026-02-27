import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export async function exportToGallery(canvasRef, { format = 'png', quality = 1 } = {}) {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430', '\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0444\u043e\u0442\u043e\u0430\u043b\u044c\u0431\u043e\u043c\u0443 \u0432 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u0445');
    return null;
  }

  try {
    const uri = await captureRef(canvasRef, {
      format,
      quality,
      result: 'tmpfile',
    });
    await MediaLibrary.saveToLibraryAsync(uri);
    Alert.alert('\u0413\u043e\u0442\u043e\u0432\u043e!', '\u0420\u0430\u0441\u043a\u0440\u0430\u0441\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430 \u0432 \u0444\u043e\u0442\u043e\u0430\u043b\u044c\u0431\u043e\u043c');
    return uri;
  } catch (e) {
    Alert.alert('\u041e\u0448\u0438\u0431\u043a\u0430', '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435');
    return null;
  }
}

export async function captureThumbnail(canvasRef) {
  try {
    return await captureRef(canvasRef, {
      format: 'png',
      quality: 0.6,
      width: 200,
      height: 200,
      result: 'tmpfile',
    });
  } catch {
    return null;
  }
}
