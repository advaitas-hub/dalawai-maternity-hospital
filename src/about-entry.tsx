import ReactDOM from 'react-dom/client';
import '../style.css';
import { AboutHeroSection } from './components/AboutHeroSection';

const container = document.getElementById('react-about-hero');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<AboutHeroSection />);
}
