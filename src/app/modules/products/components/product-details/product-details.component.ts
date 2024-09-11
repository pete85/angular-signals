import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Product} from "../../../../data/product";
import {CurrencyPipe, NgIf} from "@angular/common";
import {ProductsService} from "../../../../services/products/products.service";
import {Subscription} from "rxjs";
import {MatButton} from "@angular/material/button";
import {LoaderComponent} from "../../../../components/loader/loader.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    MatButton,
    LoaderComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() productId!: number;
  errorMessage!: string;
  loadingProduct!: boolean;
  product!: Product;
  pageTitle!: string;
  subProduct$!: Subscription;
  subscriptionList: Subscription = new Subscription();

  constructor(private _productsService: ProductsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['productId']) {
      this.getProduct(this.productId);
    }
  }

  ngOnInit() {
    this.errorMessage = '';
    if (this.product) {
      this.pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
    }
  }

  getProduct(id: number) {
    this.loadingProduct = true;
    this.subProduct$ = this._productsService.getProduct(id).subscribe({
      next: response => {
        this.product = response;
        console.log('Product: ', response);
        this.loadingProduct = false;
      },
      error: error => {
        console.error('Could not retrieve product: ', error);
        this.loadingProduct = false;
      }
    });
  }

  addToBasket(product: Product) {
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
