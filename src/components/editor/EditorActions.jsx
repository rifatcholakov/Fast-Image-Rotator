import React from 'react';
import { Download, RefreshCcw, Trash2 } from 'lucide-react';

export default function EditorActions({ isProcessing, onDownload, onReset, onClear }) {
  return (
    <div className="controls">
      <button 
        id="btn-download" 
        className="btn btn-success" 
        onClick={onDownload} 
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
  );
}
