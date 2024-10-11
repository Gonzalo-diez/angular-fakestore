import { Injectable } from '@angular/core';
import { ProductItemCart } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageKey = 'cartItems';

  // Guardar el carrito en localStorage
  saveCart(cartItems: ProductItemCart[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
    }
  }

  // Obtener el carrito de localStorage
  getCart(): ProductItemCart[] {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem(this.storageKey);
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  }

  // Limpiar el carrito de localStorage
  clearCart(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }
}
