import ReactDOM from 'react-dom/client';
import '../style.css';
import WorksWheelDemo from '../demo';

const container = document.getElementById('react-facilities-showcase');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<WorksWheelDemo />);
}
