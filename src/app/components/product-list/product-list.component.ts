// components/product-list/product-list.component.ts
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';


import { Product } from 'src/app/models/cart-item';
import { addToCart } from 'src/app/store/actions/cart.actions';
import { initiateCheckout } from 'src/app/store/actions/checkout.actions';
import { loadProducts } from 'src/app/store/actions/product.actions';
import { selectAllProducts } from 'src/app/store/selectors/product.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() searchQuery: string = '';
  products$: Observable<Product[]> = new Observable();
  allProducts$: Observable<Product[]> = new Observable();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
    this.allProducts$ = this.store.select(selectAllProducts);
    this.filterProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
      this.filterProducts();
    }
  }

  filterProducts(): void {
    if (this.searchQuery) {
      this.products$ = this.allProducts$.pipe(
        map(products => products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase())))
      );
    } else {
      this.products$ = this.allProducts$;
    }
  }


  addToCart(product: Product): void {
    this.store.dispatch(addToCart({ product }));
  }
}
