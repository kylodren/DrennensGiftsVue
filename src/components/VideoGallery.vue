<script setup>
import { ref } from 'vue'
import VideoModal from './VideoModal.vue'

const props = defineProps({
  videos: {
    type: Array,
    required: true
  }
})

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
</script>

<template>
  <div v-if="videos && videos.length > 0" class="video-gallery">
    <h4 class="gallery-title">Video Demonstrations</h4>
    <div class="video-grid">
      <div 
        v-for="video in videos" 
        :key="video.url"
        class="video-thumbnail"
        @click="openVideo(video.url, video.title)"
      >
        <div class="thumbnail-container">
          <video :src="video.url" class="thumbnail-video" muted preload="metadata"></video>
          <div class="play-overlay">
            <div class="play-button">▶</div>
          </div>
        </div>
        <p class="video-title">{{ video.title }}</p>
      </div>
    </div>

    <VideoModal 
      :is-open="isVideoModalOpen"
      :video-url="currentVideo"
      :title="currentVideoTitle"
      @close="closeVideo"
    />
  </div>
</template>

<style scoped>
.video-gallery {
  margin-top: 1.5rem;
}

.gallery-title {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.video-thumbnail {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.video-thumbnail:hover {
  transform: translateY(-3px);
}

.thumbnail-container {
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.thumbnail-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.video-thumbnail:hover .play-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.play-button {
  width: 40px;
  height: 40px;
  background: rgba(52, 152, 219, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  padding-left: 3px;
  transition: all 0.3s ease;
}

.video-thumbnail:hover .play-button {
  background: rgba(52, 152, 219, 1);
  transform: scale(1.15);
}

.video-title {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #555;
  text-align: center;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .video-title {
    font-size: 0.8rem;
  }
}
</style>
