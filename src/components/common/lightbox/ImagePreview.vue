<script setup lang="ts">
import { useBreakpoint } from '@/composables'
import { useLightbox } from './store'
import { computed } from 'vue'

const props = defineProps<{
  showNavButton: boolean
}>()

const store = useLightbox()
const { isSmallAndUp } = useBreakpoint()

const toogleNavButton = computed(() => {
  return (
    (!isSmallAndUp.value || props.showNavButton) &&
    store.thumbnailUrls &&
    store.thumbnailUrls.length > 0
  )
})

// generate unique for slot
const slotId = `imageContentPreview-${Math.random().toString(36).slice(2, 8)}`
</script>

<template>
  <div class="preview" role="group" aria-label="Product image preview">
    <slot :slot-id="slotId"></slot>
    <button
      class="preview__navigation"
      id="prevProduct"
      type="button"
      :aria-controls="slotId"
      aria-label="Previous image"
      :class="{ 'preview__navigation--modal': props.showNavButton }"
      @click="store.prevImage(store.thumbnailUrls.length - 1)"
      v-if="toogleNavButton"
    >
      <img src="/images/icon-previous.svg" alt="" aria-hidden="true" />
    </button>
    <button
      class="preview__navigation"
      id="nextProduct"
      type="button"
      :aria-controls="slotId"
      aria-label="Next image"
      :class="{ 'preview__navigation--modal': props.showNavButton }"
      @click="store.nextImage(store.thumbnailUrls.length - 1)"
      v-if="toogleNavButton"
    >
      <img src="/images/icon-next.svg" alt="" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.preview {
  @include layout-size($width: 100%);
  @include layout-position($position: relative);

  &__navigation {
    @include layout-spacing($padding: 12px);
    @include layout-background($color: var(--white));
    @include border($radius: map.get($radius, br-full));

    & img {
      @include layout-size($height: 15px, $width: 15px);
      mix-blend-mode: multiply;
    }

    &#prevProduct {
      @include layout-position($position: absolute, $top: 40%, $left: 5%);
    }

    &#nextProduct {
      @include layout-position($position: absolute, $top: 40%, $right: 5%);
    }

    &--modal {
      @include layout-spacing($padding: 20px);

      &#prevProduct {
        @include layout-position($position: absolute, $top: 45%, $left: 0%);
        transform: translateX(-50%);
      }

      &#nextProduct {
        @include layout-position($position: absolute, $top: 45%, $right: 0%);
        transform: translateX(50%);
      }
    }
  }
}
</style>
