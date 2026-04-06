import { useRef, useState, useCallback } from 'react';
import { RotateCcw, RotateCw, Download, Trash2, RefreshCcw, Smartphone, Monitor } from 'lucide-react';

export default function ImageEditor({ imageSrc, fileName, rotation, onRotateLeft, onRotateRight, onReset, onClear }) {
  const canvasRef = useRef(null);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });

  const handleImgLoad = useCallback((e) => {
    setImgNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }, []);

  // Determine if the image (at current rotation) is portrait or landscape
  const normAngle = ((rotation % 360) + 360) % 360;
  const isSwapped = normAngle === 90 || normAngle === 270;
  const effectiveW = isSwapped ? imgNatural.h : imgNatural.w;
  const effectiveH = isSwapped ? imgNatural.w : imgNatural.h;
  const currentOrientation = effectiveW >= effectiveH ? 'Landscape' : 'Portrait';



  const handleDownload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const angle = ((rotation % 360) + 360) % 360;
      const swapped = angle === 90 || angle === 270;
      canvas.width = swapped ? img.height : img.width;
      canvas.height = swapped ? img.width : img.height;

      const ctx = canvas.getContext('2d');
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const link = document.createElement('a');
      const ext = fileName.split('.').pop().toLowerCase();
      link.download = `rotated_${fileName.replace(`.${ext}`, '')}.${ext}`;
      link.href = canvas.toDataURL(`image/${ext === 'jpg' ? 'jpeg' : ext}`);
      link.click();
    };
    img.src = imageSrc;
  };

  return (
    <div className="editor-container">
      <div className="image-preview-wrapper">
        <img
          src={imageSrc}
          alt="Preview"
          className="image-preview"
          style={{ transform: `rotate(${rotation}deg)` }}
          onLoad={handleImgLoad}
        />
      </div>

      {/* Status row */}
      <div className="status-row">
        <div className="rotation-badge">{normAngle}°</div>
        <div className="orientation-badge">
          {currentOrientation === 'Portrait' ? <Smartphone size={14} /> : <Monitor size={14} />}
          {currentOrientation}
        </div>
        {imgNatural.w > 0 && (
          <div className="dimension-badge">
            {effectiveW} × {effectiveH}px
          </div>
        )}
      </div>

      {/* Rotation controls */}
      <div className="controls-section">
        <p className="controls-label">Rotate</p>
        <div className="controls">
          <button id="btn-rotate-left" className="btn btn-secondary" onClick={onRotateLeft} title="Rotate Left 90°">
            <RotateCcw size={18} />
            Left 90°
          </button>
          <button id="btn-rotate-right" className="btn btn-secondary" onClick={onRotateRight} title="Rotate Right 90°">
            <RotateCw size={18} />
            Right 90°
          </button>
          <button id="btn-reset" className="btn btn-secondary" onClick={onReset} title="Reset to original">
            <RefreshCcw size={18} />
            Reset
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="controls">
        <button id="btn-download" className="btn btn-success" onClick={handleDownload} title="Download rotated image">
          <Download size={18} />
          Download
        </button>
        <button id="btn-clear" className="btn btn-danger" onClick={onClear} title="Remove image">
          <Trash2 size={18} />
          Remove
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
