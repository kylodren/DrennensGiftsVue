<script setup>
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

const emit = defineEmits(['navigate-to-home'])
const productsStore = useProductsStore()

const lighthouseProducts = productsStore.getProductsByCategory('lighthouse')
</script>

<template>
  <div class="container">
    <header class="catalog-header">
      <button @click="$emit('navigate-to-home')" class="back-link">
        ← Back to Drennen's Gifts
      </button>
      <h1>
        <img src="/concord-lighthouse-icon.svg" alt="Lighthouse" class="lighthouse-icon">
        Lighthouse Collection
      </h1>
      <p class="subtitle">Authentic LED Lighthouse Replicas</p>
    </header>

    <div class="intro-text">
      <p>Welcome to our exclusive Lighthouse Collection featuring meticulously crafted replicas of the historic Concord Lighthouse in Havre de Grace, Maryland. Each lighthouse is equipped with LED lighting and includes a detailed replica of the famous John O'Neill Battery cannon, bringing maritime history to life in your home.</p>
    </div>

    <div class="products-grid">
      <ProductCard 
        v-for="product in lighthouseProducts" 
        :key="product.id"
        :product="product"
      />
    </div>

    <footer class="footer">
      <p>&copy; 2025 Drennen's Gifts. All rights reserved. | Bringing Maritime History Home</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.catalog-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem 0;
  margin: 2rem 0;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.back-link {
  display: inline-block;
  color: #3498db;
  background: none;
  border: none;
  margin-bottom: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #2980b9;
}

h1 {
  color: #2c3e50;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.lighthouse-icon {
  width: 3rem;
  height: 3rem;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1rem;
}

.intro-text {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
}

.products-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 3rem 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.footer {
  text-align: center;
  padding: 2rem 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .products-grid {
    gap: 2rem;
  }
}
</style>