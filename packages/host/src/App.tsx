import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@microfrontend-example/shared';

// Lazy load microfrontends
const ProductCatalog = React.lazy(() => import('mfe1/ProductCatalog'));
const ShoppingCart = React.lazy(() => import('mfe2/ShoppingCart'));

const AppContainer = styled.div`
  font-family: ${theme.typography.fontFamily};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.light};
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadingFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: ${theme.typography.fontSize.large};
  color: ${theme.colors.secondary};
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header>
        <h1>Microfrontend Example</h1>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </Nav>
      </Header>

      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Routes>
          <Route path="/" element={<div>Welcome to the Microfrontend Example!</div>} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
};

export default App; 