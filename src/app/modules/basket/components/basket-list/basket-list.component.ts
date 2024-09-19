import {Component, inject, ViewChild} from '@angular/core';
import {BasketService} from "../../../../services/basket/basket.service";
import {BasketItem} from "../../../../models/basket";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {CurrencyPipe, NgIf} from "@angular/common";
import {BasketItemComponent} from "../basket-item/basket-item.component";

@Component({
  selector: 'app-basket-list',
  standalone: true,
  imports: [
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    CurrencyPipe,
    BasketItemComponent
  ],
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.scss'
})
export class BasketListComponent {

  private _basketService = inject(BasketService);
  basketItems: BasketItem[] = this._basketService.basketItems();
  // dataSource = [...this.basketItems];
  dataSource: BasketItem[] = [
    {
      product: {
        id: 1,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        description: 'Leaf rake with 48-inch wooden handle',
        price: 19.95,
        quantityInStock: 15,
        hasReviews: true
      },
      quantity: 2
    },
    {
      product: {
        id: 2,
        productName: 'Garden Cart',
        productCode: 'GDN-0023',
        description: '15 gallon capacity rolling garden cart',
        price: 32.99,
        quantityInStock: 2,
        hasReviews: true
      },
      quantity: 5
    }

  ];
  displayedColumns: string[] = ['position', 'product', 'price', 'quantity'];

  @ViewChild(MatTable) table!: MatTable<BasketItem>;

}
