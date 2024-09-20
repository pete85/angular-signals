import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from "../../../../models/product";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {catchError, EMPTY, shareReplay, Subscription, tap} from "rxjs";
import {ProductsService} from "../../../../services/products/products.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {LoaderComponent} from "../../../../components/loader/loader.component";

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
    MatSelect,
    AsyncPipe,
    LoaderComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  pageTitle: string = 'Products';
  private _productsService = inject(ProductsService);
  loadingProduct = signal<boolean>(false);

  products = this._productsService.products;
  errorMessage = this._productsService.productsError;
  selectedProductId = this._productsService.selectedProductId;



  onSelected(productId: number): void {
    this._productsService.productSelected(productId);
    this.loadingProduct.set(!this.selectedProductId());
  }
}
