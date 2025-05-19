import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: ReactNode;
}

const getVariantStyles = (variant: ButtonVariant) => css`
  background-color: ${theme.colors[variant]};
  color: ${variant === 'light' ? theme.colors.dark : theme.colors.white};
  border: 1px solid ${theme.colors[variant]};

  &:hover {
    background-color: ${theme.colors[variant]}dd;
  }

  &:active {
    background-color: ${theme.colors[variant]}bb;
  }
`;

const getSizeStyles = (size: ButtonSize) => css`
  padding: ${size === 'small' 
    ? `${theme.spacing.xs} ${theme.spacing.sm}`
    : size === 'medium'
    ? `${theme.spacing.sm} ${theme.spacing.md}`
    : `${theme.spacing.md} ${theme.spacing.lg}`};
  font-size: ${theme.typography.fontSize[size === 'small' ? 'small' : 'medium']};
`;

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.medium};
  font-family: ${theme.typography.fontFamily};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: ${(props: ButtonProps) => props.fullWidth ? '100%' : 'auto'};
  
  ${(props: ButtonProps) => getVariantStyles(props.variant || 'primary')}
  ${(props: ButtonProps) => getSizeStyles(props.size || 'medium')}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
}; 