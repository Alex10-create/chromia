import { useState, useCallback, useRef } from 'react';

export function useHistory(initialState = {}) {
  const [filled, setFilled] = useState(initialState);
  const histRef = useRef([initialState]);
  const idxRef = useRef(0);

  const applyFill = useCallback((pathId, color) => {
    const current = histRef.current[idxRef.current];
    const next = { ...current };
    if (color === null) {
      delete next[pathId];
    } else {
      next[pathId] = color;
    }
    histRef.current = histRef.current.slice(0, idxRef.current + 1);
    histRef.current.push(next);
    idxRef.current = histRef.current.length - 1;
    setFilled(next);
    return next;
  }, []);

  const undo = useCallback(() => {
    if (idxRef.current > 0) {
      idxRef.current--;
      const state = histRef.current[idxRef.current];
      setFilled(state);
      return state;
    }
    return null;
  }, []);

  const redo = useCallback(() => {
    if (idxRef.current < histRef.current.length - 1) {
      idxRef.current++;
      const state = histRef.current[idxRef.current];
      setFilled(state);
      return state;
    }
    return null;
  }, []);

  const reset = useCallback((state = {}) => {
    histRef.current = [state];
    idxRef.current = 0;
    setFilled(state);
  }, []);

  return {
    filled,
    applyFill,
    undo,
    redo,
    canUndo: idxRef.current > 0,
    canRedo: idxRef.current < histRef.current.length - 1,
    reset,
  };
}
