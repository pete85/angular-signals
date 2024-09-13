import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import {Product} from "../../data/product";
import {environment} from "../../../environments/environment";
import {ProductData} from "../../data/product-data";
import {HttpErrorService} from "../http-error/http-error.service";
import {ReviewsService} from "../reviews/reviews.service";
import {Review} from "../../data/review";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environment.baseUrls.products;

  constructor(
    private _http: HttpClient,
    private _httpErrorService: HttpErrorService,
    private _reviewsService: ReviewsService
  ) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this._http.get<Product>(`${this.baseUrl}/${productId}`).pipe(
      switchMap(product => this.getProductWithReviews(product)),
      catchError(err => this.handleError(err))
    );
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this._http.get<Review[]>(this._reviewsService.getReviewUrl(product.id))
        .pipe(
          map(reviews => ({ ...product, reviews } as Product))
        )
    } else {
      return of(product);
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this._httpErrorService.formatError(err);
    return throwError(() => formattedMessage);
    // throw formattedMessage;
  }
}
