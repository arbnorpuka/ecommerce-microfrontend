<template>
  <div class="checkout">
    <div v-if="cartItems.length > 0">
      <h2>Checkout</h2>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <ul>
          <li v-for="item in cartItems" :key="item.id">
            <div class="cart-item-details">
              <img :src="item.image" :alt="item.name" class="cart-item-image" />
              <div>
                <span>{{ item.name }} (x{{ item.quantity }})</span>
                <p>Price: ${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </li>
        </ul>
        <p class="total-price">Total: ${{ totalPrice.toFixed(2) }}</p>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty. Add items to your cart before proceeding to checkout.</p>
    </div>

    <div class="checkout-form" v-if="cartItems.length > 0">
      <h3>Shipping Information</h3>
      <div class="form-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" v-model="formData.name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <textarea id="address" v-model="formData.address"></textarea>
      </div>
      <button @click="handleSubmit" class="submit-button">Place Order</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, onUnmounted, computed } from 'vue';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface FormData {
  name: string;
  email: string;
  address: string;
}

const CART_STORAGE_KEY = 'microfrontend-cart';

export default defineComponent({
  name: 'Checkout',
  setup() {
    const formData = reactive<FormData>({
      name: '',
      email: '',
      address: '',
    });

    const cartItems = ref<CartItem[]>([]);

    const loadCartFromLocalStorage = () => {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      cartItems.value = savedCart ? JSON.parse(savedCart) : []; 
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        loadCartFromLocalStorage();
      }
    };

    const handleCartClearedByProvider = () => {
        loadCartFromLocalStorage();
    };

    onMounted(() => {
      loadCartFromLocalStorage();
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('cartStateChangedByProvider', handleCartClearedByProvider);
    });

    onUnmounted(() => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartStateChangedByProvider', handleCartClearedByProvider);
    });

    const totalPrice = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    const handleSubmit = () => {
      if (cartItems.value.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      
      window.dispatchEvent(new CustomEvent('cartClearedByCheckout'));
      
      formData.name = '';
      formData.email = '';
      formData.address = '';

      alert('Order placed successfully! Cart will be cleared.');
      
      loadCartFromLocalStorage();
    };

    return {
      formData,
      cartItems,
      totalPrice,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.checkout {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: flex-start;
}

.cart-summary {
  flex: 1;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.cart-summary h3 {
  margin-top: 0;
  color: #333;
}

.cart-summary ul {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.cart-summary li {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.cart-summary li:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.cart-item-details {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-item-details span {
  font-weight: bold;
  display: block;
}

.cart-item-details p {
  margin: 4px 0 0;
  font-size: 0.9em;
  color: #555;
}

.total-price {
  font-size: 1.2em;
  font-weight: bold;
  text-align: right;
  margin-top: 15px;
  color: #333;
}

.checkout-form {
  flex: 1.5;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9; 
}

.checkout-form h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #444;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

textarea {
  min-height: 80px;
}

.submit-button {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.submit-button:hover {
  background-color: #45a049;
}
</style> 