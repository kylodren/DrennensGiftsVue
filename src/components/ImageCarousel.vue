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
const isLightboxOpen = ref(false)

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

const openLightbox = () => {
  if (currentMedia().type === 'image') {
    isLightboxOpen.value = true
  }
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

const nextInLightbox = () => {
  let nextIdx = (currentIndex.value + 1) % props.media.length
  // Find next image (skip videos)
  while (props.media[nextIdx].type !== 'image' && nextIdx !== currentIndex.value) {
    nextIdx = (nextIdx + 1) % props.media.length
  }
  currentIndex.value = nextIdx
}

const prevInLightbox = () => {
  let prevIdx = (currentIndex.value - 1 + props.media.length) % props.media.length
  // Find previous image (skip videos)
  while (props.media[prevIdx].type !== 'image' && prevIdx !== currentIndex.value) {
    prevIdx = (prevIdx - 1 + props.media.length) % props.media.length
  }
  currentIndex.value = prevIdx
}
</script>

<template>
  <div class="carousel">
    <div class="carousel-main">
      <img 
        v-if="currentMedia().type === 'image'"
        :src="currentMedia().url" 
        :alt="`${alt} ${currentIndex + 1}`"
        class="carousel-image"
        @click="openLightbox"
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
    
    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div v-if="isLightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <button @click="closeLightbox" class="lightbox-close" aria-label="Close lightbox">×</button>
        
        <img 
          :src="currentMedia().url" 
          :alt="`${alt} ${currentIndex + 1}`"
          class="lightbox-image"
          @click.stop
        />
        
        <button 
          v-if="media.filter(m => m.type === 'image').length > 1"
          @click.stop="prevInLightbox" 
          class="lightbox-button prev"
          aria-label="Previous image"
        >
          ‹
        </button>
        
        <button 
          v-if="media.filter(m => m.type === 'image').length > 1"
          @click.stop="nextInLightbox" 
          class="lightbox-button next"
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </Teleport>
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
  cursor: pointer;
}

.carousel-image:hover {
  opacity: 0.9;
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

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox-image {
  max-width: 95vw;
  max-height: 95vh;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 3001;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 3001;
}

.lightbox-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-button.prev {
  left: 20px;
}

.lightbox-button.next {
  right: 20px;
}

@media (max-width: 768px) {
  .lightbox-overlay {
    padding: 1rem;
  }
  
  .lightbox-close {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    font-size: 2rem;
  }
  
  .lightbox-button {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
  
  .lightbox-button.prev {
    left: 10px;
  }
  
  .lightbox-button.next {
    right: 10px;
  }
}
</style>
