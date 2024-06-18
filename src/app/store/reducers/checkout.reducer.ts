import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import * as CheckoutActions from 'src/app/store/actions/checkout.actions';

export type CheckoutItem = CartItem & {total_price:number};
export type CheckoutPayload = { product_id: number, quantity: number}

export interface CheckoutState {
  totalAmount: number;
  items: CheckoutItem[];
  checkoutError: any;
}

export const initialCheckoutState: CheckoutState = {
  totalAmount: 0,
  items: [],
  checkoutError: null
};

export const checkoutReducer = createReducer(
  initialCheckoutState,
  on(CheckoutActions.checkoutSuccess, (state, { totalAmount, items }) => ({
    ...state,
    items,
    totalAmount,
    checkoutError: null
  })),
  on(CheckoutActions.checkoutFailure, (state, { error }) => ({
    ...state,
    checkoutError: error
  }))
);
