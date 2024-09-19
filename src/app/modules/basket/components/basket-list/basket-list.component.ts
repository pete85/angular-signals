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
import {BasketTotalComponent} from "../basket-total/basket-total.component";

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
    BasketItemComponent,
    BasketTotalComponent
  ],
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.scss'
})
export class BasketListComponent {

  private _basketService = inject(BasketService);
  basketItems = this._basketService.basketItems;

  @ViewChild(MatTable) table!: MatTable<BasketItem>;

}
