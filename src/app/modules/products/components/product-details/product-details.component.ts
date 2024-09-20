import {Component, computed, inject} from '@angular/core';
import {Product} from "../../../../models/product";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ProductsService} from "../../../../services/products/products.service";
import {MatButton} from "@angular/material/button";
import {LoaderComponent} from "../../../../components/loader/loader.component";
import {ReviewComponent} from "../../../../components/review/review.component";
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

  private _productsService = inject(ProductsService);
  private _basketService = inject(BasketService);

  product = this._productsService.product;
  errorMessage = this._productsService.productError;
  pageTitle = computed(() => this.product() ? `${this.product()?.productName}` : 'Products');
  productQty = computed(() => this.product()?.quantityInStock ?? 0);
  basketItems = this._basketService.basketItems;

  qtyLeft = computed(() => {
    const selectedItem = this.basketItems().find(item => item.product.id === this.product()?.id);
    const productQtyValue = this.productQty() ?? 0;
    const selectedItemQty = selectedItem?.quantity ?? 0;
    return productQtyValue - selectedItemQty;
  });

  addToBasket(product: Product) {
    this._basketService.addToBasket(product);
  }
}
