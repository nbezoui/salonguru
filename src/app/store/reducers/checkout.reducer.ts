import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import * as CheckoutActions from 'src/app/store/actions/checkout.actions';

export interface CheckoutState {
  totalAmount: number;
  items: (CartItem & {total_price:number})[];
  checkoutError: any;
}

export const initialCheckoutState: CheckoutState = {
  totalAmount: 0,
  items: [],
  checkoutError: null
};

export const checkoutReducer = createReducer(
  initialCheckoutState,
  on(CheckoutActions.checkoutSuccess, (state, { totalAmount }) => ({
    ...state,
    totalAmount,
    checkoutError: null
  })),
  on(CheckoutActions.checkoutFailure, (state, { error }) => ({
    ...state,
    checkoutError: error
  }))
);
