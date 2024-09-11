import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../data/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>('');
  }
}
