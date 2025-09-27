import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModal = defineStore('modalbox', () => {
  const isOpen = ref<boolean>(false)

  function openModal() {
    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
  }

  return { isOpen, openModal, closeModal }
})
