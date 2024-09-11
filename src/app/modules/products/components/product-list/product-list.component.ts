import { Component } from '@angular/core';
import {Product} from "../../../../data/product";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductDetailsComponent,
    NgClass
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  errorMessage = '';
  pageTitle = 'Products';
  products: Product[] = [];
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
