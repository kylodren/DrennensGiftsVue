<script setup>
import { ref } from 'vue'
import HomePage from './views/HomePage.vue'
import LighthouseCatalog from './views/LighthouseCatalog.vue'
import Cart from './components/Cart.vue'
import PayPalLoader from './components/PayPalLoader.vue'
import { useCartStore } from './stores/cart'
import { useConfigStore } from './stores/config'

const cartStore = useCartStore()
const configStore = useConfigStore()

const currentView = ref('home') // 'home' or 'lighthouse'
const showCart = ref(false)

const navigateToLighthouses = () => {
  currentView.value = 'lighthouse'
}

const navigateToHome = () => {
  currentView.value = 'home'
}

const toggleCart = () => {
  showCart.value = !showCart.value
}
</script>

<template>
  <div id="app">
    <!-- PayPal SDK Loader -->
    <PayPalLoader />
    
    <!-- Navigation Header -->
    <nav class="nav-header">
      <div class="nav-container">
        <div class="nav-brand" @click="navigateToHome">
          <h2>Drennen's Gifts</h2>
        </div>
        <div class="nav-actions">
          <div v-if="configStore.environment === 'sandbox'" class="sandbox-indicator">
            🧪 SANDBOX
          </div>
          <button @click="toggleCart" class="cart-button">
            🛒 Cart ({{ cartStore.totalItems }})
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <HomePage v-if="currentView === 'home'" @navigate-to-lighthouses="navigateToLighthouses" />
      <LighthouseCatalog v-else-if="currentView === 'lighthouse'" @navigate-to-home="navigateToHome" />
    </main>

    <!-- Cart Sidebar -->
    <Cart v-if="showCart" @close="toggleCart" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Georgia', serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.nav-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  cursor: pointer;
}

.nav-brand h2 {
  color: #2c3e50;
  font-size: 2rem;
}

.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.sandbox-indicator {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 3px 10px rgba(255, 107, 53, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cart-button {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.cart-button:hover {
  background: linear-gradient(135deg, #2980b9 0%, #1f639a 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .nav-brand h2 {
    font-size: 1.5rem;
  }
  
  .cart-button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
