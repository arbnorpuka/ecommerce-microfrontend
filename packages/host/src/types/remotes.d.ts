declare module 'mfe1/ProductCatalog' {
  import { FC } from 'react';
  const ProductCatalog: FC;
  export default ProductCatalog;
}

declare module 'mfe2/ShoppingCart' {
  import { FC } from 'react';
  const ShoppingCart: FC;
  export default ShoppingCart;
}

declare module 'mfe3/Checkout' {
  export const mount: (el: Element) => void;
} 