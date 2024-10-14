import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService, private router: Router) {  }

  onCheckout() {
    const checkoutDetails = this.cartService.checkout();
    this.purchaseDetails = checkoutDetails;
    this.showPurchaseModal = true;
  }

  closeModal() {
    this.showPurchaseModal = false;
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartService.getTotal();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  incrementQuantity(productId: number): void {
    this.cartService.incrementQuantity(productId);
    this.calculateTotal();
  }

  decrementQuantity(productId: number): void {
    this.cartService.decrementQuantity(productId);
    this.calculateTotal();
  }

  removeItemFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCartItems();
  }

  clearCart(): void {
    this.cartService.clearLocalCart();
    this.loadCartItems();
  }
}
