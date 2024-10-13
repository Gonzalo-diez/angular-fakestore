import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: ProductModel;
  showMessage = false;

  constructor(private cartService: CartService) { }

  addToCart(quantity: number): void {
    this.cartService.addToCart(this.product, quantity);
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}