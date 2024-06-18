import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CheckoutActions from 'src/app/store/actions/checkout.actions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/cart-item';
import { CheckoutPayload } from '../reducers/checkout.reducer';

@Injectable()
export class CheckoutEffects {

  private apiUrl = environment.apiUrl +"checkout";
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKey
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
            const products = action.products;
            const filteredItems = products.filter((item: Product) =>
              response.body.some((checkoutItem: CheckoutPayload) => checkoutItem.product_id === +item.id)
            );2
            return CheckoutActions.checkoutFailure({ error:"Oups " + response.message + ": \n" + filteredItems.map((item: any)=> item.name + "\n" + " only " + item.quantity + ( item.quantity>1 ? " are" : " is") + " available") })
          } else {
            this.localStorage.clearCartItems(); 
            return CheckoutActions.checkoutSuccess({ 
              totalAmount: response?.checkout?.total_price,
              items: response?.checkout?.items
            });
          }}),
          catchError(error => of(CheckoutActions.checkoutFailure({ error })))
        )
      )
    )
  );
}
