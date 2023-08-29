import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App'; // Import your main App component
import 'bootstrap/dist/css/bootstrap.min.css';
document.addEventListener('DOMContentLoaded', function () {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Element with ID "root" not found.');
  }
});
