<script setup>
import { ref } from 'vue'

const props = defineProps({
  media: {
    type: Array,
    required: true
  },
  alt: {
    type: String,
    default: 'Product media'
  }
})

const currentIndex = ref(0)

const nextMedia = () => {
  currentIndex.value = (currentIndex.value + 1) % props.media.length
}

const prevMedia = () => {
  currentIndex.value = (currentIndex.value - 1 + props.media.length) % props.media.length
}

const goToMedia = (index) => {
  currentIndex.value = index
}

const currentMedia = () => props.media[currentIndex.value]
</script>

<template>
  <div class="carousel">
    <div class="carousel-main">
      <img 
        v-if="currentMedia().type === 'image'"
        :src="currentMedia().url" 
        :alt="`${alt} ${currentIndex + 1}`"
        class="carousel-image"
      />
      
      <video
        v-else
        :src="currentMedia().url"
        class="carousel-video"
        controls
        autoplay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
      
      <button 
        v-if="media.length > 1"
        @click="prevMedia" 
        class="carousel-button prev"
        aria-label="Previous media"
      >
        ‹
      </button>
      
      <button 
        v-if="media.length > 1"
        @click="nextMedia" 
        class="carousel-button next"
        aria-label="Next media"
      >
        ›
      </button>
    </div>
    
    <div v-if="media.length > 1" class="carousel-dots">
      <button
        v-for="(item, index) in media"
        :key="index"
        @click="goToMedia(index)"
        :class="['dot', { active: currentIndex === index }]"
        :aria-label="`Go to ${item.type} ${index + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  position: relative;
}

.carousel-main {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  border-radius: 12px;
  background: #f5f5f5;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.carousel-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 2;
}

.carousel-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #3498db;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease;
}

.dot.active {
  background: #3498db;
}

.dot:hover {
  background: rgba(52, 152, 219, 0.5);
}

@media (max-width: 768px) {
  .carousel-button {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }
  
  .carousel-button.prev {
    left: 5px;
  }
  
  .carousel-button.next {
    right: 5px;
  }
}
</style>
