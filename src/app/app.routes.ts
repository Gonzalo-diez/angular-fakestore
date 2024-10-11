import { Routes } from '@angular/router';
import { CartComponent } from './components/cart';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {
        path: 'products',
        loadComponent: () => import('../app/components/product/product-list').then(m => m.ProductListComponent)
    },
    {
        path: 'category/:category',
        loadComponent: () => import('../app/components/product/product-list').then(m => m.ProductListComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('../app/components/product/product-detail').then(m => m.ProductDetailComponent)
    },
    { path: '**', redirectTo: '/products' },
    { path: 'carts/1', component: CartComponent },
];