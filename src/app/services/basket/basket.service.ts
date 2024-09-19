import {Injectable, signal} from '@angular/core';
import {BasketItem} from "../../models/basket";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() { }

  basketItems = signal<BasketItem[]>([]);
}
