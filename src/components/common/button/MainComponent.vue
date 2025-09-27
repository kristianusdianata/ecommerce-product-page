<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const props = defineProps<{
  type: HTMLButtonElement['type']
}>()
</script>

<template>
  <button class="button" @click="emit('click', $event)" :type="props.type">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.button {
  @include layout-spacing($padding: px-to-em(map.get($spacing, 4)));
  @include layout-background($color: var(--orange));
  @include font-style(
    $color: var(--very-dark-blue),
    $font-size: px-to-rem(map.get($fontSize, base)),
    $font-weight: 700
  );
  @include border($radius: map.get($radius, br-3));
  @include layout-size($width: 100%);
  transition: background-color 0.5s ease-in-out;

  &:hover {
    @include layout-background($color: var(--lite-orange));
    transition: background-color 0.5s ease-in-out;
  }
}
</style>
