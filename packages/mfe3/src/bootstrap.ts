import { createApp } from 'vue';
import Checkout from './Checkout.vue';

const mount = (el: Element) => {
  const app = createApp(Checkout);
  app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#checkout');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount }; 