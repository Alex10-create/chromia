import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function ToolBtn({ icon, label, active, onPress, disabled, color }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        active && styles.btnActive,
        color && { backgroundColor: `${color}18`, borderColor: `${color}40` },
      ]}
    >
      <Text style={[styles.icon, disabled && styles.disabled]}>{icon}</Text>
      {label ? <Text style={[styles.label, disabled && styles.disabled]}>{label}</Text> : null}
    </Pressable>
  );
}

export default function Toolbar({
  tool, setTool, onUndo, onRedo, canUndo, canRedo,
  onExport, onPrev, onNext, canGoPrev, canGoNext,
  catEmoji, imgIdx, imgCount,
}) {
  return (
    <View style={styles.bar}>
      <View style={styles.group}>
        <ToolBtn icon="\u25c1" onPress={onPrev} disabled={!canGoPrev} />
        <Text style={styles.counter}>{catEmoji} {(imgIdx || 0) + 1}/{imgCount}</Text>
        <ToolBtn icon="\u25b7" onPress={onNext} disabled={!canGoNext} />
      </View>

      <View style={styles.group}>
        <ToolBtn
          icon="\ud83e\udea3"
          label="\u0417\u0430\u043b\u0438\u0432\u043a\u0430"
          active={tool === 'fill'}
          onPress={() => setTool('fill')}
        />
        <ToolBtn
          icon="\ud83e\uddf9"
          label="\u041b\u0430\u0441\u0442\u0438\u043a"
          active={tool === 'eraser'}
          onPress={() => setTool('eraser')}
        />
      </View>

      <View style={styles.group}>
        <ToolBtn icon="\u21a9" onPress={onUndo} disabled={!canUndo} />
        <ToolBtn icon="\u21aa" onPress={onRedo} disabled={!canRedo} />
        <ToolBtn icon="\ud83d\udcbe" onPress={onExport} color="#78c8aa" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.045)',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  btnActive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  icon: { fontSize: 14, color: '#f0e6d3' },
  label: { fontSize: 10, color: '#f0e6d3', opacity: 0.6 },
  disabled: { opacity: 0.2 },
  counter: {
    fontSize: 11,
    color: '#f0e6d3',
    opacity: 0.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 6,
    minWidth: 60,
    textAlign: 'center',
  },
});
