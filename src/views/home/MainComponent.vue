<script setup lang="ts">
import { useProductStore } from '@store'
import { LightBox } from '@/components/common'
import HeaderComponent from './HeaderComponent.vue'
import BodyComponent from './BodyComponent.vue'
import FooterComponent from './FooterComponent.vue'

const productStore = useProductStore()
const data = productStore.getProduct({ id: '1' })
</script>

<template>
  <main class="home container">
    <LightBox class="lightbox" :product-id="data.id" />
    <section class="info">
      <HeaderComponent class="info__header" :data="data" />
      <BodyComponent class="info__body" :data="data" />
      <FooterComponent class="info__footer" :data="data" />
    </section>
  </main>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.home {
  &.container {
    @include flexbox($display: flex, $direction: column);

    @include media-query-sm() {
      @include layout-spacing($padding: px-to-em(map.get($spacing, 4)));
    }

    @include media-query-md() {
      @include layout-spacing(
        $padding: px-to-em(map.get($spacing, 16)) px-to-em(map.get($spacing, 4))
          px-to-em(map.get($spacing, 16)) px-to-em(map.get($spacing, 4))
      );
    }

    @include media-query-lg() {
      @include flexbox(
        $direction: row,
        $gap: 0 px-to-rem(map.get($spacing, 12)),
        $align: center,
        $justify: space-between
      );
      @include layout-spacing(
        $padding: px-to-em(map.get($spacing, 16)) px-to-em(map.get($spacing, 4))
      );
      @include layout-size($width: 100%);
    }
  }

  & .lightbox {
    @include layout-position($position: relative);
    @include flexbox($display: flex, $direction: row, $gap: 0 px-to-em(map.get($spacing, 8)));

    @include media-query-lg() {
      @include flexbox($direction: column, $gap: px-to-em(map.get($spacing, 8)) 0);
      @include layout-size($max-width: 447px);
    }
  }
}

.info {
  @include layout-spacing($padding: px-to-em(map.get($spacing, 6)));
  @include flexbox($display: flex, $gap: px-to-rem(map.get($spacing, 4)) 0, $direction: column);

  @include media-query-sm() {
    @include layout-spacing($padding: px-to-em(map.get($spacing, 8)) 0 0 0);
    @include flexbox($gap: px-to-rem(map.get($spacing, 8)) 0);
  }

  @include media-query-lg() {
    @include layout-size($max-width: 493px);
  }
}
</style>
