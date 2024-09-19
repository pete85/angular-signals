import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {Product} from "../../../../models/product";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ProductsService} from "../../../../services/products/products.service";
import {catchError, EMPTY, finalize, map, tap} from "rxjs";
import {MatButton} from "@angular/material/button";
import {LoaderComponent} from "../../../../components/loader/loader.component";
import {ReviewComponent} from "../../../../components/review/review.component";
import {Review} from "../../../../models/review";
import {BasketService} from "../../../../services/basket/basket.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    MatButton,
    LoaderComponent,
    NgForOf,
    ReviewComponent,
    AsyncPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  loadingProduct!: boolean;
  product!: Product;
  pageTitle: string = 'Product details';

  private _productsService = inject(ProductsService);
  private _basketService = inject(BasketService);

  readonly product$ = this._productsService.product$.pipe(
    // tap(product => {
    //   this.pageTitle = product ? `Product Detail for: ${product.productName}` : 'Product Detail';
    // }),
    catchError(err => {
      this.loadingProduct = false;
      console.error('Could not retrieve product: ', err.message);
      return EMPTY;
    }),
    finalize(() => {
      this.loadingProduct = false;
    })
  );

  addToBasket(product: Product) {
    this._basketService.addToBasket(product);
  }
}
