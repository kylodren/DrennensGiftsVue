<script setup>
import { ref } from 'vue'
import VideoModal from './VideoModal.vue'

const isVideoModalOpen = ref(false)
const currentVideo = ref('')
const currentVideoTitle = ref('')

const openVideo = (videoUrl, title) => {
  currentVideo.value = videoUrl
  currentVideoTitle.value = title
  isVideoModalOpen.value = true
}

const closeVideo = () => {
  isVideoModalOpen.value = false
}

const comparisonImages = [
  {
    url: '/Both-Lighthouses-White-Vignette-600px.jpg',
    title: 'Default White Mode',
    description: 'Both sizes side by side in classic white light'
  },
  {
    url: '/Both-Lighthouses-Green-600px.JPG',
    title: 'Holiday Colors',
    description: 'Emerald green'
  },
  {
    url: '/Both-Lighthouses-Red-600px.JPG',
    title: 'Holiday Colors',
    description: 'Vibrant red'
  }
]

const comparisonVideos = [
  {
    url: '/White-Both.mp4',
    title: 'White Mode',
    description: 'Both lighthouses illuminated in white mode'
  },
  {
    url: '/Both-PlaylistMode-SpedUp.mp4',
    title: 'All Modes Demo',
    description: 'Watch both lighthouses cycle through all available color modes'
  }
]
</script>

<template>
  <section class="comparison-section">
    <div class="section-header">
      <h2>Operation Modes</h2>
      <p class="subtitle">Our 10" and 5" models side by side in different lighting modes</p>
    </div>

    <div class="comparison-grid">
      <div 
        v-for="image in comparisonImages" 
        :key="image.url"
        class="comparison-card"
      >
        <img :src="image.url" :alt="image.title" class="comparison-image" />
        <div class="comparison-info">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
      
      <!-- Video cards in same row -->
      <div 
        v-for="video in comparisonVideos" 
        :key="video.url"
        class="comparison-card video-card-item"
        @click="openVideo(video.url, video.title)"
      >
        <div class="video-thumbnail">
          <div class="play-button">▶</div>
          <video :src="video.url" class="thumbnail-video" muted loop autoplay></video>
        </div>
        <div class="comparison-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
        </div>
      </div>
    </div>

    <VideoModal 
      :is-open="isVideoModalOpen"
      :video-url="currentVideo"
      :title="currentVideoTitle"
      @close="closeVideo"
    />
  </section>
</template>

<style scoped>
.comparison-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 3rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
  font-style: italic;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.comparison-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.comparison-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.comparison-image {
  width: 100%;
  height: 400px;
  object-fit: contain;
  background: #f5f5f5;
}

.comparison-info {
  padding: 1.5rem;
}

.comparison-info h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.comparison-info p {
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
}

.video-card-item {
  cursor: pointer;
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 400px;
  background: #000;
  overflow: hidden;
}

.thumbnail-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.7;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(52, 152, 219, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  padding-left: 5px;
  transition: background 0.3s ease, transform 0.3s ease;
  z-index: 2;
}

.video-card-item:hover .play-button {
  background: rgba(52, 152, 219, 1);
  transform: translate(-50%, -50%) scale(1.1);
}

@media (max-width: 768px) {
  .comparison-section {
    padding: 2rem 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
