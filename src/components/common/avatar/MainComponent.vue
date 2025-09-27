<script setup lang="ts"></script>

<template>
  <div class="avatar">
    <img src="/images/image-avatar.png" alt="User Avatar" />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.avatar {
  @include border($radius: map.get($radius, br-full));
  @include layout-size($height: px-to-rem(24px), $width: px-to-rem(24px));

  @include media-query-sm() {
    @include layout-size($height: px-to-rem(40px), $width: px-to-rem(40px));
  }

  &:hover {
    outline: 2px solid var(--orange);
  }
}
</style>
