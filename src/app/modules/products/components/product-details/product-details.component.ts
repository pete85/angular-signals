import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../data/product";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId: number = 0;
  errorMessage: string | undefined;
  product: Product | undefined;
  pageTitle: string | undefined;

  ngOnInit() {
    this.errorMessage = '';
    if (this.product) {
      this.pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
    }
  }

  addToBasket(product: Product) {
  }
}
