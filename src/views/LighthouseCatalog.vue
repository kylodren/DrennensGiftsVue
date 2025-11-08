<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'
import ComparisonSection from '../components/ComparisonSection.vue'

const emit = defineEmits(['navigate-to-home'])
const productsStore = useProductsStore()

const lighthouseProducts = productsStore.getProductsByCategory('lighthouse')

// Scroll to top when entering the collection
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="container">
    <header class="catalog-header">
      <h1>
        <img src="/concord-lighthouse-icon.svg" alt="Lighthouse" class="lighthouse-icon">
        Concord Lighthouse Collection
      </h1>
      <p class="subtitle">Authentic LED Lighthouse Replicas</p>
    </header>

    <div class="intro-text">
      <p class="intro-main">Welcome to our exclusive Lighthouse Collection featuring meticulously crafted replicas of the historic Concord Lighthouse in Havre de Grace, Maryland. Each lighthouse features LED lighting with multiple color modes and includes a detailed replica of the famous <b>John O'Neill Battery</b> cannon. Choose the perfect size for your space!</p>
      
      <div class="size-highlight">
        <h4>Available in Two Sizes</h4>
      </div>
      
      
    </div>

    <div class="products-grid">
      <ProductCard 
        v-for="product in lighthouseProducts" 
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- New gallery sections -->
    <ComparisonSection />
 
    <footer class="footer">
      <p>&copy; 2025 Drennen's Gifts. All rights reserved.</p>
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

.intro-main {
  margin-bottom: 1.5rem;
}

.size-highlight {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  border: 2px solid #81c784;
}

.size-highlight h3 {
  color: #2e7d32;
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
  font-weight: bold;
}

.size-options {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.size-option {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 140px;
}

.size-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
}

.size-price {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.3rem;
}

.intro-details {
  margin-top: 1.5rem;
  margin-bottom: 0;
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
    font-size: 1.75rem;
    flex-wrap: wrap;
  }
  
  .lighthouse-icon {
    width: 2.5rem;
    height: 2.5rem;
    /* add extra left spacing for the lighthouse icon on small screens */
    margin-left: 1rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .intro-text {
    font-size: 0.95rem;
    padding: 1.5rem;
  }
  
  .size-highlight h3 {
    font-size: 1.2rem;
  }
  
  .size-options {
    gap: 1rem;
  }
  
  .size-option {
    min-width: 120px;
    padding: 0.75rem 1rem;
  }
  
  .size-label {
    font-size: 1rem;
  }
  
  .size-price {
    font-size: 1.15rem;
  }
  
  .products-grid {
    gap: 2rem;
  }
}

</style>