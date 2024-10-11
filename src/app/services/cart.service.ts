import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel, ProductItemCart } from '../models/product.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://fakestoreapi.com/carts';
  private cart: ProductItemCart[] = [];

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.loadCartFromStorage()
  }

  // Cargar el carrito desde el almacenamiento
  private loadCartFromStorage(): void {
    this.cart = this.storageService.getCart();
  }

  // Agregar producto al carrito
  addToCart(product: ProductModel, quantity: number): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    this.storageService.saveCart(this.cart);
  }

  // Obtener el carrito desde la API
  getCart(): Observable<ProductItemCart[]> {
    return this.http.get<ProductItemCart[]>(this.apiUrl);
  }

  // Crear un carrito en la API
  createCart(cart: ProductItemCart[]): Observable<ProductItemCart[]> {
    return this.http.post<ProductItemCart[]>(this.apiUrl, cart);
  }

  // Obtener los elementos del carrito
  getCartItems(): ProductItemCart[] {
    return this.cart;
  }

  // Método para obtener el total del carrito
  getTotal(): number {
    return this.cart.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity);
    }, 0);
  }

  // Método para eliminar el producto del carrito
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.storageService.saveCart(this.cart);
  }

  // Método para incrementar la cantidad del producto en el carrito
  incrementQuantity(productId: number): void {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity += 1;
      this.storageService.saveCart(this.cart);
    }
  }

  // Método para disminuir la cantidad del producto en el carrito
  decrementQuantity(productId: number): void {
    const item = this.cart.find(item => item.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.storageService.saveCart(this.cart);
    }
  }

  // Método para limpiar el carrito local
  clearLocalCart(): void {
    this.cart = [];
    this.storageService.clearCart();
  }

  // Método para realizar la compra del carrito
  checkout(): { items: ProductItemCart[], total: number } {
    const items = this.getCartItems();
    const total = this.getTotal();
    this.clearLocalCart();
    return { items, total };
  }
}
