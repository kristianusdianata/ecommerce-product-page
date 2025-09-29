import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounter = defineStore('counter', () => {
  const count = ref<number>(0)

  function setCount(value: number) {
    count.value = value
  }

  function increment() {
    count.value++
  }

  function decrement() {
    if (count.value > 0) {
      count.value--
    }
  }

  function reset() {
    count.value = 0
  }

  return {
    count,
    setCount,
    increment,
    decrement,
    reset,
  }
})
