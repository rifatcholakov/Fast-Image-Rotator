import { useRef, useState, useCallback } from 'react';
import { processDownload, normalizeAngle, getEffectiveOrientation } from '../utils/imageUtils.js';
import EditorPreview from './editor/EditorPreview.jsx';
import EditorStatus from './editor/EditorStatus.jsx';
import EditorControls from './editor/EditorControls.jsx';
import EditorActions from './editor/EditorActions.jsx';

export default function ImageEditor({ 
  imageSrc, 
  fileName, 
  rotation, 
  flipH, 
  flipV, 
  onRotateLeft, 
  onRotateRight, 
  onSetRotation, 
  onToggleFlipH, 
  onToggleFlipV, 
  onReset, 
  onClear 
}) {
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImgLoad = useCallback((e) => {
    setImgNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }, []);

  const normAngle = normalizeAngle(rotation);
  const { effectiveW, effectiveH, orientation } = getEffectiveOrientation(
    imgNatural.w, 
    imgNatural.h, 
    rotation
  );

  const handleDownload = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 600));
    await processDownload(imageSrc, fileName, rotation, flipH, flipV);
    setIsProcessing(false);
  };

  return (
    <div className="editor-container">
      <EditorPreview
        imageSrc={imageSrc}
        rotation={rotation}
        flipH={flipH}
        flipV={flipV}
        isProcessing={isProcessing}
        onImgLoad={handleImgLoad}
      />

      <EditorStatus
        normAngle={normAngle}
        effectiveW={effectiveW}
        effectiveH={effectiveH}
        orientation={orientation}
      />

      <EditorControls
        flipH={flipH}
        flipV={flipV}
        normAngle={normAngle}
        onToggleFlipH={onToggleFlipH}
        onToggleFlipV={onToggleFlipV}
        onRotateLeft={onRotateLeft}
        onRotateRight={onRotateRight}
        onSetRotation={onSetRotation}
      />

      <EditorActions
        isProcessing={isProcessing}
        onDownload={handleDownload}
        onReset={onReset}
        onClear={onClear}
      />
    </div>
  );
}
