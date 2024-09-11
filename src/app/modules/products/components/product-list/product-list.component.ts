import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../data/product";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {ProductsService} from "../../../../services/products/products.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductDetailsComponent,
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  errorMessage!: string;
  pageTitle!: string;
  products!: Product[];
  selectedProductId!: number;
  subProducts$!: Subscription;

  constructor(private _productsService: ProductsService) {
  }

  ngOnInit() {
    this.errorMessage = '';
    this.pageTitle = 'Products';
    this.products = [];
    this.selectedProductId = 0;
    this.getProducts();
  }

  getProducts() {
    this.subProducts$ = this._productsService.getProducts().subscribe({
      next: response => {
        if (response) {
          console.log('RES: ', response);
          this.products = response;
        }
      },
      error: err => {
        console.error('Could not retrieve products.', err);
      },
      complete: () => {}
    });
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
