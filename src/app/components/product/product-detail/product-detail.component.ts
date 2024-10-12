import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductDetailStateService } from '../../../services/product-detail-state.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [CurrencyPipe],
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  providers: [ProductDetailStateService],
})
export class ProductDetailComponent {
  productDetailState = inject(ProductDetailStateService).state;

  id = input.required<string>();

  constructor(private router: Router) {
    effect(() => {
      this.productDetailState.getById(this.id());
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
