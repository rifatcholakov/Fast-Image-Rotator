import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { ORIENTATIONS } from '../../utils/constants.js';

export default function EditorStatus({ normAngle, effectiveW, effectiveH, orientation }) {
  return (
    <div className="status-row">
      <div className="rotation-badge">{Math.round(normAngle)}°</div>
      <div className="orientation-badge">
        {orientation === ORIENTATIONS.PORTRAIT ? <Smartphone size={14} /> : <Monitor size={14} />}
        {orientation}
      </div>
      {effectiveW > 0 && (
        <div className="dimension-badge">
          {Math.round(effectiveW)} × {Math.round(effectiveH)}px
        </div>
      )}
    </div>
  );
}
