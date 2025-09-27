<script setup lang="ts">
import type { ProductProps } from '@store'
import { CounterComponent, ButtonComponent, useCounter, useCart } from '@/components/common'

const props = defineProps<{
  data: ProductProps
}>()

const cartStore = useCart()
const counterStore = useCounter()

const onSubmitHandler = () => {
  if (cartStore.isOnCart(props.data.id)) {
    cartStore.updateTotalItem({ productId: props.data.id, totalItem: counterStore.count })
  } else {
    cartStore.addItem({
      product: props.data,
      totalItem: counterStore.count,
    })
  }

  counterStore.reset()
}
</script>

<template>
  <footer class="footer">
    <form class="footer__form" @submit.prevent="onSubmitHandler">
      <CounterComponent class="footer__counter" />
      <ButtonComponent class="footer__submit" type="submit">
        <img src="/images/icon-cart.svg" alt="" />
        Add to cart
      </ButtonComponent>
    </form>
  </footer>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.footer {
  @include flexbox($display: flex, $direction: column);

  &__form {
    @include flexbox($display: flex, $direction: column, $gap: px-to-rem(map.get($spacing, 4)) 0);
    @include layout-size($width: 100%);

    @include media-query-sm() {
      @include flexbox(
        $display: inline-flex,
        $direction: row,
        $gap: 0 px-to-rem(map.get($spacing, 4))
      );
    }
  }

  &__submit {
    @include flexbox(
      $display: inline-flex,
      $direction: row,
      $gap: 0 px-to-rem(map.get($spacing, 4)),
      $justify: center
    );

    & img {
      @include layout-size($width: 20px);
      mix-blend-mode: multiply;
    }
  }
}
</style>
