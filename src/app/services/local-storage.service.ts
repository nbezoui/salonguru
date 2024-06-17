// services/local-storage.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageKey = 'salonguruCart';

  getCartItems(): CartItem[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  setCartItems(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  clearCartItems(): void {
    localStorage.removeItem(this.storageKey);
  }
}
