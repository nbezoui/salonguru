// components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, take } from 'rxjs';
import { CartItem, Product } from '../../models/cart-item';
import { addToCartSuccess, clearCart, removeFromCart } from 'src/app/store/actions/cart.actions';
import { AppState } from 'src/app/store/state/app.state';
import { selectCartItems, selectCartTotal } from 'src/app/store/selectors/cart.selector';
import { Router } from '@angular/router';
import { initiateCheckout } from 'src/app/store/actions/checkout.actions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { selectAllProducts } from 'src/app/store/selectors/product.selector';
import { CheckoutPayload } from 'src/app/store/reducers/checkout.reducer';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> = new Observable();
  total$: Observable<number> = new Observable();
  allProducts$: Observable<Product[]> = new Observable();;

  constructor(private store: Store<AppState>, private readonly router: Router, private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.store.dispatch(addToCartSuccess({items: this.localStorage.getCartItems()}))
    this.cartItems$ = this.store.select(selectCartItems);
    this.allProducts$ = this.store.select(selectAllProducts);
    this.total$ = this.store.select(selectCartTotal);
  }

  removeFromCart(item: CartItem): void {
    this.store.dispatch(removeFromCart({ product: item.product }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }

  checkout(): void {
    combineLatest(
      this.cartItems$.pipe(
      map(cartItems => this.getCheckoutArray(cartItems)),
      take(1),
    ), this.allProducts$.pipe(
      take(1),
    ))
    .subscribe(([checkout, allProducts]) => this.store.dispatch(initiateCheckout({ items: checkout, products: allProducts })) );
    this.router.navigate(["checkout"])
  }

  private getCheckoutArray(cartItems: CartItem[]): CheckoutPayload[] {
    return cartItems.map(item => ({
      product_id: +item.product.id,
      quantity: item.quantity
    }));
  }
  
}
