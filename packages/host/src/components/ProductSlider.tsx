import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme, Button, useCart, useNotification } from '@microfrontend-example/shared';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const SliderContainer = styled.div`
  margin: ${theme.spacing.xl} 0;
  position: relative;
`;

const SliderTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xlarge};
  color: ${theme.colors.dark};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} 0;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ProductCard = styled.div`
  flex: 0 0 auto;
  width: 220px;
  border: 1px solid ${theme.colors.light};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.white};
  text-align: center;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.small};
  margin-bottom: ${theme.spacing.sm};
`;

const ProductName = styled.h3`
  font-size: ${theme.typography.fontSize.medium};
  color: ${theme.colors.dark};
  margin: ${theme.spacing.xs} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

const ProductPrice = styled.p`
  font-size: ${theme.typography.fontSize.large};
  color: ${theme.colors.primary};
  font-weight: 600;
  margin: ${theme.spacing.sm} 0;
`;

const ArrowButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: ${theme.spacing.sm} ${theme.spacing.xs};
  height: auto;
  min-width: auto;
  line-height: 1;
  font-size: 1.5rem;

  &.left {
    left: -${theme.spacing.lg};
  }
  &.right {
    right: -${theme.spacing.lg};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductSlider: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch products for slider');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
    });
    showNotification(`${product.title} added to cart!`);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <SliderContainer><p>Loading featured products...</p></SliderContainer>;
  }

  if (error) {
    return <SliderContainer><p>Error loading products: {error}</p></SliderContainer>;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <SliderContainer>
      <SliderTitle>Featured Products</SliderTitle>
      <ArrowButton className="left" $variant="secondary" onClick={() => scroll('left')}>‹</ArrowButton>
      <ScrollWrapper ref={scrollRef}>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <div>
              <ProductImage 
                src={product.images[0] || 'https://placehold.co/400x300?text=No+Image'}
                alt={product.title} 
              />
              <ProductName title={product.title}>{product.title}</ProductName>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            </div>
            <Button 
              $variant="primary" 
              onClick={() => handleAddToCart(product)}
              style={{ marginTop: theme.spacing.sm }}
            >
              Add to Cart
            </Button>
          </ProductCard>
        ))}
      </ScrollWrapper>
      <ArrowButton className="right" $variant="secondary" onClick={() => scroll('right')}>›</ArrowButton>
    </SliderContainer>
  );
};

export default ProductSlider; 