import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMobileNavbar = defineStore('toggleMobileNavbar', () => {
  const isExpanded = ref<boolean>(false) // used to track if the nav is fully extended
  const isOpen = ref<boolean>(false) // used to track if the nav menu is currently open

  function toggleNavbar() {
    isOpen.value = !isOpen.value
    // updates 'isExpanded' only when 'isOpen' becomes true;
    // when 'isOpen' becomes false, 'isExpanded' is set via @after-leave transition in the template
    if (isOpen.value) isExpanded.value = true
  }

  function afterLeaveTransition() {
    isExpanded.value = false
  }

  function resetState() {
    isExpanded.value = false
    isOpen.value = false
  }

  return { isExpanded, isOpen, toggleNavbar, afterLeaveTransition, resetState }
})
