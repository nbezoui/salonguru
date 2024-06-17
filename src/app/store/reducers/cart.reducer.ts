// store/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';

import * as CartActions from 'src/app/store/actions/cart.actions';
import * as CheckoutActions from 'src/app/store/actions/checkout.actions';
export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCartSuccess, (state, { items }) => ({
    ...state,
    items: items
  })),
  on(CartActions.removeFromCartSuccess, (state, { items }) => ({
    ...state,
    items: items
  })),
  on(CartActions.clearCartSuccess, state => ({
    ...state,
    items: []
  })),
  on(CheckoutActions.checkoutSuccess, state => ({
    ...state,
    items: [] // Clear items after successful checkout
  }))
);
