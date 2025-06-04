import React, { useEffect, useRef } from 'react';

const CheckoutWrapper: React.FC = () => {
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = async () => {
      try {
        const module = await import('mfe3/Checkout');
        if (checkoutRef.current && module.mount) {
          module.mount(checkoutRef.current);
        }
      } catch (error) {
        console.error('Error loading checkout microfrontend:', error);
      }
    };

    mount();

    return () => {
      if (checkoutRef.current) {
        checkoutRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={checkoutRef} />;
};

export default CheckoutWrapper; 