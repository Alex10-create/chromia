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
  const { sp } = layout;

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
        sp={sp}
      />

      {/* Back button row */}
      <View style={[styles.backRow, { paddingHorizontal: sp(12, 20) }]}>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <Text style={[styles.backText, { fontSize: sp(13, 16) }]}>{"\u2190"} {cat.name}</Text>
        </Pressable>
      </View>

      {/* Main content: canvas + palette */}
      <View style={[styles.content, isLandscapeSidebar && styles.contentRow]}>
        {/* Canvas */}
        <View style={[styles.canvasWrap, { padding: sp(8, 20) }]}>
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
          sp={sp}
        />
      </View>

      {/* Export Modal */}
      <Modal visible={showExport} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setShowExport(false)}>
          <View style={[styles.modal, { maxWidth: sp(300, 420), padding: sp(28, 36) }]}>
            <Text style={[styles.modalIcon, { fontSize: sp(30, 40) }]}>{"\ud83d\udcbe"}</Text>
            <Text style={[styles.modalTitle, { fontSize: sp(17, 21) }]}>{"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"}</Text>
            <Text style={[styles.modalSub, { fontSize: sp(11, 14) }]}>{"\u0421\u043a\u0430\u0447\u0430\u0439\u0442\u0435 \u0432\u0430\u0448\u0443 \u0440\u0430\u0431\u043e\u0442\u0443 \u0432 \u0432\u044b\u0441\u043e\u043a\u043e\u043c \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435"}</Text>

            <Pressable onPress={() => handleExport('png')} style={[styles.exportBtn, styles.exportPng, { padding: sp(13, 18) }]}>
              <Text style={[styles.exportPngText, { fontSize: sp(14, 17) }]}>{"\ud83d\udcf7"} PNG {"\u2014"} {"\u0412\u044b\u0441\u043e\u043a\u043e\u0435 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e"}</Text>
            </Pressable>

            <Pressable onPress={() => handleExport('jpg')} style={[styles.exportBtn, styles.exportJpg, { padding: sp(13, 18) }]}>
              <Text style={[styles.exportJpgText, { fontSize: sp(14, 17) }]}>{"\ud83d\uddbc\ufe0f"} JPG {"\u2014"} {"\u041a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439"}</Text>
            </Pressable>

            <Pressable onPress={() => setShowExport(false)}>
              <Text style={[styles.closeText, { fontSize: sp(12, 15) }]}>{"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"}</Text>
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
    backgroundColor: '#faf6f0',
  },
  backRow: {
    paddingVertical: 4,
  },
  backBtn: { padding: 4 },
  backText: { color: '#2c2c2c', opacity: 0.6 },
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 22,
    width: '88%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  modalIcon: { marginBottom: 10 },
  modalTitle: { color: '#2c2c2c', letterSpacing: 2, marginBottom: 6 },
  modalSub: { color: '#2c2c2c', opacity: 0.45, marginBottom: 22, lineHeight: 20, textAlign: 'center' },
  exportBtn: {
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  exportPng: {
    backgroundColor: 'rgba(40,160,120,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(40,160,120,0.25)',
  },
  exportPngText: { color: '#1a8a5a', letterSpacing: 0.5 },
  exportJpg: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  exportJpgText: { color: '#2c2c2c', letterSpacing: 0.5 },
  closeText: { marginTop: 14, color: '#2c2c2c', opacity: 0.35 },
});
