import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductItemCart } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [NgIf, NgFor],
  standalone: true,
})
export class CartComponent implements OnInit {
  cartItems: ProductItemCart[] = [];
  totalPrice: number = 0;
  cartId: number = 1;
  showPurchaseModal: boolean = false;
  purchaseDetails: { items: ProductItemCart[], total: number } | null = null;

  constructor(private cartService: CartService) {  }

  onCheckout() {
    const checkoutDetails = this.cartService.checkout();
    this.purchaseDetails = checkoutDetails;
    this.showPurchaseModal = true;
  }

  closeModal() {
    this.showPurchaseModal = false;
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Calcular el precio total de carrito
  calculateTotal(): void {
    this.totalPrice = this.cartService.getTotal();
  }

  // Cargar los items del carrito
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  // Incrementa la cantidad del producto en el carrito
  incrementQuantity(productId: number): void {
    this.cartService.incrementQuantity(productId);
    this.calculateTotal();
  }

  // Disminuye la cantidad del producto en el carrito
  decrementQuantity(productId: number): void {
    this.cartService.decrementQuantity(productId);
    this.calculateTotal();
  }

  // Elimina el producto del carrito
  removeItemFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCartItems();
  }

  // Vacia el carrito
  clearCart(): void {
    this.cartService.clearLocalCart();
    this.loadCartItems();
  }
}
