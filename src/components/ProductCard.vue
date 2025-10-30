<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addToCart(props.product)
}
</script>

<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image">
    <div class="product-info">
      <h2 class="product-title">{{ product.name }}</h2>
      <div class="product-price">${{ product.price.toFixed(2) }}</div>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-features">
        <h4>Features:</h4>
        <ul>
          <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>
      
      <!-- Add to Cart for all products -->
      <button 
        @click="addToCart" 
        class="buy-button"
      >
        Add to Cart - ${{ product.price.toFixed(2) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: stretch;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-right: 3px solid #3498db;
  flex-shrink: 0;
}

.product-info {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.product-price {
  font-size: 2rem;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 1rem;
}

.product-description {
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: 1rem;
}

.product-features {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.product-features h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.product-features ul {
  list-style: none;
  padding-left: 0;
}

.product-features li {
  color: #555;
  margin-bottom: 0.3rem;
  padding-left: 1rem;
  position: relative;
}

.product-features li::before {
  content: "✓";
  color: #27ae60;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.buy-button {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  margin-top: auto;
}

.buy-button:hover {
  background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

.buy-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
  }
  
  .product-image {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 3px solid #3498db;
  }
  
  .product-info {
    padding: 1.5rem;
  }
  
  .product-title {
    font-size: 1.5rem;
  }
}
</style>