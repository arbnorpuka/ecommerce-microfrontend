import React from 'react';
import styled from 'styled-components';
import { Button, theme, useCart } from '@microfrontend-example/shared';
import { useNavigate } from 'react-router-dom';

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
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex: 1;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.small};
`;

const ItemDetails = styled.div`
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

const RemoveButton = styled(Button)`
  margin-left: ${theme.spacing.md};
`;

const CheckoutButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${theme.spacing.lg};
`;

const ShoppingCart: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
      {items.length === 0 ? (
        <EmptyCart>Your cart is empty</EmptyCart>
      ) : (
        <>
          <CartList>
            {items.map(item => (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  </ItemDetails>
                </ItemInfo>
                <ItemQuantity>
                  <QuantityButton
                    $variant="secondary"
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityText>{item.quantity}</QuantityText>
                  <QuantityButton
                    $variant="secondary"
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                  <RemoveButton
                    $variant="danger"
                    size="small"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </RemoveButton>
                </ItemQuantity>
              </CartItem>
            ))}
          </CartList>
          <CartSummary>
            <SummaryRow>
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </SummaryRow>
            <CheckoutButtonContainer>
              <Button $variant="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </CheckoutButtonContainer>
          </CartSummary>
        </>
      )}
    </CartContainer>
  );
};

export default ShoppingCart; 