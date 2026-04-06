import { Heart, ExternalLink, ShieldCheck } from 'lucide-react';

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

export default function Footer() {
  return (
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
  );
}
