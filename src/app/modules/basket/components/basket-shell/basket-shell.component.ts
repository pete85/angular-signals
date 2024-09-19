import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {BasketListComponent} from "../basket-list/basket-list.component";
import {BasketTotalComponent} from "../basket-total/basket-total.component";
import {BasketService} from "../../../../services/basket/basket.service";

@Component({
  selector: 'app-basket-shell',
  standalone: true,
  imports: [
    NgIf,
    BasketListComponent,
    BasketTotalComponent
  ],
  templateUrl: './basket-shell.component.html',
  styleUrl: './basket-shell.component.scss'
})
export class BasketShellComponent {

  private _basketService = inject(BasketService);

  basketItems = this._basketService.basketItems;
  pageTitle: string = 'Basket';

}
