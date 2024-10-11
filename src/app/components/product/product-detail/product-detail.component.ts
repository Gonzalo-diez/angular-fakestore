import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [NgIf],
  styleUrls: ['./product-detail.component.css'],
  standalone: true
})
export class ProductDetailComponent implements OnInit {
  product!: ProductModel;
  isLoading: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.productService.getProduct(id);
        })
      )
      .subscribe({
        next: (product) => {
          this.product = product;
          this.isLoading = false; 
        },
        error: (error) => {
          console.error('Error al cargar el producto:', error);
          this.isLoading = false;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
