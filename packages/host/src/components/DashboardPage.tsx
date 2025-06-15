import React, { Suspense } from 'react';

const ProductCatalog = React.lazy(() => import('mfe1/ProductCatalog'));
const ShoppingCart = React.lazy(() => import('mfe2/ShoppingCart'));
import CheckoutWrapper from './CheckoutWrapper';

const DashboardPage: React.FC = () => (
  <div>
    <h2>Dashboard</h2>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <Suspense fallback={<div>Loading Product Catalog...</div>}>
          <ProductCatalog />
        </Suspense>
      </div>
      <div style={{ flex: 1, minWidth: 300 }}>
        <Suspense fallback={<div>Loading Shopping Cart...</div>}>
          <ShoppingCart />
        </Suspense>
      </div>
    </div>
  </div>
);

export default DashboardPage; 