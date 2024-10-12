import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

const LIMIT = 6;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Obtener productos con limitador
  getProducts(page: number): Observable<ProductModel[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`, {
      params: {
        limit: page * LIMIT,
      },
    });
  }

  // Obtener un producto específico por ID
  getProduct(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  // Obtener productos por su categoria
  getProductsByCategory(category: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}/category/${category}`);
  }
}