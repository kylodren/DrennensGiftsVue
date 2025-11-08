import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const isCartOpen = ref(false)
  const shippingCost = 9.99

  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const subtotal = computed(() => {
    return totalPrice.value.toFixed(2)
  })

  const shipping = computed(() => {
    return items.value.length > 0 ? shippingCost : 0
  })

  const cartTotal = computed(() => {
    return (totalPrice.value + shipping.value).toFixed(2)
  })

  // Actions
  const addToCart = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
    
    // Save to localStorage
    saveToStorage()
    
    // Open the cart
    isCartOpen.value = true
  }

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const removeFromCart = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToStorage()
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveToStorage()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    saveToStorage()
  }

  const saveToStorage = () => {
    localStorage.setItem('drennensgifts-cart', JSON.stringify(items.value))
  }

  const loadFromStorage = () => {
    const stored = localStorage.getItem('drennensgifts-cart')
    if (stored) {
      items.value = JSON.parse(stored)
    }
  }

  // Initialize from localStorage
  loadFromStorage()

  return {
    items,
    isCartOpen,
    totalItems,
    totalPrice,
    subtotal,
    shipping,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart
  }
})