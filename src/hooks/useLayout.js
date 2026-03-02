import { useState, useCallback, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export function useLayout() {
  const window = useWindowDimensions();
  const [size, setSize] = useState({ width: window.width, height: window.height });

  const onLayout = useCallback((e) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  const isLandscape = size.width > size.height;
  const isTablet = Math.min(size.width, size.height) >= 600;
  const isSplitView = size.width < 700 && isTablet;

  // Scaling helper: returns tablet value on iPad, phone value otherwise
  const sp = useCallback((phone, tablet) => isTablet ? tablet : phone, [isTablet]);

  const categoryColumns = isSplitView ? 2 : isLandscape ? 4 : 3;
  const imageColumns = isSplitView ? 3 : isLandscape ? 5 : 4;

  const paletteWidth = isLandscape && !isSplitView ? sp(220, 300) : 0;
  const canvasSize = Math.min(
    size.width - paletteWidth - sp(32, 48),
    size.height - (isLandscape && !isSplitView ? sp(100, 130) : sp(260, 300))
  );

  return {
    width: size.width,
    height: size.height,
    isLandscape,
    isTablet,
    isSplitView,
    sp,
    categoryColumns,
    imageColumns,
    canvasSize: Math.max(canvasSize, 200),
    paletteWidth,
    onLayout,
  };
}
