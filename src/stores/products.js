import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([
    {
      id: 'large-lighthouse',
      name: '10" LED Concord Lighthouse',
      price: 39.99,
      image: '/Large-Lighthouse-Vignette-600px.jpg',
      media: [
        { type: 'image', url: '/Large-Lighthouse-Vignette-600px.jpg' }, 
        { type: 'video', url: '/White-Light.mp4' },
        { type: 'video', url: '/Single-Playlist-SpedUp.mp4' }
      ],
      description: 'This stunning 10-inch replica captures the majesty of the historic Concord Lighthouse that has stood sentinel over the Chesapeake Bay in Havre de Grace, Maryland since 1827. Built to withstand the test of time, this lighthouse guided countless vessels through the waters where the Susquehanna River meets the bay.',
      features: [
        'Majestic 10-inch scale replica',
        'LED lighting system with multiple color modes and power adapter',
        'Detailed John O\'Neill Battery cannon replica included',         
        'Ideal for desk, shelf, or bedside display'       
      ],
      category: 'lighthouse',
      inStock: true
    },
    {
      id: 'small-lighthouse',
      name: '5" LED Concord Lighthouse',
      price: 24.99,
      image: '/Small-Lighthouse-vignette-600px.jpg',
      media: [
        { type: 'image', url: '/Small-Lighthouse-vignette-600px.jpg' },
        { type: 'video', url: '/White-Light.mp4' },
        { type: 'video', url: '/Single-Playlist-SpedUp.mp4' }
        
      ],
      description: 'A charming 5-inch version of the beloved Concord Lighthouse, perfect for smaller spaces while maintaining all the authentic details of its larger counterpart. This compact replica brings the same historical significance and coastal charm of Havre de Grace\'s famous landmark to any room.',
      features: [
        'Compact 5-inch scale replica',
        'LED lighting system with multiple color modes and power adapter',
        'Miniature John O\'Neill Battery cannon included',
        'Ideal for desk, shelf, window sill or bedside display'
      ],
      category: 'lighthouse',
      inStock: true
    }
    /* ,
    {
      id: 'test-lighthouse',
      name: 'Test Lighthouse Item',
      price: 1.00,
      image: '/SmallLighthouseWithCannon.jpg',
      media: [
        { type: 'image', url: '/SmallLighthouseWithCannon.jpg' },
        { type: 'video', url: '/Single-Playlist-SpedUp.mp4' },
        { type: 'image', url: '/Small-Lighthouse-600px.jpg' },
        { type: 'video', url: '/White-Light.mp4' }
      ],
      description: 'This is our test item to verify the payment system is working correctly. Same beautiful lighthouse replica as our other products, but offered at a test price for payment processing verification.',
      features: [
        'Test item for payment verification',
        'Same quality as our full-priced items',
        'LED lighting included',
        'Perfect for testing our new system',
        'Miniature John O\'Neill Battery cannon included',
        'Special introductory test price'
      ],
      category: 'lighthouse',
      inStock: true,
      isTestItem: true,
      paypalButtonId: 'T7686CD7BQGXE'
    } */
  ])

  const getProductById = (id) => {
    return products.value.find(product => product.id === id)
  }

  const getProductsByCategory = (category) => {
    return products.value.filter(product => product.category === category)
  }

  return {
    products,
    getProductById,
    getProductsByCategory
  }
})