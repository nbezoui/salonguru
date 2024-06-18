// store/product.reducer.ts
import { createReducer, on } from '@ngrx/store';

import { Product } from 'src/app/models/cart-item';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from '../actions/product.actions';


export interface ProductState {
  products: Product[];
  error: any;
}

export const initialState: ProductState = {
  products: [],
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, error: null })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error }))
);

