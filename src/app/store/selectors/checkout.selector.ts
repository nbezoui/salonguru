// store/cart.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CheckoutState } from '../reducers/checkout.reducer';



export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout');

export const selectCheckoutItems = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.items
);

export const selectCheckoutTotalAmount = createSelector(
    selectCheckoutState,
    (state: CheckoutState) => state.totalAmount
  );
