import { Injectable, inject } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from './product.service';
import { Observable, map, switchMap, catchError, of } from 'rxjs';

interface State {
  products: ProductModel[];
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductCategoryStateService {
  private productService = inject(ProductService);

  private initialState: State = {
    products: [],
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getByCategory: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((category) =>
            this.productService.getProductsByCategory(category).pipe(
              map((data) => ({
                products: data, 
                status: 'success' as const,
              })),
              catchError(() =>
                of({
                  products: [], 
                  status: 'error' as const,
                })
              )
            )
          )
        ),
    },
  });
}
