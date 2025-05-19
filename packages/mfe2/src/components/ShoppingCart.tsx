import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, theme, eventBus } from '@microfrontend-example/shared';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartContainer = styled.div`
  padding: ${theme.spacing.lg};
`;

const CartTitle = styled.h2`
  margin: 0 0 ${theme.spacing.lg};
  color: ${theme.colors.dark};
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.light};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.white};
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: ${theme.typography.fontSize.medium};
  color: ${theme.colors.dark};
`;

const ItemPrice = styled.p`
  margin: ${theme.spacing.xs} 0 0;
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-left: ${theme.spacing.lg};
`;

const QuantityButton = styled(Button)`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  min-width: 32px;
`;

const QuantityText = styled.span`
  font-size: ${theme.typography.fontSize.medium};
  font-weight: 500;
  min-width: 24px;
  text-align: center;
`;

const CartSummary = styled.div`
  margin-top: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.light};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.white};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  
  &:last-child {
    margin-top: ${theme.spacing.md};
    padding-top: ${theme.spacing.md};
    border-top: 1px solid ${theme.colors.light};
    font-weight: 600;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.secondary};
  font-size: ${theme.typography.fontSize.large};
`;

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleAddToCart = (product: any) => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    };

    const unsubscribe = eventBus.subscribe('ADD_TO_CART', handleAddToCart);
    return () => unsubscribe();
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
      {cartItems.length === 0 ? (
        <EmptyCart>Your cart is empty</EmptyCart>
      ) : (
        <>
          <CartList>
            {cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                </ItemInfo>
                <ItemQuantity>
                  <QuantityButton
                    variant="secondary"
                    size="small"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityText>{item.quantity}</QuantityText>
                  <QuantityButton
                    variant="secondary"
                    size="small"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </QuantityButton>
                </ItemQuantity>
              </CartItem>
            ))}
          </CartList>
          <CartSummary>
            <SummaryRow>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </SummaryRow>
          </CartSummary>
        </>
      )}
    </CartContainer>
  );
};

export default ShoppingCart; 