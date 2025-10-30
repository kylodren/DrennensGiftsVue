import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // Environment - can be 'sandbox' or 'production'
  const environment = ref('sandbox') // Change this to 'production' when ready to go live

  // PayPal Client IDs
  const paypalClientIds = ref({
    sandbox: 'AZLolL6IDcWp4RMSDNKV1JGJKLwu6OYWCGb6Pvm3GCoP1GWeqnlz2Eii5TON8eEu2b38WkvVFCC5FM5j',
    production: 'AUjDXmIIL8ZhyYW2XUZJ4gHR7B8D51zEYM73T2aC-dPeK_wiI-sCE_uEz0zVcqeuHE7WJmZubkNy6pck'
  })

  // Computed property to get current client ID
  const currentPayPalClientId = computed(() => {
    return paypalClientIds.value[environment.value]
  })

  // Method to switch environments
  const setEnvironment = (env) => {
    if (env === 'sandbox' || env === 'production') {
      environment.value = env
    } else {
      console.error('Invalid environment. Use "sandbox" or "production"')
    }
  }

  // Method to get PayPal SDK URL
  const getPayPalSdkUrl = () => {
    const clientId = currentPayPalClientId.value
    return `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons&enable-funding=venmo&currency=USD`
  }

  return {
    environment,
    paypalClientIds,
    currentPayPalClientId,
    setEnvironment,
    getPayPalSdkUrl
  }
})