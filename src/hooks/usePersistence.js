import { useEffect, useRef, useCallback } from 'react';
import { saveProgress, loadProgress } from '../utils/storage';

export function usePersistence(catId, imgIdx, filled, paletteId, onLoad) {
  const timerRef = useRef(null);
  const loadedRef = useRef(false);

  // Load saved progress on mount / image change
  useEffect(() => {
    loadedRef.current = false;
    if (catId == null || imgIdx == null) return;

    loadProgress(catId, imgIdx).then(data => {
      if (data && data.filled && Object.keys(data.filled).length > 0) {
        onLoad(data.filled, data.paletteId);
      }
      loadedRef.current = true;
    });
  }, [catId, imgIdx]);

  // Debounced auto-save
  const save = useCallback(() => {
    if (!loadedRef.current) return;
    if (catId == null || imgIdx == null) return;
    if (!filled || Object.keys(filled).length === 0) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveProgress(catId, imgIdx, filled, paletteId);
    }, 2000);
  }, [catId, imgIdx, filled, paletteId]);

  useEffect(() => {
    save();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [save]);

  // Immediate save (for exit / export)
  const saveNow = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (catId == null || imgIdx == null) return;
    if (filled && Object.keys(filled).length > 0) {
      saveProgress(catId, imgIdx, filled, paletteId);
    }
  }, [catId, imgIdx, filled, paletteId]);

  return { saveNow };
}
