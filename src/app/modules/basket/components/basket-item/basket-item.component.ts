import {Component, Input, signal} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {BasketItem} from "../../../../models/basket";

@Component({
  selector: 'app-basket-item',
  standalone: true,
    imports: [
        CurrencyPipe
    ],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss'
})
export class BasketItemComponent {

  @Input({required: true}) set basketItem(bi: BasketItem) {
    this.item.set(bi);
  }
  @Input() itemIndex!: number;

  item = signal<BasketItem>(undefined!);

}
