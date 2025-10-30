// PayPal Service for handling checkout
export class PayPalService {
  static async createOrder(cartItems) {
    // Ensure PayPal SDK is loaded
    if (typeof window.paypal === 'undefined') {
      throw new Error('PayPal SDK not loaded')
    }

    return window.paypal.Buttons({
      createOrder: function(data, actions) {
        // Calculate total and prepare purchase units
        const purchaseUnits = [{
          amount: {
            currency_code: 'USD',
            value: PayPalService.calculateTotal(cartItems),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: PayPalService.calculateTotal(cartItems)
              }
            }
          },
          items: cartItems.map(item => ({
            name: item.name,
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2)
            },
            quantity: item.quantity.toString(),
            description: item.description ? item.description.substring(0, 100) : '',
            sku: item.id
          }))
        }]

        return actions.order.create({
          purchase_units: purchaseUnits,
          application_context: {
            brand_name: "Drennen's Gifts",
            locale: "en-US",
            landing_page: "BILLING",
            shipping_preference: "SET_PROVIDED_ADDRESS",
            user_action: "PAY_NOW"
          }
        })
      },
      
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2))
          
          // Show success message
          const transaction = orderData.purchase_units[0].payments.captures[0]
          alert(`Transaction ${transaction.status}: ${transaction.id}\n\nThank you for your purchase!`)
          
          // Clear cart after successful purchase
          return orderData
        })
      },
      
      onError: function(err) {
        console.error('PayPal error:', err)
        alert('An error occurred during payment processing. Please try again.')
      },
      
      onCancel: function(data) {
        console.log('PayPal payment cancelled:', data)
        alert('Payment was cancelled.')
      }
    })
  }

  static calculateTotal(cartItems) {
    return cartItems
      .reduce((total, item) => total + (item.price * item.quantity), 0)
      .toFixed(2)
  }

  static renderPayPalButton(containerId, cartItems, onSuccess) {
    if (typeof window.paypal === 'undefined') {
      console.error('PayPal SDK not loaded')
      return
    }

    const buttons = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      
      createOrder: function(data, actions) {
        const purchaseUnits = [{
          amount: {
            currency_code: 'USD',
            value: PayPalService.calculateTotal(cartItems),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: PayPalService.calculateTotal(cartItems)
              }
            }
          },
          items: cartItems.map(item => ({
            name: item.name,
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2)
            },
            quantity: item.quantity.toString(),
            description: item.description ? item.description.substring(0, 100) : '',
            sku: item.id
          }))
        }]

        return actions.order.create({
          purchase_units: purchaseUnits,
          application_context: {
            brand_name: "Drennen's Gifts",
            locale: "en-US",
            landing_page: "BILLING",
            user_action: "PAY_NOW"
          }
        })
      },
      
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
          console.log('Capture result', orderData)
          
          const transaction = orderData.purchase_units[0].payments.captures[0]
          
          // Call success callback
          if (onSuccess) {
            onSuccess(orderData, transaction)
          }
          
          return orderData
        })
      },
      
      onError: function(err) {
        console.error('PayPal error:', err)
        alert('An error occurred during payment processing. Please try again.')
      },
      
      onCancel: function(data) {
        console.log('PayPal payment cancelled:', data)
      }
    })

    // Clear container and render buttons
    const container = document.getElementById(containerId)
    console.log('Container found:', container)
    console.log('Cart items for PayPal:', cartItems)
    if (container) {
      container.innerHTML = ''
      buttons.render(`#${containerId}`).then(() => {
        console.log('PayPal buttons rendered successfully')
      }).catch((error) => {
        console.error('Error rendering PayPal buttons:', error)
      })
    } else {
      console.error('PayPal container not found:', containerId)
    }
  }
}