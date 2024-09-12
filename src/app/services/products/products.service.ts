import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Product} from "../../data/product";
import {environment} from "../../../environments/environment";
import {ProductData} from "../../data/product-data";
import {HttpErrorService} from "../http-error/http-error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private _http: HttpClient,
    private _httpErrorService: HttpErrorService,
  ) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this._http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this._httpErrorService.formatError(err);
    return throwError(() => formattedMessage);
    // throw formattedMessage;
  }
}
