import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/state/app.state';
import { Product } from 'src/app/models/cart-item';
import { selectAllProducts } from 'src/app/store/selectors/product.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isCartVisible = false;
  searchQuery = '';
  products$: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(selectAllProducts);
  }

  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  searchItem(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
  }
}
