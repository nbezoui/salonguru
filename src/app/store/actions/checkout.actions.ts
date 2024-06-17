import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';

export const initiateCheckout = createAction('[Checkout] Initiate Checkout', props<{ items: {product_id: number; quantity: number}[] }>() );

export const checkoutSuccess = createAction(
  '[Checkout] Checkout Success',
  props<{ totalAmount: number }>()
);

export const checkoutFailure = createAction(
  '[Checkout] Checkout Failure',
  props<{ error: any }>()
);
