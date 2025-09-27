<script setup lang="ts">
import { ref } from 'vue'
import { UserAvatar } from '@components/common'
import { useParentHeight } from '@composables'
import { Navbar } from '@/components/menu'
import { CartComponent } from '@components/common'

const headerRef = ref<HTMLElement | null>(null)
const headerHeight = useParentHeight(headerRef)
</script>

<template>
  <header class="header" ref="headerRef">
    <div class="header__wrapper">
      <div class="header__logo">
        <img src="/images/logo.svg" alt="Logo Website" />
      </div>

      <Navbar class="header__nav" :parent-height="headerHeight" />

      <div class="header__widget">
        <CartComponent />
        <UserAvatar />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.header {
  @include layout-position($position: sticky, $top: 0, $z-index: 1);
  @include layout-spacing($padding: 0 px-to-em(map.get($spacing, 5)));
  @include layout-background($color: var(--white));

  @include media-query-md() {
    @include layout-spacing($padding: 0px);
  }

  &__wrapper {
    @include grid($cols: auto 1fr 1fr, $gap: 0 px-to-em(map.get($spacing, 4)), $align: center);
    @include layout-spacing(
      $padding: px-to-em(map.get($spacing, 4)) 0 px-to-em(map.get($spacing, 6)) 0
    );

    @include media-query-sm() {
      @include layout-spacing($padding: px-to-em(map.get($spacing, 8)) 0);
    }

    @include media-query-md() {
      @include grid($cols: repeat(2, 1fr), $gap: px-to-em(map.get($spacing, 8)) 0);
      @include border-bottom($width: 1px, $style: solid, $color: var(--grayish-blue));
    }

    @include media-query-lg() {
      @include grid($cols: auto 1fr auto, $gap: 0 px-to-em(map.get($spacing, 8)));
    }
  }

  &__logo {
    @include grid-position($col: 2, $row: 1);
    @include layout-size($height: px-to-rem(20px), $width: px-to-rem(138px));

    @include media-query-md() {
      @include grid-position($col: 1, $row: 1);
    }
  }

  &__nav {
    @include grid-position($col: 1, $row: 1);

    @include media-query-md() {
      @include grid-position($col: 1 / span 2, $row: 2);
    }

    @include media-query-lg() {
      @include grid-position($col: 2, $row: 1);
    }
  }

  &__widget {
    @include grid-position($col: 3, $row: 1);
    @include flexbox(
      $display: inline-flex,
      $align: center,
      $justify: end,
      $gap: 0 px-to-em(map.get($spacing, 8))
    );

    @include media-query-md() {
      @include grid-position($col: 2, $row: 1);
    }

    @include media-query-lg() {
      @include grid-position($col: 3, $row: 1);
    }
  }
}
</style>
