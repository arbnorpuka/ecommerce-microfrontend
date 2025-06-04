import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, theme, useCart, useNotification } from '@microfrontend-example/shared';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

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

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.large};
  color: ${theme.colors.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.large};
  color: ${theme.colors.danger};
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const maxProducts = 20;
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setDisplayedProducts(data.slice(0, productsPerPage));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextProducts = products.slice(0, nextPage * productsPerPage);
    setDisplayedProducts(nextProducts);
    setPage(nextPage);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
    });
    showNotification(`${product.title} added to cart!`);
  };

  if (loading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  const canLoadMore = displayedProducts.length < Math.min(products.length, maxProducts);

  return (
    <>
      <ProductGrid>
        {displayedProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage 
              src={product.images[0] || 'https://placehold.co/400x300?text=No+Image'} 
              alt={product.title} 
            />
            <ProductName>{product.title}</ProductName>
            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            <Button
              $variant="primary"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </ProductCard>
        ))}
      </ProductGrid>
      {canLoadMore && (
        <LoadMoreContainer>
          <Button
            $variant="secondary"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </LoadMoreContainer>
      )}
    </>
  );
};

export default ProductCatalog; 