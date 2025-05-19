import React from 'react';
import { createRoot } from 'react-dom/client';

export const mountRootComponent = (Component: React.ComponentType) => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element not found');
  }
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
}; 