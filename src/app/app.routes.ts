import { Routes } from '@angular/router';
import { HomeComponent} from "./components/home/home.component";
import { PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    loadComponent: () => import('./modules/products/components/product-list/product-list.component').then(c => c.ProductListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./modules/cart/components/cart-shell/cart-shell.component').then(c => c.CartShellComponent)
  },
  { path: '**', component: PageNotFoundComponent }];
