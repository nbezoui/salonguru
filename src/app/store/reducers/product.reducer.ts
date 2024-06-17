// store/product.reducer.ts
import { createReducer, on } from '@ngrx/store';

import { Product } from 'src/app/models/cart-item';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from '../actions/product.actions';


export interface ProductState {
  products: Product[];
  error: any;
}

export const initialState: ProductState = {
  products: [
    {"name": "Sleek Frozen Chair",
    "quantity": 5,
    "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounte at the rear of the engine and four wheel drive",
    "image": "http://placeimg.com/640/480",
    "id": "1",
    price: 1
    },
    {
    "name": "Practical Frozen Chips",
    "quantity": 3,
    "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    "image": "http://placeimg.com/640/480",
    "id": "2",
    price: 10
  }],
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, error: null })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error }))
);

