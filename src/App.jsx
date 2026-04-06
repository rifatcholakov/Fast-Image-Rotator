import { useState, useEffect } from 'react';
import { Sun, Moon, Heart, ExternalLink, ShieldCheck } from 'lucide-react';
import './index.css';
import ImageUploader from './components/ImageUploader';
import ImageEditor from './components/ImageEditor';

// Custom GitHub Icon since brand logos are removed from newer lucide-react versions
const GithubIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('image.png');
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

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
    setFlipH(false);
    setFlipV(false);
  };

  const handleRotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
  const handleRotateRight = () => setRotation((r) => (r + 90) % 360);
  const handleSetRotation = (angle) => setRotation(angle);
  const toggleFlipH = () => setFlipH((f) => !f);
  const toggleFlipV = () => setFlipV((f) => !f);
  const handleReset = () => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };
  const handleClear = () => {
    setImageSrc(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-top">
          <div />
          <h1>Fast Image Rotator</h1>
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
        <p>Professional, private, and precise image rotation in your browser</p>
      </header>

      <main className="glass-panel">
        {!imageSrc ? (
          <ImageUploader onImageLoad={handleImageLoad} />
        ) : (
          <ImageEditor
            imageSrc={imageSrc}
            fileName={fileName}
            rotation={rotation}
            flipH={flipH}
            flipV={flipV}
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
            onSetRotation={handleSetRotation}
            onToggleFlipH={toggleFlipH}
            onToggleFlipV={toggleFlipV}
            onReset={handleReset}
            onClear={handleClear}
          />
        )}
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a 
            href="https://github.com/rifatcholakov/Fast-Image-Rotator" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link-pill"
          >
            <GithubIcon size={16} />
            View Source
            <ExternalLink size={12} className="external-icon" />
          </a>
          <span className="footer-divider"></span>
          <span className="oss-label">Open Source · MIT License</span>
        </div>
        <div className="footer-credit">
          <p>Made with <Heart size={12} className="heart-icon" /> for the community</p>
          <div className="privacy-pill">
            <ShieldCheck size={14} className="shield-icon" />
            <span><b>100% Private</b> — Processing stays on your device</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
