import { useTheme } from './hooks/useTheme';
import { useImageTransform } from './hooks/useImageTransform';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ImageUploader from './components/ImageUploader';
import ImageEditor from './components/ImageEditor';
import './index.css';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    imageSrc,
    fileName,
    rotation,
    flipH,
    flipV,
    handleImageLoad,
    rotateLeft,
    rotateRight,
    setExactRotation,
    toggleFlipH,
    toggleFlipV,
    resetTransforms,
    clearImage,
  } = useImageTransform();

  return (
    <div className="app-container">
      <Header theme={theme} onToggleTheme={toggleTheme} />

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
            onRotateLeft={rotateLeft}
            onRotateRight={rotateRight}
            onSetRotation={setExactRotation}
            onToggleFlipH={toggleFlipH}
            onToggleFlipV={toggleFlipV}
            onReset={resetTransforms}
            onClear={clearImage}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
