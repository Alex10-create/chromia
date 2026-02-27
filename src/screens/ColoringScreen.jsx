import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import SVGCanvas from '../components/SVGCanvas';
import Toolbar from '../components/Toolbar';
import ColorPalette from '../components/ColorPalette';
import { CATEGORIES, getGenerator } from '../generators';
import { useHistory } from '../hooks/useHistory';
import { usePersistence } from '../hooks/usePersistence';
import { exportToGallery } from '../utils/export';
import { addToGallery } from '../utils/storage';

export default function ColoringScreen({ layout, catId, imgIdx, onBack }) {
  const cat = useMemo(() => CATEGORIES.find(c => c.id === catId), [catId]);
  const paths = useMemo(() => {
    const gen = getGenerator(cat?.gen);
    return gen ? gen(imgIdx) : [];
  }, [cat, imgIdx]);

  const [color, setColor] = useState('#FF6B6B');
  const [palette, setPalette] = useState('sunset');
  const [tool, setTool] = useState('fill');
  const [showExport, setShowExport] = useState(false);

  const { filled, applyFill, undo, redo, canUndo, canRedo, reset } = useHistory({});
  const canvasRef = useRef(null);

  const handleLoad = useCallback((savedFilled, savedPalette) => {
    reset(savedFilled);
    if (savedPalette) setPalette(savedPalette);
  }, [reset]);

  const { saveNow } = usePersistence(catId, imgIdx, filled, palette, handleLoad);

  const handlePaint = useCallback((pathId) => {
    if (tool === 'eraser') {
      applyFill(pathId, null);
    } else {
      applyFill(pathId, color);
    }
  }, [tool, color, applyFill]);

  const handleBack = useCallback(() => {
    saveNow();
    onBack();
  }, [saveNow, onBack]);

  const handleExport = useCallback(async (format) => {
    setShowExport(false);
    saveNow();
    const uri = await exportToGallery(canvasRef, { format, quality: format === 'png' ? 1 : 0.95 });
    if (uri) {
      addToGallery(catId, imgIdx, uri);
    }
  }, [canvasRef, catId, imgIdx, saveNow]);

  const isLandscapeSidebar = layout.isLandscape && !layout.isSplitView;

  if (!cat) return null;

  return (
    <View style={styles.root}>
      {/* Toolbar */}
      <Toolbar
        tool={tool}
        setTool={setTool}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onExport={() => setShowExport(true)}
        onPrev={null}
        onNext={null}
        canGoPrev={false}
        canGoNext={false}
        catEmoji={cat.emoji}
        imgIdx={imgIdx}
        imgCount={cat.count}
      />

      {/* Back button row */}
      <View style={styles.backRow}>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backText}>{"\u2190"} {cat.name}</Text>
        </Pressable>
      </View>

      {/* Main content: canvas + palette */}
      <View style={[styles.content, isLandscapeSidebar && styles.contentRow]}>
        {/* Canvas */}
        <View style={styles.canvasWrap}>
          <SVGCanvas
            paths={paths}
            filled={filled}
            onPathPress={handlePaint}
            size={layout.canvasSize}
            categoryColor={cat.color}
            canvasRef={canvasRef}
          />
        </View>

        {/* Palette */}
        <ColorPalette
          palette={palette}
          setPalette={setPalette}
          color={color}
          setColor={setColor}
          setTool={setTool}
          horizontal={isLandscapeSidebar}
        />
      </View>

      {/* Export Modal */}
      <Modal visible={showExport} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setShowExport(false)}>
          <View style={styles.modal}>
            <Text style={styles.modalIcon}>{"\ud83d\udcbe"}</Text>
            <Text style={styles.modalTitle}>{"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"}</Text>
            <Text style={styles.modalSub}>{"\u0421\u043a\u0430\u0447\u0430\u0439\u0442\u0435 \u0432\u0430\u0448\u0443 \u0440\u0430\u0431\u043e\u0442\u0443 \u0432 \u0432\u044b\u0441\u043e\u043a\u043e\u043c \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435"}</Text>

            <Pressable onPress={() => handleExport('png')} style={[styles.exportBtn, styles.exportPng]}>
              <Text style={styles.exportPngText}>{"\ud83d\udcf7"} PNG {"\u2014"} {"\u0412\u044b\u0441\u043e\u043a\u043e\u0435 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e"}</Text>
            </Pressable>

            <Pressable onPress={() => handleExport('jpg')} style={[styles.exportBtn, styles.exportJpg]}>
              <Text style={styles.exportJpgText}>{"\ud83d\uddbc\ufe0f"} JPG {"\u2014"} {"\u041a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439"}</Text>
            </Pressable>

            <Pressable onPress={() => setShowExport(false)}>
              <Text style={styles.closeText}>{"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0e0e1c',
  },
  backRow: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 13, color: '#f0e6d3', opacity: 0.6 },
  content: {
    flex: 1,
  },
  contentRow: {
    flexDirection: 'row',
  },
  canvasWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  // Export modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#1a1a3e',
    borderRadius: 22,
    padding: 28,
    maxWidth: 300,
    width: '88%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  modalIcon: { fontSize: 30, marginBottom: 10 },
  modalTitle: { fontSize: 17, color: '#f0e6d3', letterSpacing: 2, marginBottom: 6 },
  modalSub: { fontSize: 11, color: '#f0e6d3', opacity: 0.45, marginBottom: 22, lineHeight: 18, textAlign: 'center' },
  exportBtn: {
    padding: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  exportPng: {
    backgroundColor: 'rgba(120,200,170,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(120,200,170,0.3)',
  },
  exportPngText: { fontSize: 14, color: '#78c8aa', letterSpacing: 0.5 },
  exportJpg: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  exportJpgText: { fontSize: 14, color: '#f0e6d3', letterSpacing: 0.5 },
  closeText: { marginTop: 14, fontSize: 12, color: '#f0e6d3', opacity: 0.35 },
});
