import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Obtener productos con limitador
  getProducts(limit: number = 6, offset: number = 0): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  // Obtener un producto específico por ID
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  // Obtener productos por su categoria
  getProductsByCategory(category: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}/category/${category}`);
  }
}