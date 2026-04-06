import React from 'react';

export default function EditorPreview({ 
  imageSrc, 
  rotation, 
  flipH, 
  flipV, 
  isProcessing, 
  onImgLoad 
}) {
  return (
    <div className={`image-preview-wrapper ${isProcessing ? 'processing' : ''}`}>
      <img
        src={imageSrc}
        alt="Preview"
        className="image-preview"
        style={{ 
          transform: `rotate(${rotation}deg) scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` 
        }}
        onLoad={onImgLoad}
      />
      {isProcessing && <div className="shimmer-overlay" />}
    </div>
  );
}
