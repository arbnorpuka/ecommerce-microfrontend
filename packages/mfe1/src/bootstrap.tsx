import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductCatalog from './components/ProductCatalog';

const mount = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element not found');
  }
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ProductCatalog />
    </React.StrictMode>
  );
};

mount(); 