import { useRef, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

export default function ImageUploader({ onImageLoad }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onImageLoad(e.target.result, file.name);
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`uploader ${dragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
        id="image-file-input"
      />

      {dragActive ? (
        <ImageIcon className="upload-icon" size={64} />
      ) : (
        <Upload className="upload-icon" size={64} />
      )}

      <p className="upload-text">
        {dragActive ? 'Drop your image here!' : 'Drag & drop an image'}
      </p>
      <p className="upload-subtext">Supports JPG, PNG, GIF, WEBP and more</p>
      <button className="upload-button" type="button" onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}>
        Browse Files
      </button>
    </div>
  );
}
