import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CheckoutActions from 'src/app/store/actions/checkout.actions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { CartItem } from 'src/app/models/cart-item';

@Injectable()
export class CheckoutEffects {

  private apiUrl = 'https://g93902zutc.execute-api.eu-central-1.amazonaws.com/prod/checkout';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': '2XyCVKIz277ZMEirPNTyQ3814iBXY5rg9ddTfX4W'
  });

  constructor(private actions$: Actions, private http: HttpClient, private readonly localStorage: LocalStorageService) { }

  initiateCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.initiateCheckout),
      mergeMap(action  =>
        this.http.post<any>(
          this.apiUrl,
          action.items,
          { headers: this.headers }
        ).pipe(
          map(response => { 
          if(response.message) { 
            const cartItems = this.localStorage.getCartItems();

            // Filter response.body based on product_id
            const filteredItems = cartItems.filter((item: CartItem) =>
              response.body.some((checkoutItem: any) => checkoutItem.product_id === item.product.id)
            );
            return CheckoutActions.checkoutFailure({ error:"Oups " + response.message + ": \n" + filteredItems.map((item)=> item.product.name + "\n") })
          } else {
            this.localStorage.clearCartItems(); 
            return CheckoutActions.checkoutSuccess({ 
              totalAmount: response?.checkout?.total_price 
            });
          }}),
          catchError(error => of(CheckoutActions.checkoutFailure({ error })))
        )
      )
    )
  );
}
