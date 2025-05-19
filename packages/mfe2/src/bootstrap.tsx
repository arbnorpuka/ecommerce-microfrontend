import React from 'react';
import { createRoot } from 'react-dom/client';
import ShoppingCart from './components/ShoppingCart';

const mount = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element not found');
  }
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ShoppingCart />
    </React.StrictMode>
  );
};

mount(); 