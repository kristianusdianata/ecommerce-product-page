<script setup lang="ts">
import { HeaderLayout } from '@/components/layout'
</script>

<template>
  <div class="container">
    <HeaderLayout />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.container {
  @include flexbox($display: flex, $direction: column);
  @include layout-size($max-width: 600px);
  @include layout-spacing($margin: 0 auto, $padding: 0);

  @include media-query-md() {
    @include layout-size($max-width: 800px);
    @include layout-spacing($margin: 0 auto, $padding: 0 px-to-em(map.get($spacing, 16)));
  }

  @include media-query-lg() {
    @include layout-size($max-width: 1200px);
  }
}
</style>
