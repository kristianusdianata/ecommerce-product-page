<script setup lang="ts">
import type { ProductProps } from '@store'

const props = defineProps<{
  data: ProductProps
}>()
</script>

<template>
  <header class="header">
    <p class="header__sub-title">{{ props.data.brand.toUpperCase() }}</p>
    <h1 class="header__title">{{ props.data.name }}</h1>
  </header>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.header {
  @include flexbox($display: flex, $direction: column, $gap: px-to-rem(map.get($spacing, 4)) 0);

  &__sub-title {
    @include font-style(
      $color: var(--dark-grayish-blue),
      $font-weight: 700,
      $font-size: px-to-rem(map.get($fontSize, sm)),
      $letter-spacing: 1px
    );
  }

  &__title {
    @include font-style($color: var(--very-dark-blue));
  }
}
</style>
