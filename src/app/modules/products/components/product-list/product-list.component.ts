import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../../data/product";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {ProductsService} from "../../../../services/products/products.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductDetailsComponent,
    NgClass,
    NgIf,
    NgForOf,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatInput,
    MatLabel,
    MatSelect
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  pageTitle!: string;
  products!: Product[];
  selectedProductId!: number;
  subProducts$!: Subscription;
  subscriptionList: Subscription = new Subscription();

  constructor(private _productsService: ProductsService) {
  }

  ngOnInit() {
    this.pageTitle = 'Products';
    this.products = [];
    this.getProducts();
  }

  getProducts() {
    this.subProducts$ = this._productsService.getProducts().subscribe({
      next: response => {
        this.subscriptionList.add(this.subProducts$);
        if (response) {
          console.log('RES: ', response);
          this.products = response;
        }
      },
      error: err => {
        console.error('Could not retrieve products.', err);
        this.errorMessage = 'Could not retrieve products.';
      },
      complete: () => {}
    });
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
    console.log('selected', this.selectedProductId);
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
