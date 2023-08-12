import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import './styles/shared.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

postMessage({ payload: 'removeLoading' }, '*');
