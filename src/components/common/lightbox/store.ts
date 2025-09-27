import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLightbox = defineStore('lightbox', () => {
  const activeIndex = ref<number>(0)
  const imagesUrls = ref<string[]>([])
  const thumbnailUrls = ref<string[]>([])

  function setActiveIndex(index: number) {
    activeIndex.value = index
  }

  function setImageUrls(urls: string[]) {
    imagesUrls.value = urls
  }

  function setThumbnailUrls(urls: string[]) {
    thumbnailUrls.value = urls
  }

  function nextImage(totalImgs: number) {
    activeIndex.value = activeIndex.value + 1 > totalImgs ? 0 : activeIndex.value + 1
  }

  function prevImage(totalImgs: number) {
    activeIndex.value = activeIndex.value - 1 < 0 ? totalImgs : activeIndex.value - 1
  }

  return {
    activeIndex,
    imagesUrls,
    thumbnailUrls,
    setActiveIndex,
    setImageUrls,
    setThumbnailUrls,
    nextImage,
    prevImage,
  }
})
