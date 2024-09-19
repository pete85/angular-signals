import {Component, computed, HostListener, inject, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {BasketItem} from "../../../../models/basket";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BasketService} from "../../../../services/basket/basket.service";
import {FormsModule} from "@angular/forms";
import {MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatFormField,
    MatInput,
    MatLabel,
    NgForOf,
    FormsModule,
    MatMiniFabButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss'
})
export class BasketItemComponent implements OnChanges {

  innerHeight!: number;
  innerWidth!: number;
  private _basketService = inject(BasketService);
  @Input({required: true}) basketItem!: BasketItem;
  @Input() itemIndex!: number;
  basketItems = this._basketService.basketItems();
  quantityOptions = computed<number[]>(() => [...Array(this.basketItem.product.quantityInStock).keys()].map(x => x + 1));

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  }

  constructor() {
    this.onResize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['itemIndex']) {
      console.log('Index: ', this.itemIndex);
    }
  }

  onQuantitySelected(item: BasketItem, quantity: number) {
    this._basketService.updateQuantity(item, Number(quantity));
  }

  onRemoveItem(item: BasketItem) {
    this._basketService.removeItem(item);
  }

}
