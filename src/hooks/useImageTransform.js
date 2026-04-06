import { useState, useCallback } from 'react';
import { ROTATION_STEP, DEFAULT_FILENAME } from '../utils/constants.js';

/**
 * Custom hook to manage image transformation state.
 */
export const useImageTransform = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState(DEFAULT_FILENAME);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const handleImageLoad = useCallback((dataUrl, name) => {
    setImageSrc(dataUrl);
    setFileName(name || DEFAULT_FILENAME);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  }, []);

  const rotateLeft = useCallback(() => setRotation((r) => (r - ROTATION_STEP + 360) % 360), []);
  const rotateRight = useCallback(() => setRotation((r) => (r + ROTATION_STEP) % 360), []);
  const setExactRotation = useCallback((angle) => setRotation(angle), []);
  const toggleFlipH = useCallback(() => setFlipH((f) => !f), []);
  const toggleFlipV = useCallback(() => setFlipV((f) => !f), []);

  const resetTransforms = useCallback(() => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  }, []);

  const clearImage = useCallback(() => {
    setImageSrc(null);
    resetTransforms();
  }, [resetTransforms]);

  return {
    imageSrc,
    fileName,
    rotation,
    flipH,
    flipV,
    handleImageLoad,
    rotateLeft,
    rotateRight,
    setExactRotation,
    toggleFlipH,
    toggleFlipV,
    resetTransforms,
    clearImage,
  };
};
