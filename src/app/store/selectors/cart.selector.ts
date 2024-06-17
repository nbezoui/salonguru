// store/cart.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';


export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.product.price * item.quantity, 0)
);
