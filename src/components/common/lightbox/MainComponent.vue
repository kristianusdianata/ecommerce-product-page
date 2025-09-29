<script setup lang="ts">
import ImagePreview from './ImagePreview.vue'
import ImageThumbnail from './ImageThumbnail.vue'
import { ModalBox, useModal } from '@components/common/modalbox'
import { useBreakpoint } from '@/composables'
import { useLightbox } from './store'
import { useProductStore } from '@store'
import { ref } from 'vue'

const props = defineProps<{
  productId: string
}>()

const store = useLightbox()
const modalStore = useModal()
const productStore = useProductStore()
const { isLargeAndUp } = useBreakpoint()

const productDetail = productStore.getProduct({ id: props.productId })
const controlId = ref<string>('')

// store image & thumbanil urls
store.setImageUrls(productDetail.imgUrls)
store.setThumbnailUrls(productDetail.thumbnailUrls)
</script>

<template>
  <section class="lightbox">
    <!-- Lightbox image -->
    <ImagePreview :show-nav-button="false" #default="{ slotId }">
      <button
        :id="controlId = slotId"
        class="lightbox__image"
        type="button"
        :disabled="isLargeAndUp ? false : true"
        :aria-label="productDetail.name"
        @click="modalStore.openModal"
        v-bind="
          isLargeAndUp
            ? {
                'aria-expanded': modalStore.isOpen,
                'aria-controls': 'lightboxModalContent',
                'aria-haspopup': 'dialog',
              }
            : {}
        "
      >
        <img :src="productDetail.imgUrls[store.activeIndex]" alt="" aria-hidden="true" />
      </button>
    </ImagePreview>

    <!-- Lightbox thumbnail -->
    <ImageThumbnail :control-id="controlId" />

    <!-- Modalbox -->
    <ModalBox id="lightboxModalContent">
      <template #modal-body>
        <ImagePreview :show-nav-button="true" #default="{ slotId }">
          <img
            :id="controlId = slotId"
            :src="productDetail.imgUrls[store.activeIndex]"
            :alt="productDetail.name"
            class="lightbox__modal-image"
          />
        </ImagePreview>
      </template>
      <template #modal-footer>
        <ImageThumbnail :control-id="controlId" />
      </template>
    </ModalBox>
  </section>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.lightbox {
  &__image {
    @include layout-size($width: 100%);
    overflow: hidden;
    cursor: initial;
    pointer-events: none;

    @include media-query-sm() {
      @include border($radius: map.get($radius, br-4));
    }

    @include media-query-lg() {
      cursor: pointer;
      pointer-events: auto;
    }

    & img {
      @include layout-size($max-height: 300px);
      object-fit: cover;

      @include media-query-sm() {
        @include layout-size($max-height: none);
        object-fit: contain;
      }
    }
  }

  &__modal-image {
    @include layout-size($height: px-to-rem(530px), $width: px-to-rem(530px));
    @include border($radius: map.get($radius, br-4));
  }
}
</style>
