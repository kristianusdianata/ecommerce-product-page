<script setup lang="ts">
import { useBreakpoint } from '@/composables'
import { useModal } from '@components/common/modalbox'
import { useLightbox } from './store'

const props = defineProps<{
  controlId: string
}>()

const store = useLightbox()
const modalStore = useModal()
const { isSmallAndUp } = useBreakpoint()
</script>

<template>
  <div class="thumbnail" v-if="isSmallAndUp">
    <ul class="thumbnail__list">
      <li
        v-for="(thumbnailUrl, index) in store.thumbnailUrls"
        :key="index"
        class="thumbnail__item"
        :class="[
          { 'thumbnail__item--active': store.activeIndex === index },
          { 'thumbnail__item--modal': modalStore.isOpen },
        ]"
      >
        <button
          type="button"
          @click="store.setActiveIndex(index)"
          :aria-controls="props.controlId"
          :aria-label="`thumbnail ${index}`"
        >
          <img :src="thumbnailUrl" alt="" aria-hidden="true" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.thumbnail {
  &__list {
    @include flexbox($display: flex, $direction: column, $gap: px-to-em(map.get($spacing, 6)) 0);

    @include media-query-lg() {
      @include flexbox($direction: row, $gap: px-to-em(map.get($spacing, 8)));
    }
  }

  &__item {
    @include layout-position($position: relative);
    @include border($radius: map.get($radius, br-3));
    overflow: hidden;

    @include media-query-sm() {
      @include layout-size($width: 85px, $height: 85px);
    }

    &::after {
      content: '';
      @include layout-position($position: absolute, $top: 0, $right: 0, $bottom: 0, $left: 0);
      @include layout-background($color: var(--white));
      opacity: 0;
      pointer-events: none;
    }

    &:hover:not(&--active) {
      &::after {
        opacity: 0.5;
        transition: opacity 0.3s ease-in-out;
      }
    }

    &--active {
      outline: 2px solid var(--orange);

      &::after {
        opacity: 0.7;
      }
    }

    &--modal {
      @include layout-size($height: 90px, $width: 90px);
    }
  }
}
</style>
