import { Injectable, inject } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from './product.service';
import { Observable, map, switchMap } from 'rxjs';

interface State {
  product: ProductModel | null;
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductDetailStateService {
  private productService = inject(ProductService);

  private initialState: State = {
    product: null,
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => this.productService.getProduct(id)),
          map((data) => ({ product: data, status: 'success' as const })),
        ),
    },
  });
}