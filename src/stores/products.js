import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([
    {
      id: 'large-lighthouse',
      name: 'Large 10" LED Concord Lighthouse',
      price: 40.00,
      image: '/SmallLighthouseWithCannon.jpg',
      description: 'This stunning 10-inch replica captures the majesty of the historic Concord Lighthouse that has stood sentinel over the Chesapeake Bay in Havre de Grace, Maryland since 1827. Built to withstand the test of time, this lighthouse guided countless vessels through the treacherous waters where the Susquehanna River meets the bay.',
      features: [
        'Authentic 10-inch scale replica',
        'Bright LED lighting system',
        'Detailed John O\'Neill Battery cannon replica included',
        'Hand-painted maritime details',
        'Sturdy base with historical information plaque',
        'Perfect for collectors and maritime enthusiasts'
      ],
      category: 'lighthouse',
      inStock: true
    },
    {
      id: 'small-lighthouse',
      name: 'Small 5" LED Concord Lighthouse',
      price: 25.00,
      image: '/SmallLighthouseWithCannon.jpg',
      description: 'A charming 5-inch version of the beloved Concord Lighthouse, perfect for smaller spaces while maintaining all the authentic details of its larger counterpart. This compact replica brings the same historical significance and coastal charm of Havre de Grace\'s famous landmark to any room.',
      features: [
        'Compact 5-inch scale replica',
        'Energy-efficient LED lighting',
        'Miniature John O\'Neill Battery cannon included',
        'Precision-crafted details',
        'Elegant display base',
        'Ideal for desk, shelf, or bedside display'
      ],
      category: 'lighthouse',
      inStock: true
    },
    {
      id: 'test-lighthouse',
      name: 'Test Lighthouse Item',
      price: 1.00,
      image: '/SmallLighthouseWithCannon.jpg',
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
    }
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