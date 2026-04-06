import { useRef, useState, useCallback, useEffect } from 'react';
import { RotateCcw, RotateCw, Download, Trash2, RefreshCcw, Smartphone, Monitor, FlipHorizontal, FlipVertical } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const canvasRef = useRef(null);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImgLoad = useCallback((e) => {
    setImgNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }, []);

  // Determine if the image (at current rotation) is portrait or landscape
  const normAngle = ((rotation % 360) + 360) % 360;
  const isSwapped = (normAngle > 45 && normAngle < 135) || (normAngle > 225 && normAngle < 315);
  const effectiveW = isSwapped ? imgNatural.h : imgNatural.w;
  const effectiveH = isSwapped ? imgNatural.w : imgNatural.h;
  const currentOrientation = effectiveW >= effectiveH ? 'Landscape' : 'Portrait';

  const handleDownload = () => {
    setIsProcessing(true);
    
    // Simulate processing time for the shimmer effect
    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const angle = rotation;
        const rad = (angle * Math.PI) / 180;
        
        // Calculate new dimensions after rotation
        const absCos = Math.abs(Math.cos(rad));
        const absSin = Math.abs(Math.sin(rad));
        const newW = img.width * absCos + img.height * absSin;
        const newH = img.width * absSin + img.height * absCos;

        canvas.width = newW;
        canvas.height = newH;

        const ctx = canvas.getContext('2d');
        
        // Move to center, rotate, scale (flip), then draw
        ctx.translate(newW / 2, newH / 2);
        ctx.rotate(rad);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        const link = document.createElement('a');
        const ext = fileName.split('.').pop().toLowerCase();
        link.download = `edited_${fileName.replace(`.${ext}`, '')}.${ext === 'jpg' ? 'jpg' : 'png'}`;
        link.href = canvas.toDataURL(ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png', 0.95);
        link.click();
        
        setIsProcessing(false);
        
        // Trigger confetti celebration
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#2563eb', '#60a5fa', '#ffffff']
        });
      };
      img.src = imageSrc;
    }, 800);
  };

  return (
    <div className="editor-container">
      <div className={`image-preview-wrapper ${isProcessing ? 'processing' : ''}`}>
        <img
          src={imageSrc}
          alt="Preview"
          className="image-preview"
          style={{ 
            transform: `rotate(${rotation}deg) scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` 
          }}
          onLoad={handleImgLoad}
        />
        {isProcessing && <div className="shimmer-overlay" />}
      </div>

      {/* Status row */}
      <div className="status-row">
        <div className="rotation-badge">{Math.round(normAngle)}°</div>
        <div className="orientation-badge">
          {currentOrientation === 'Portrait' ? <Smartphone size={14} /> : <Monitor size={14} />}
          {currentOrientation}
        </div>
        {imgNatural.w > 0 && (
          <div className="dimension-badge">
            {Math.round(effectiveW)} × {Math.round(effectiveH)}px
          </div>
        )}
      </div>

      {/* Transform section (Flip + 90deg Rotate) */}
      <div className="controls-section">
        <p className="controls-label">Transform</p>
        <div className="controls">
          <button 
            className={`btn btn-secondary ${flipH ? 'active' : ''}`} 
            onClick={onToggleFlipH} 
            title="Flip Horizontal"
          >
            <FlipHorizontal size={18} />
            Flip H
          </button>
          <button 
            className={`btn btn-secondary ${flipV ? 'active' : ''}`} 
            onClick={onToggleFlipV} 
            title="Flip Vertical"
          >
            <FlipVertical size={18} />
            Flip V
          </button>
          <button className="btn btn-secondary" onClick={onRotateLeft} title="Rotate Left 90°">
            <RotateCcw size={18} />
            -90°
          </button>
          <button className="btn btn-secondary" onClick={onRotateRight} title="Rotate Right 90°">
            <RotateCw size={18} />
            +90°
          </button>
        </div>
      </div>

      {/* Fine Rotation Slider */}
      <div className="controls-section">
        <p className="controls-label">Fine Rotation</p>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={normAngle}
            onChange={(e) => onSetRotation(parseInt(e.target.value))}
            className="rotation-slider"
          />
          <div className="slider-ticks">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
            <span>270°</span>
            <span>360°</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="controls">
        <button 
          id="btn-download" 
          className="btn btn-success" 
          onClick={handleDownload} 
          disabled={isProcessing}
          title="Download edited image"
        >
          <Download size={18} />
          {isProcessing ? 'Processing...' : 'Download'}
        </button>
        <button 
          id="btn-reset" 
          className="btn btn-secondary" 
          onClick={onReset} 
          disabled={isProcessing}
          title="Reset all transforms"
        >
          <RefreshCcw size={18} />
          Reset
        </button>
        <button 
          id="btn-clear" 
          className="btn btn-danger" 
          onClick={onClear} 
          disabled={isProcessing}
          title="Remove image"
        >
          <Trash2 size={18} />
          Remove
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
