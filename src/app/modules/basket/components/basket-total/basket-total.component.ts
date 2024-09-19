import {Component, inject} from '@angular/core';
import {BasketService} from "../../../../services/basket/basket.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-basket-total',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './basket-total.component.html',
  styleUrl: './basket-total.component.scss'
})
export class BasketTotalComponent {

  private _basketService = inject(BasketService);

  basketItems = this._basketService.basketItems;
  deliveryFee = this._basketService.deliveryFee;
  pageTitle: string = 'Total';
  subTotal = this._basketService.subTotal;
  tax = this._basketService.tax;

}
