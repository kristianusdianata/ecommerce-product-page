import { defineStore } from 'pinia'
import { ref } from 'vue'
import products from '@data/product.json'

import type { ProductProps } from './type'

export const useProductStore = defineStore('productStore', () => {
  const data = ref<ProductProps[]>(products)

  function getProduct(props: { id: string }) {
    if (!data.value) throw new Error(`product.json not found`)

    const response = data.value.find((item) => item.id === props.id)

    if (!response) throw new Error(`Proudct id not found!`)
    return response
  }

  return { data, getProduct }
})
