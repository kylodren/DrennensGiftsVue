<script setup>
const emit = defineEmits(['navigate-to-lighthouses'])
</script>

<template>
  <div class="container">
    <header class="hero-header">
      <h1>Drennen's Gifts</h1>
      <p class="subtitle">Premium Collectibles & Unique Gifts</p>
    </header>

    <div class="main-content">
      <div class="welcome-text">
        <p>Welcome to Drennen's Gifts, your premier destination for high-quality collectibles and unique gifts. We specialize in beautifully crafted replicas and memorabilia that celebrate history and bring timeless charm to your home.</p>
      </div>

      <div class="store-section">
        <h2 class="store-title">
          <img src="/concord-lighthouse-icon.svg" alt="Lighthouse" class="lighthouse-icon"> 
          Lighthouse Collection
        </h2>
        <img src="/SmallLighthouseWithCannon.jpg" alt="Lighthouse Collection Preview" class="lighthouse-preview">
        <p class="store-description">
          Discover our exquisite collection of LED lighthouse replicas, featuring authentic details of historic landmarks. Each piece is carefully crafted to capture the coastal beauty that has guided sailors for generations.
        </p>
        <button @click="$emit('navigate-to-lighthouses')" class="store-link">
          Explore Lighthouse Collection →
        </button>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2025 Drennen's Gifts. All rights reserved. | Bringing History Home</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem 0;
  margin: 2rem 0;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #2c3e50;
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 2rem;
}

.main-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 2rem 0;
}

.welcome-text {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.store-section {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  margin: 2rem 0;
  color: white;
}

.store-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.lighthouse-icon {
  width: 2.5rem;
  height: 2.5rem;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}

.store-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.store-link {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.store-link:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.footer {
  text-align: center;
  padding: 2rem 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.lighthouse-preview {
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  margin: 2rem auto;
  display: block;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .main-content {
    padding: 2rem;
  }
  
  .store-section {
    padding: 2rem;
  }
  
  .store-title {
    font-size: 2rem;
  }
}
</style>