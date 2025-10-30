<script setup>
import { useCartStore } from '../stores/cart'
import { PayPalService } from '../services/paypal'
import { onMounted, nextTick, watch, ref } from 'vue'
import ConfirmationModal from './ConfirmationModal.vue'

const emit = defineEmits(['close'])
const cartStore = useCartStore()

// Modal state
const showConfirmationModal = ref(false)
const paymentDetails = ref({
  transactionId: '',
  amount: ''
})

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, parseInt(quantity))
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}

const handlePaymentConfirmation = () => {
  cartStore.clearCart()
  showConfirmationModal.value = false
  emit('close')
}

const renderPayPalButton = async () => {
  if (cartStore.items.length === 0) return
  
  await nextTick()
  
  console.log('Attempting to render PayPal button with items:', cartStore.items)
  console.log('PayPal SDK available:', typeof window.paypal !== 'undefined')
  
  PayPalService.renderPayPalButton(
    'paypal-checkout-container',
    cartStore.items,
    (orderData, transaction) => {
      // Store payment details for modal
      paymentDetails.value = {
        transactionId: transaction.id,
        amount: `$${(transaction.amount.value || cartStore.cartTotal)}`
      }
      
      // Show confirmation modal
      showConfirmationModal.value = true
    }
  )
}

// Watch for cart changes and re-render PayPal button
watch(() => cartStore.items, () => {
  renderPayPalButton()
}, { deep: true })

onMounted(() => {
  renderPayPalButton()
})
</script>

<template>
  <div class="cart-overlay" @click="$emit('close')">
    <div class="cart-sidebar" @click.stop>
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button @click="$emit('close')" class="close-button">&times;</button>
      </div>
      
      <div class="cart-content">
        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
        </div>
        
        <div v-else>
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="cart-item-image">
            <div class="cart-item-details">
              <h4>{{ item.name }}</h4>
              <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>
              <div class="quantity-controls">
                <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                <input 
                  type="number" 
                  :value="item.quantity"
                  @input="updateQuantity(item.id, $event.target.value)"
                  min="1"
                >
                <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
              <p class="cart-item-total">Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
            <button @click="removeItem(item.id)" class="remove-button">Remove</button>
          </div>
          
          <div class="cart-summary">
            <div class="total-items">
              <strong>Total Items: {{ cartStore.totalItems }}</strong>
            </div>
            <div class="total-price">
              <strong>Total: ${{ cartStore.cartTotal }}</strong>
            </div>
            <div class="paypal-checkout">
              <div id="paypal-checkout-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Payment Confirmation Modal -->
    <ConfirmationModal
      :show="showConfirmationModal"
      title="Payment Successful! 🎉"
      confirm-text="Continue Shopping"
      @close="showConfirmationModal = false"
      @confirm="handlePaymentConfirmation"
    >
      <template #default>
        <div class="payment-success-details">
          <p><strong>Transaction ID:</strong> {{ paymentDetails.transactionId }}</p>
          <p><strong>Amount Paid:</strong> {{ paymentDetails.amount }}</p>
          <p class="thank-you-message">Thank you for your purchase! Your order has been confirmed and you will receive an email confirmation shortly.</p>
        </div>
      </template>
    </ConfirmationModal>
  </div>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.cart-sidebar {
  background: white;
  width: 400px;
  height: 100vh;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.cart-header h3 {
  color: #2c3e50;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #333;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #999;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  position: relative;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.cart-item-price {
  color: #e74c3c;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.quantity-controls button {
  background: #3498db;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls input {
  width: 60px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.25rem;
}

.cart-item-total {
  color: #555;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
}

.remove-button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  height: fit-content;
  align-self: flex-start;
}

.remove-button:hover {
  background: #c0392b;
}

.cart-summary {
  border-top: 2px solid #eee;
  padding: 1.5rem 1rem;
  background: #f8f9fa;
}

.total-items, .total-price {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.paypal-checkout {
  margin-top: 1rem;
}

#paypal-checkout-container {
  min-height: 50px;
}

@media (max-width: 500px) {
  .cart-sidebar {
    width: 100vw;
  }
}

.payment-success-details {
  text-align: left;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.payment-success-details p {
  margin: 0.75rem 0;
  color: #495057;
}

.payment-success-details strong {
  color: #2c3e50;
}

.thank-you-message {
  margin-top: 1.5rem;
  font-style: italic;
  color: #27ae60 !important;
  font-weight: 500;
}
</style>