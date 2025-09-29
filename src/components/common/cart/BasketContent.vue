<script setup lang="ts">
import { ButtonComponent } from '@components/common'
import { useCart } from './store'
import { useLogic } from '@composables'
import { computed } from 'vue'

const store = useCart()
const calcDiscountPrice = useLogic((args: { discount: number; price: number }) => {
  if (args.discount > 0) {
    return (args.price * args.discount) / 100
  } else {
    return args.price
  }
})

const calcTotalPrice = useLogic((args: { discount: number; price: number; totalItem: number }) => {
  if (args.discount > 0) {
    return calcDiscountPrice({ discount: args.discount, price: args.price }) * args.totalItem
  }

  return args.price * args.totalItem
})

const cartHasItem = computed(() => store.cartItems.length > 0)
</script>

<template>
  <aside class="basket">
    <div class="basket__content">
      <div class="basket__header">
        <p>Cart</p>
      </div>
      <div class="basket__body">
        <ul class="basket__list" v-if="cartHasItem">
          <li class="basket__item" v-for="(item, index) in store.cartItems" :key="index">
            <img
              :src="item.product.thumbnailUrls[0]"
              alt=""
              class="basket__item-img"
              aria-hidden="true"
            />
            <div class="basket__item-detail">
              <p class="basket__item-name">{{ item.product.name }}</p>
              <p class="basket__item-price">
                {{
                  `$` +
                  calcDiscountPrice({
                    discount: item.product.discount,
                    price: item.product.price,
                  }) +
                  `.00`
                }}
                x {{ item.totalItem
                }}<span>{{
                  `$` +
                  calcTotalPrice({
                    discount: item.product.discount,
                    price: item.product.price,
                    totalItem: item.totalItem,
                  }) +
                  `.00`
                }}</span>
              </p>
            </div>
            <button
              class="basket__item-delete"
              :aria-label="`Delete ${item.product.name} from cart`"
              @click="store.removeItem(item.product.id)"
            >
              <img src="/images/icon-delete.svg" alt="" aria-hidden="true" />
            </button>
          </li>
        </ul>
        <div class="basket__empty" v-if="!cartHasItem">
          <p>Your cart is empty.</p>
        </div>
      </div>
      <div class="basket__footer" v-if="cartHasItem">
        <ButtonComponent type="button"> Checkout </ButtonComponent>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/variable' as *;

.basket {
  @include layout-background($color: var(--white));
  @include border($radius: map.get($radius, br-3));
  box-shadow: rgba(151, 143, 143, 0.1) 0px 4px 12px;
  -webkit-box-shadow: rgba(151, 143, 143, 0.1) 0px 4px 12px;
  -moz-box-shadow: rgba(151, 143, 143, 0.1) 0px 4px 12px;

  @include media-query-sm() {
    @include layout-position($z-index: 99);
  }

  &__content {
    @include layout-size($min-height: 240px);
    @include flexbox($display: flex, $direction: column);

    @include media-query-sm() {
      @include layout-size($min-width: 360px);
    }
  }

  &__header {
    @include font-style(
      $color: var(--very-dark-blue),
      $font-size: px-to-rem(map.get($fontSize, base)),
      $font-weight: 700
    );
    @include layout-spacing($padding: px-to-em(map.get($spacing, 6)));
    @include border-bottom($width: 1px, $style: solid, $color: var(--grayish-blue));
  }

  &__body {
    @include layout-spacing($padding: px-to-em(map.get($spacing, 6)));
    @include flexbox($display: flex, $direction: column, $justify: center, $grow: 1);
  }

  &__list {
    @include flexbox($display: flex, $direction: column, $gap: px-to-em(map.get($spacing, 4)) 0);
    @include layout-size($max-height: 200px);
    overflow: auto;
  }

  &__item {
    @include grid($cols: auto 1fr auto, $align: center, $gap: 0 px-to-em(map.get($spacing, 4)));

    &-img {
      @include layout-size($width: 50px);
      @include border($radius: map.get($radius, br-3));
    }

    &-detail {
      @include flexbox($display: flex, $direction: column, $gap: px-to-em(map.get($spacing, 2)) 0);
    }

    &-name {
      @include font-style(
        $color: var(--dark-grayish-blue),
        $font-size: px-to-rem(map.get($fontSize, base))
      );
      @include line-clamp(1);
    }

    &-price {
      @include font-style(
        $color: var(--dark-grayish-blue),
        $font-size: px-to-rem(map.get($fontSize, base))
      );
      @include line-clamp(1);

      & span {
        @include font-style($color: var(--very-dark-blue), $font-weight: 700);
        @include layout-spacing($margin: 0 0 0 10px);
      }
    }

    &-delete {
      @include layout-size($width: 14px);
    }
  }

  &__empty {
    @include font-style(
      $color: var(--dark-grayish-blue),
      $font-size: px-to-rem(map.get($fontSize, base)),
      $text-align: center
    );
  }

  &__footer {
    @include layout-spacing(
      $padding: 0 px-to-em(map.get($spacing, 6)) px-to-em(map.get($spacing, 6))
        px-to-em(map.get($spacing, 6))
    );
  }
}
</style>
