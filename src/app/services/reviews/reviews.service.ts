import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HttpErrorService} from "../http-error/http-error.service";
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../../data/product";
import {Review} from "../../data/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseUrl: string = environment.baseUrls.reviews;

  constructor(
    private _http: HttpClient,
    private _httpErrorService: HttpErrorService,
  ) { }

  getReviewUrl(productId: number): string {
    return `${this.baseUrl}?productId=^${productId}$`;
  }

  getReviews(productId: number): Observable<Review[]> {
    return this._http.get<Review[]>(`${this.baseUrl}/${productId}`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this._httpErrorService.formatError(err);
    return throwError(() => formattedMessage);
  }
}
