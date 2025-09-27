import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { CartItemProps } from './type'

export const useCart = defineStore('cart', () => {
  const cartItems = ref<CartItemProps[]>([])

  function addItem(item: CartItemProps) {
    cartItems.value.push(item)
  }

  function removeItem(productId: string) {
    cartItems.value = cartItems.value.filter((item) => item.product.id !== productId)
  }

  function isOnCart(productId: string): boolean {
    const item = cartItems.value.find((item) => item.product.id === productId)
    if (item) return true
    else return false
  }

  function updateTotalItem(args: { productId: string; totalItem: number }) {
    const item = cartItems.value.find((item) => item.product.id === args.productId)
    if (item) {
      item.totalItem = args.totalItem
    }
  }

  return {
    cartItems,
    addItem,
    removeItem,
    isOnCart,
    updateTotalItem,
  }
})
