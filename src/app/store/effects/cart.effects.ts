// store/cart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import * as CartActions from 'src/app/store/actions/cart.actions';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private localStorageService: LocalStorageService) {}

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      map(action => {
        const items = this.localStorageService.getCartItems();
        const index = items.findIndex(item => item.product.id === action.product.id);
        if (index > -1) {
          items[index].quantity += 1;
        } else {
          items.push({ product: action.product, quantity: 1 });
        }
        this.localStorageService.setCartItems(items);
        return CartActions.addToCartSuccess({ items });
      })
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      map(action => {
        const items = this.localStorageService.getCartItems();
        const index = items.findIndex(item => item.product.id === action.product.id);
        if (index > -1) {
          items[index].quantity -= 1;
          if (items[index].quantity === 0) {
            items.splice(index, 1);
          }
        }
        this.localStorageService.setCartItems(items);
        return CartActions.removeFromCartSuccess({ items });
      })
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      map(() => {
        this.localStorageService.clearCartItems();
        return CartActions.clearCartSuccess();
      })
    )
  );
}
