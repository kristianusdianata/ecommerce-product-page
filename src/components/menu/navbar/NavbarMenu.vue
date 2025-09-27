<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useMobileNavbar } from './store'
import { useBreakpoint } from '@composables'
import { navMenus } from './data'

const props = defineProps<{
  id: string
  paddingTop: number
}>()

const navWrapperRef = ref<HTMLElement | null>(null)
const store = useMobileNavbar()
const { isMediumAndUp } = useBreakpoint()

const paddingBlockStart = computed(() => {
  if (!navWrapperRef.value) return '0em'
  const fontSize = parseFloat(getComputedStyle(navWrapperRef.value).fontSize)
  return `${props.paddingTop / fontSize + 1}em`
})
</script>

<template>
  <nav class="menu" :id="props.id" v-show="(store.isExpanded && !isMediumAndUp) || isMediumAndUp">
    <Transition name="slide-fade" @after-leave="store.afterLeaveTransition">
      <div
        ref="navWrapperRef"
        class="menu__wrapper"
        :style="{ paddingBlockStart: !isMediumAndUp ? paddingBlockStart : 0 }"
        v-if="(store.isOpen && !isMediumAndUp) || isMediumAndUp"
      >
        <button
          class="menu__btn"
          type="button"
          aria-controls="navbarMenuContent"
          aria-haspopup="menu"
          :aria-expanded="store.isExpanded"
          aria-label="Close navigation menu"
          @click="store.toggleNavbar"
          v-if="!isMediumAndUp"
        >
          <img src="/images/icon-close.svg" alt="" aria-hidden="true" />
        </button>

        <ul class="menu__nav">
          <li class="menu__nav-item" v-for="(navMenu, index) in navMenus" :key="index">
            <RouterLink :to="navMenu.url" class="menu__nav-link">{{ navMenu.text }}</RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.menu {
  @include layout-position(
    $position: fixed,
    $top: 0,
    $right: 0,
    $bottom: 0,
    $left: 0,
    $z-index: 99
  );
  @include layout-background($color: rgba($color: #000000, $alpha: 0.7));

  @include media-query-md() {
    @include layout-position($position: relative);
    @include layout-background($color: transparent);
  }

  &__wrapper {
    @include layout-background($color: var(--white));
    @include layout-size($height: 100%, $width: px-to-rem(250px));
    @include layout-spacing($padding: px-to-em(map.get($spacing, 6)));

    @include media-query-md() {
      @include layout-size($height: auto, $width: auto);
      @include layout-spacing($padding: 0px);
    }
  }

  &__btn {
    @include layout-position($position: absolute, $top: 20px, $left: 20px);
    @include layout-size($height: px-to-rem(15px), $width: px-to-rem(16px));

    @include media-query-sm() {
      @include layout-position($top: 44px);
    }
  }

  &__nav {
    @include flexbox($display: flex, $direction: column, $gap: px-to-em(map.get($spacing, 8)) 0);

    @include media-query-md() {
      @include flexbox($direction: row, $justify: space-around);
    }

    @include media-query-lg() {
      @include flexbox($gap: 0 px-to-em(map.get($spacing, 8)), $justify: flex-start);
    }

    &-item {
      @include layout-position($position: relative);
      @include font-style(
        $color: var(--very-dark-blue),
        $font-weight: 700,
        $font-size: px-to-rem(map.get($fontSize, md))
      );

      @include media-query-md() {
        @include font-style(
          $color: var(--dark-grayish-blue),
          $font-weight: 400,
          $font-size: px-to-rem(map.get($fontSize, base)),
          $text-align: center
        );
      }
    }

    &-link {
      @include media-query-md() {
        &::after {
          content: '';
          @include layout-position(
            $position: absolute,
            $right: 0,
            // bottom position base on header__wrapper padding
            $bottom: calc(px-to-em(map.get($spacing, 8)) * -1),
            $left: 0
          );
          @include layout-size($height: 3px);
          @include layout-background($color: var(--orange));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease-in-out;
        }

        &:hover::after {
          transform: scaleX(1);
          transition: transform 0.3s ease-in-out;
        }
      }

      @include media-query-lg() {
        &::after {
          content: '';
          @include layout-position(
            $position: absolute,
            $right: 0,
            // bottom position base on header__wrapper padding
            $bottom: calc((px-to-em(map.get($spacing, 8)) * -1) - 0.7em),
            $left: 0
          );
          @include layout-size($height: 3px);
          @include layout-background($color: var(--orange));
        }
      }
    }
  }
}

.slide-fade-enter-active {
  transition: transform 0.5s ease-in-out;
}

.slide-fade-leave-active {
  transition: transform 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0px);
}
</style>
