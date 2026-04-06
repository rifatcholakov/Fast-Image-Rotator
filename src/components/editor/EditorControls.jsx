import React from 'react';
import { FlipHorizontal, FlipVertical, RotateCcw, RotateCw } from 'lucide-react';

export default function EditorControls({ 
  flipH, 
  flipV, 
  normAngle,
  onToggleFlipH, 
  onToggleFlipV, 
  onRotateLeft, 
  onRotateRight, 
  onSetRotation 
}) {
  return (
    <>
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
    </>
  );
}
