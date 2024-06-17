// store/product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as ProductActions from 'src/app/store/actions/product.actions';
import { ProductService } from 'src/app/services/product.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getAllProducts().pipe(
          map(result => ProductActions.loadProductsSuccess({ products : result.products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );
}
