// store/cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { CartItem, Product } from 'src/app/models/cart-item';


export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add to Cart Success',
  props<{ items: CartItem[] }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ product: Product }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove from Cart Success',
  props<{ items: CartItem[] }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const clearCartSuccess = createAction('[Cart] Clear Cart Success');

export const checkout = createAction('[Cart] Checkout');
