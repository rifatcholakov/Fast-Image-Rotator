import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './index.css';
import ImageUploader from './components/ImageUploader';
import ImageEditor from './components/ImageEditor';

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('image.png');
  const [rotation, setRotation] = useState(0);

  // Default to system preference, fallback to dark
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const handleImageLoad = (dataUrl, name) => {
    setImageSrc(dataUrl);
    setFileName(name || 'image.png');
    setRotation(0);
  };

  const handleRotateLeft = () => setRotation((r) => r - 90);
  const handleRotateRight = () => setRotation((r) => r + 90);
  const handleReset = () => setRotation(0);
  const handleClear = () => {
    setImageSrc(null);
    setRotation(0);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-top">
          <div />
          <h1>Image Rotator</h1>
          <button
            id="btn-theme-toggle"
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <p>Upload an image and rotate it with ease</p>
      </header>

      <main className="glass-panel">
        {!imageSrc ? (
          <ImageUploader onImageLoad={handleImageLoad} />
        ) : (
          <ImageEditor
            imageSrc={imageSrc}
            fileName={fileName}
            rotation={rotation}
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
            onReset={handleReset}
            onClear={handleClear}
          />
        )}
      </main>

      <footer className="footer">
        <p>Free · Fast · Private — images never leave your device</p>
      </footer>
    </div>
  );
}
