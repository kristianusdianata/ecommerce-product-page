<script setup lang="ts">
import { useLogic } from '@/composables'
import type { ProductProps } from '@store'

const props = defineProps<{
  data: ProductProps
}>()

const calcDiscountPrice = useLogic((args: { discount: number; price: number }) => {
  if (args.discount > 0) {
    return (args.price * args.discount) / 100
  } else {
    return args.price
  }
})
</script>

<template>
  <div class="body">
    <p class="body__desc">{{ props.data.desc }}</p>
    <div class="body__pricing">
      <span class="body__pricing-current">
        <data
          :value="calcDiscountPrice({ discount: props.data.discount, price: props.data.price })"
          >{{
            `$${calcDiscountPrice({ discount: props.data.discount, price: props.data.price })}.00`
          }}</data
        >
      </span>
      <span class="body__pricing-discount" v-if="props.data.discount > 0">{{
        `${props.data.discount}%`
      }}</span>
      <del class="body__pricing-old" v-if="props.data.discount > 0">{{
        `$${props.data.price}.00`
      }}</del>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/assets/utils/index' as *;
@use '@/assets/variable' as *;

.body {
  @include flexbox($display: flex, $gap: px-to-rem(map.get($spacing, 4)) 0, $direction: column);

  &__desc {
    @include font-style(
      $color: var(--dark-grayish-blue),
      $font-size: px-to-rem(map.get($fontSize, sm)) + 0.15rem,
      $line-height: 1.5
    );
  }

  &__pricing {
    @include flexbox(
      $display: flex,
      $direction: row,
      $align: center,
      $gap: 0 px-to-rem(map.get($spacing, 4))
    );

    @include media-query-sm() {
      @include flexbox($wrap: wrap, $gap: px-to-rem(map.get($spacing, 4)));
    }

    &-current {
      @include font-style(
        $color: var(--very-dark-blue),
        $font-weight: 700,
        $font-size: px-to-rem(map.get($fontSize, lg)) + 0.2rem,
        $line-height: 1.5
      );
    }

    &-discount {
      @include layout-background($color: var(--very-dark-blue));
      @include layout-spacing(
        $padding: px-to-rem(map.get($spacing, 1)) px-to-rem(map.get($spacing, 2))
      );
      @include border($radius: map.get($spacing, 1));
      @include font-style(
        $color: var(--white),
        $font-weight: 700,
        $font-size: px-to-rem(map.get($fontSize, base))
      );
    }

    &-old {
      @include font-style(
        $color: var(--dark-grayish-blue),
        $font-weight: 700,
        $font-size: px-to-rem(map.get($fontSize, base))
      );
      @include layout-spacing() {
        margin-left: auto;
      }

      @include media-query-sm() {
        @include layout-spacing() {
          margin-left: 0px;
        }

        flex-basis: 100%;
      }
    }
  }
}
</style>
