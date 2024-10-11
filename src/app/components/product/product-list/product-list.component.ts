import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: ProductModel[] = [];
  limit: number = 6;
  currentPage: number = 1;
  categories: string[] = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
  selectedCategory: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.selectedCategory = category;
        this.loadProductsByCategory();
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    const offset = (this.currentPage - 1) * this.limit;
    console.log(`Cargando productos con límite de ${this.limit} y offset de ${offset}`);
    this.productService.getProducts(this.limit, offset).subscribe({
      next: (data) => {
        console.log('Productos cargados:', data);
        this.products = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  loadProductsByCategory(): void {
    if (!this.selectedCategory) return;

    this.productService.getProductsByCategory(this.selectedCategory).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error al cargar productos por categoría:', error);
      }
    });
  }
}