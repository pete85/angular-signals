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
    path: 'basket',
    loadComponent: () => import('./modules/basket/components/basket-shell/basket-shell.component').then(c => c.BasketShellComponent)
  },
  { path: '**', component: PageNotFoundComponent }];
