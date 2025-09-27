import { ref, watch, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

export function useParentHeight(targetRefParent: Ref<HTMLElement | null>) {
  const parentHeight = ref<number>(0)
  let observer: ResizeObserver | null = null

  const updateHeight = () => {
    if (targetRefParent.value) {
      parentHeight.value = targetRefParent.value.clientHeight
    } else {
      parentHeight.value = 0
    }
  }

  watch(
    () => targetRefParent.value,
    (newRef, oldRef) => {
      if (!newRef) return

      // cleanup old observer
      if (observer && oldRef) {
        observer.unobserve(oldRef)
      }

      // create new observer
      observer = new ResizeObserver(updateHeight)
      observer.observe(newRef)

      // execute on first load
      updateHeight()
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (observer && targetRefParent.value) {
      observer.unobserve(targetRefParent.value)
    }
  })

  return parentHeight
}
