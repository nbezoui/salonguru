// components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { addToCart, checkout, clearCart, removeFromCart } from 'src/app/store/actions/cart.actions';
import { AppState } from 'src/app/store/state/app.state';
import { selectCartItems, selectCartTotal } from 'src/app/store/selectors/cart.selector';
import { Router } from '@angular/router';
import { initiateCheckout } from 'src/app/store/actions/checkout.actions';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> = new Observable();
  total$: Observable<number> = new Observable();

  constructor(private store: Store<AppState>, private readonly router: Router) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);
    this.total$ = this.store.select(selectCartTotal);
  }

  removeFromCart(item: CartItem): void {
    this.store.dispatch(removeFromCart({ product: item.product }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }

  checkout(): void {
    this.cartItems$.pipe(
      map(cartItems => this.getCheckoutArray(cartItems)),
      take(1),
    ).subscribe((checkout) => this.store.dispatch(initiateCheckout({ items: checkout })) );
    this.router.navigate(["checkout"])
  }

  private getCheckoutArray(cartItems: CartItem[]): { product_id: number, quantity: number }[] {
    return cartItems.map(item => ({
      product_id: +item.product.id,
      quantity: item.quantity
    }));
  }
  
}
