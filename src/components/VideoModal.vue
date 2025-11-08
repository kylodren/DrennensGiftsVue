<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  videoUrl: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Video Demonstration'
  }
})

const emit = defineEmits(['close'])

const videoRef = ref(null)

const closeModal = () => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
  emit('close')
}

// Pause video when modal closes
watch(() => props.isOpen, (newValue) => {
  if (!newValue && videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <button @click="closeModal" class="close-button" aria-label="Close modal">×</button>
          </div>
          
          <div class="video-container">
            <video 
              ref="videoRef"
              :src="videoUrl" 
              controls
              class="video-player"
              autoplay
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: #7f8c8d;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease, color 0.3s ease;
}

.close-button:hover {
  background: #f0f0f0;
  color: #2c3e50;
}

.video-container {
  padding: 1rem;
  background: #000;
}

.video-player {
  width: 100%;
  max-height: 70vh;
  display: block;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 100%;
    max-height: 95vh;
  }
  
  .modal-header h3 {
    font-size: 1.2rem;
  }
  
  .video-player {
    max-height: 60vh;
  }
}
</style>
