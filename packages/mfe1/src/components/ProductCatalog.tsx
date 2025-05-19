import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, theme, eventBus } from '@microfrontend-example/shared';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    description: 'This is a sample product description.',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 149.99,
    description: 'Another sample product description.',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 199.99,
    description: 'Yet another sample product description.',
    image: 'https://via.placeholder.com/200',
  },
];

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
`;

const ProductCard = styled.div`
  border: 1px solid ${theme.colors.light};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.small};
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: ${theme.typography.fontSize.large};
  color: ${theme.colors.dark};
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: ${theme.typography.fontSize.medium};
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const ProductDescription = styled.p`
  margin: 0;
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.secondary};
`;

const ProductCatalog: React.FC = () => {
  const [products] = useState<Product[]>(sampleProducts);

  const handleAddToCart = (product: Product) => {
    eventBus.publish('ADD_TO_CART', product);
  };

  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={product.image} alt={product.name} />
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          <Button
            variant="primary"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </ProductCard>
      ))}
    </ProductGrid>
  );
};

export default ProductCatalog; 