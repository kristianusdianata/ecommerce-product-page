<script setup lang="ts">
import { useModal } from './store'

const store = useModal()
</script>

<template>
  <transition>
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      v-if="store.isOpen"
      @click.self="store.closeModal"
    >
      <div class="modal__content">
        <header class="modal__header">
          <slot name="modal-header"></slot>
        </header>
        <div class="modal__body">
          <slot name="modal-body"></slot>
        </div>
        <footer class="modal__footer">
          <slot name="modal-footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.modal {
  @include layout-position($position: fixed, $top: 0, $right: 0, $bottom: 0, $left: 0) {
    z-index: 999;
  }
  @include layout-background($color: rgba($color: #000000, $alpha: 0.75));
  @include flexbox($display: flex, $justify: center);

  &__content {
    @include flexbox(
      $display: inline-flex,
      $direction: column,
      $align: center,
      $justify: center,
      $gap: px-to-em(map.get($spacing, 8)) 0
    );
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
