import {computed, inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, map, Observable, of, shareReplay, switchMap, tap, throwError} from "rxjs";
import {Product, Result} from "../../models/product";
import {environment} from "../../../environments/environment";
import {HttpErrorService} from "../http-error/http-error.service";
import {ReviewsService} from "../reviews/reviews.service";
import {Review} from "../../models/review";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environment.baseUrls.products;
  private _http = inject(HttpClient);

  private _productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  readonly productSelected$ = this._productSelectedSubject.asObservable();

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
  productsError = computed(() => this.productsResult().error);

  readonly product$ = this.productSelected$
    .pipe(
      filter(Boolean),
      switchMap(id => {
        return this._http.get<Product>(`${this.baseUrl}/${id}`).pipe(
          switchMap(product => this.getProductWithReviews(product)),
          catchError(err => this.handleError(err))
        );
      })
    );

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
    this._productSelectedSubject.next(productId);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this._httpErrorService.formatError(err);
    return throwError(() => formattedMessage);
    // throw formattedMessage;
  }
}
