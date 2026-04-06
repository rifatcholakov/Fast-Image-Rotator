import { Sun, Moon } from 'lucide-react';
import { THEMES } from '../../utils/constants.js';

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-top">
        <div />
        <h1>Fast Image Rotator</h1>
        <button
          id="btn-theme-toggle"
          className="theme-toggle"
          onClick={onToggleTheme}
          title={theme === THEMES.DARK ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {theme === THEMES.DARK ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <p>Professional, private, and precise image rotation in your browser</p>
    </header>
  );
}
