<script setup lang="ts">
import { useCart } from './store'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BasketContent from './BasketContent.vue'

const store = useCart()
const isExpanded = ref<boolean>(false)
const cartRef = ref<HTMLElement | null>(null)

const toggleButton = () => {
  isExpanded.value = !isExpanded.value
}

const closeCart = (event: MouseEvent) => {
  if (cartRef.value && !cartRef.value.contains(event.target as Node)) {
    isExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeCart)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeCart)
})
</script>

<template>
  <div class="cart" ref="cartRef">
    <button
      class="cart__toggler"
      :aria-expanded="isExpanded"
      aria-controls="cartBasketContent"
      aria-haspopup="dialog"
      type="button"
      @click="toggleButton"
    >
      <img src="/images/icon-cart.svg" alt="Cart" />
    </button>

    <span
      class="cart__badge"
      aria-live="polite"
      :aria-label="
        store.cartItems.length > 0 ? `Cart has ${store.cartItems.length} items` : `Cart is empty`
      "
      v-if="store.cartItems.length > 0"
      >{{ store.cartItems.length }}</span
    >

    <Transition name="slide-fade">
      <BasketContent
        class="cart__basket"
        id="cartBasketContent"
        v-if="isExpanded"
        @click-outside="closeCart"
      />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.cart {
  @include layout-position($position: relative);

  &__toggler {
    @include layout-size($height: px-to-rem(22px), $width: px-to-rem(22px));
  }

  &__badge {
    @include layout-position($position: absolute, $top: -5px, $right: -7px);
    @include layout-background($color: var(--orange));
    @include layout-spacing($padding: 0.1em 0.75em);
    @include font-style(
      $color: var(--white),
      $font-weight: 700,
      $font-size: calc(px-to-rem(map.get($fontSize, xs)) - 0.04rem)
    );
    @include border($radius: px-to-em(map.get($radius, br-8)));
  }

  &__basket {
    @include layout-position($position: fixed, $top: 70px, $left: 15px, $right: 15px);

    @include media-query-sm() {
      @include layout-position($position: absolute, $top: 40px, $right: -85px, $left: auto);
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
