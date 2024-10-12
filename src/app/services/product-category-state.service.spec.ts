import { TestBed } from '@angular/core/testing';

import { ProductCategoryStateService } from './product-category-state.service';

describe('ProductCategoryStateService', () => {
  let service: ProductCategoryStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
