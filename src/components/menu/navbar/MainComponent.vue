<script setup lang="ts">
import { watch } from 'vue'
import { useBreakpoint } from '@composables'
import { useMobileNavbar } from './store'
import NavbarMenu from './NavbarMenu.vue'

const props = defineProps<{
  parentHeight: number
}>()

const store = useMobileNavbar()
const { isMediumAndUp } = useBreakpoint()
const navbarMenuId = `navbarMenuContent`

watch(
  () => isMediumAndUp.value,
  () => store.resetState(),
)
</script>

<template>
  <div class="navbar">
    <button
      class="navbar__btn"
      :aria-expanded="store.isExpanded"
      :aria-controls="navbarMenuId"
      aria-label="Open navigation menu"
      aria-haspopup="menu"
      type="button"
      @click="store.toggleNavbar"
      v-if="!isMediumAndUp"
    >
      <img src="/images/icon-menu.svg" alt="" aria-hidden="true" />
    </button>

    <NavbarMenu :id="navbarMenuId" :padding-top="props.parentHeight" />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.navbar {
  &__btn {
    @include layout-size($height: px-to-rem(15px), $width: px-to-rem(16px));
  }
}
</style>
