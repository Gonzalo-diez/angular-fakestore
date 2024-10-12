import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { Subject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { ProductService } from './product.service';

interface State {
  products: ProductModel[];
  status: 'loading' | 'success' | 'error';
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private productService = inject(ProductService);

  private initalState: State = {
    products: [],
    status: 'loading' as const,
    page: 1,
  }

  changePage$ = new Subject<number>();
  
  loadProducts$ = this.changePage$.pipe(
    startWith(1),
    switchMap((page) => this.productService.getProducts(page)),
    map((products) => ({ products, status: 'success' as const })),
    catchError(() => {
      return of({
        products: [],
        status: 'error' as const,
      });
    }),
  );

  state = signalSlice({
    initialState: this.initalState,
    sources: [
      this.changePage$.pipe(
        map((page) => ({ page, status: 'loading' as const})),
      ),
      this.loadProducts$,
    ],
  });
}
