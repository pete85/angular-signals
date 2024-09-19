import {computed, effect, Injectable, signal} from '@angular/core';
import {BasketItem} from "../../models/basket";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() { }

  basketItems = signal<BasketItem[]>([]);

  basketItemsLength = effect(() => console.log('Basket size: ', this.basketItems().length));

  basketCount = computed(() => this.basketItems().reduce((qty, item) => qty + item.quantity, 0));

  subTotal = computed(() => this.basketItems().reduce((total, item) => total + (item.quantity * item.product.price), 0));

  deliveryFee = computed<number>(() => this.subTotal() < 50 ? 5.99 : 0);

  tax = computed(() => this.subTotal() * 0.2);

  subTotalEffect = effect(() => console.log('sub total: ', this.subTotal()));

  addToBasket(product: Product): void {
    this.basketItems.update(items => [...items, {product, quantity: 1}]);
  }
}
