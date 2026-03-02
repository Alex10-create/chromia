import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function ToolBtn({ icon, label, active, onPress, disabled, color, sp }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        { paddingHorizontal: sp(10, 16), paddingVertical: sp(6, 10), gap: sp(4, 6) },
        active && styles.btnActive,
        color && { backgroundColor: `${color}14`, borderColor: `${color}35` },
      ]}
    >
      <Text style={[{ fontSize: sp(14, 18), color: '#2c2c2c' }, disabled && styles.disabled]}>{icon}</Text>
      {label ? <Text style={[{ fontSize: sp(10, 13), color: '#2c2c2c', opacity: 0.6 }, disabled && styles.disabled]}>{label}</Text> : null}
    </Pressable>
  );
}

export default function Toolbar({
  tool, setTool, onUndo, onRedo, canUndo, canRedo,
  onExport, onPrev, onNext, canGoPrev, canGoNext,
  catEmoji, imgIdx, imgCount, sp,
}) {
  return (
    <View style={[styles.bar, { paddingHorizontal: sp(8, 16), paddingVertical: sp(5, 10) }]}>
      <View style={[styles.group, { gap: sp(4, 8) }]}>
        <ToolBtn icon={"\u25c1"} onPress={onPrev} disabled={!canGoPrev} sp={sp} />
        <Text style={[styles.counter, { fontSize: sp(11, 14), minWidth: sp(60, 80), paddingHorizontal: sp(6, 10) }]}>{catEmoji} {(imgIdx || 0) + 1}/{imgCount}</Text>
        <ToolBtn icon={"\u25b7"} onPress={onNext} disabled={!canGoNext} sp={sp} />
      </View>

      <View style={[styles.group, { gap: sp(4, 8) }]}>
        <ToolBtn
          icon={"\ud83e\udea3"}
          label={"\u0417\u0430\u043b\u0438\u0432\u043a\u0430"}
          active={tool === 'fill'}
          onPress={() => setTool('fill')}
          sp={sp}
        />
        <ToolBtn
          icon={"\ud83e\uddf9"}
          label={"\u041b\u0430\u0441\u0442\u0438\u043a"}
          active={tool === 'eraser'}
          onPress={() => setTool('eraser')}
          sp={sp}
        />
      </View>

      <View style={[styles.group, { gap: sp(4, 8) }]}>
        <ToolBtn icon={"\u21a9"} onPress={onUndo} disabled={!canUndo} sp={sp} />
        <ToolBtn icon={"\u21aa"} onPress={onRedo} disabled={!canRedo} sp={sp} />
        <ToolBtn icon={"\ud83d\udcbe"} onPress={onExport} color="#1a8a5a" sp={sp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  btnActive: {
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  disabled: { opacity: 0.2 },
  counter: {
    color: '#2c2c2c',
    opacity: 0.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
