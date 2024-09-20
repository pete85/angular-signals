import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, map, Observable, of, shareReplay, switchMap, tap, throwError} from "rxjs";
import {Product, Result} from "../../models/product";
import {environment} from "../../../environments/environment";
import {HttpErrorService} from "../http-error/http-error.service";
import {ReviewsService} from "../reviews/reviews.service";
import {Review} from "../../models/review";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {data} from "autoprefixer";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environment.baseUrls.products;
  private _http = inject(HttpClient);

  selectedProductId = signal<number | undefined>(undefined);

  constructor(
    private _httpErrorService: HttpErrorService,
    private _reviewsService: ReviewsService
  ) {
  }

  private productsResult$ = this._http.get<Product[]>(this.baseUrl).pipe(
    map(p => ({data: p} as Result<Product[]>)),
    tap(p => console.log('Products: ', p)),
    shareReplay(1),
    catchError(err => of({data: [], error: this._httpErrorService.formatError(err)} as Result<Product[]>))
  );

  private productsResult = toSignal(this.productsResult$, {initialValue: ({data: []} as Result<Product[]>)});
  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult()?.error);

  private productResult$ = toObservable(this.selectedProductId)
    .pipe(
      filter(Boolean),
      switchMap(id => {
        return this._http.get<Product>(`${this.baseUrl}/${id}`).pipe(
          switchMap(product => this.getProductWithReviews(product)),
          catchError(err => of({data: undefined, error: this._httpErrorService.formatError(err)} as Result<Product>))
        );
      }),
      map(p => ({data: p} as Result<Product>))
    );

  private productResult = toSignal(this.productResult$, {initialValue: ({data: undefined} as Result<Product>)});
  product = computed(() => this.productResult()?.data);
  productError = computed(() => this.productResult()?.error);

  // readonly product$ = combineLatest([
  //   this.productSelected$,
  //   this.products$,
  // ]).pipe(
  //   map(([selectedProductId, products]) =>
  //     products.find(product => product.id === selectedProductId)
  //   ),
  //   filter(Boolean),
  //   switchMap(product => this.getProductWithReviews(product)),
  //   catchError(err => this.handleError(err))
  // );

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this._http.get<Review[]>(this._reviewsService.getReviewUrl(product.id))
        .pipe(
          map(reviews => ({...product, reviews} as Product))
        )
    } else {
      return of(product);
    }
  }

  productSelected(productId: number) {
    this.selectedProductId.set(productId);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this._httpErrorService.formatError(err);
    return throwError(() => formattedMessage);
    // throw formattedMessage;
  }
}
