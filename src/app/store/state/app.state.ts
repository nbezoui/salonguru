import { CartState } from "../reducers/cart.reducer";
import { CheckoutState } from "../reducers/checkout.reducer";
import { ProductState } from "../reducers/product.reducer";

export interface AppState {
  products: ProductState;
  cart: CartState;
  checkout: CheckoutState;
}
