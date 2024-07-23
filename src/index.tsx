import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './pages/App';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
