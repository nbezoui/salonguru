// store/product.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';


export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);
