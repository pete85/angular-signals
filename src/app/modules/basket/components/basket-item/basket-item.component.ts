import {Component, computed, inject, Input, signal} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {BasketItem} from "../../../../models/basket";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BasketService} from "../../../../services/basket/basket.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatFormField,
    MatInput,
    MatLabel,
    NgForOf,
    FormsModule
  ],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss'
})
export class BasketItemComponent {

  private _basketService = inject(BasketService);
  @Input({required: true}) basketItem!: BasketItem;
  @Input() itemIndex!: number;
  quantityOptions = computed<number[]>(() => [...Array(this.basketItem.product.quantityInStock).keys()].map(x => x + 1));

  onQuantitySelected(item: BasketItem, quantity: number) {
    this._basketService.updateQuantity(item, Number(quantity));
  }

}
