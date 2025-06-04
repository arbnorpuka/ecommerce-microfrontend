import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../theme';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background-color: ${theme.colors.success};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  z-index: 1000;
  animation: ${props => props.isVisible ? slideIn : slideOut} 0.3s ease-in-out forwards;
`;

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <NotificationContainer isVisible={isVisible}>
      {message}
    </NotificationContainer>
  );
}; 