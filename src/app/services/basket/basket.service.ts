import {computed, effect, Injectable, signal} from '@angular/core';
import {BasketItem} from "../../models/basket";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() { }

  taxRate: number = 0.2

  basketItems = signal<BasketItem[]>([]);

  basketItemsLength = effect(() => console.log('Basket size: ', this.basketItems().length));

  basketCount = computed(() => this.basketItems().reduce((qty, item) => qty + item.quantity, 0));

  subTotal = computed(() => this.basketItems().reduce((total, item) => total + (item.quantity * item.product.price), 0));

  deliveryFee = computed<number>(() => this.subTotal() < 50 ? 5.99 : 0);

  tax = computed(() => this.subTotal() * this.taxRate);

  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

  subTotalEffect = effect(() => console.log('sub total: ', this.subTotal()));

  addToBasket(product: Product): void {

    const index = this.basketItems().findIndex(item =>
      item.product.id === product.id);

    if (index === -1) {
      this.basketItems.update(items => [...items, { product, quantity: 1 }]);
    } else {
      this.basketItems.update(items =>
        [
          ...items.slice(0, index),
          { ...items[index], quantity: items[index].quantity + 1 },
          ...items.slice(index + 1)
        ]);
    }

    // this.basketItems.update(items => [...items, {product, quantity: 1}]);
  }

  updateQuantity(basketItem: BasketItem, quantity: number): void {
    this.basketItems.update(items =>
    items.map(item => item.product.id === basketItem.product.id ? {...item, quantity} : item));
  }

  removeItem(basketItem: BasketItem): void {
    this.basketItems.update(items =>
      items.filter(item => item.product.id !== basketItem.product.id )
    );
  }
}
