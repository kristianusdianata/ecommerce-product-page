<script setup lang="ts">
import { useCounter } from './store'

const store = useCounter()
</script>

<template>
  <div class="counter" aria-label="Item quantity" role="group">
    <button class="counter__button" id="counterDecrement" type="button" @click="store.decrement">
      <img src="/images/icon-minus.svg" alt="Decrease quantity" />
    </button>
    <input class="counter__input" type="number" :value="store.count" aria-label="Item count" />
    <button class="counter__button" id="counterIncrement" type="button" @click="store.increment">
      <img src="/images/icon-plus.svg" alt="Increase quantity" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.counter {
  @include flexbox($display: flex, $direction: row);
  @include layout-background($color: var(--light-grayish-blue));
  @include border($radius: map.get($radius, br-3));
  @include layout-size($height: 56px);

  &__button {
    @include layout-spacing($padding: 0 px-to-em(map.get($spacing, 4)));

    & img {
      @include layout-size($width: 13px);
    }
  }

  &__input {
    @include font-style(
      $color: var(--very-dark-blue),
      $font-size: px-to-rem(map.get($fontSize, base)),
      $font-weight: 700,
      $text-align: center
    );
    @include layout-size($width: 100%);
  }
}
</style>
