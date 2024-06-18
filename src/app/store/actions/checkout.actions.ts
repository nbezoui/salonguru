import { createAction, props } from '@ngrx/store';
import { CheckoutItem, CheckoutPayload, CheckoutState } from '../reducers/checkout.reducer';
import { Product } from 'src/app/models/cart-item';

export const initiateCheckout = createAction('[Checkout] Initiate Checkout', props<{ items: CheckoutPayload[], products: Product[] }>() );

export const checkoutSuccess = createAction(
  '[Checkout] Checkout Success',
  props<{ totalAmount: number, items: CheckoutItem[] }>()
);

export const checkoutFailure = createAction(
  '[Checkout] Checkout Failure',
  props<{ error: any }>()
);
