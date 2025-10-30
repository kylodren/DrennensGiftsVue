<script setup>
import { onMounted } from 'vue'
import { useConfigStore } from '../stores/config'

const configStore = useConfigStore()

onMounted(() => {
  // Check if PayPal SDK is already loaded
  if (window.paypal) {
    console.log('PayPal SDK already loaded')
    return
  }

  // Create and load PayPal script dynamically
  const script = document.createElement('script')
  script.src = configStore.getPayPalSdkUrl()
  script.async = true
  
  script.onload = () => {
    console.log('PayPal SDK loaded successfully for environment:', configStore.environment)
  }
  
  script.onerror = () => {
    console.error('Failed to load PayPal SDK')
  }

  document.head.appendChild(script)
})
</script>

<template>
  <!-- This component doesn't render anything visible -->
</template>