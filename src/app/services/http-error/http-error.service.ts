import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MessageTypes} from "../../models/messages";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  private _snackBar = inject(MatSnackBar);

  constructor() { }

  formatError(err: HttpErrorResponse): string {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter(err: HttpErrorResponse): string {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Error code: ${err.status} | error message: ${err.statusText}`;
    }
    this.openSnackBar(errorMessage);
    return errorMessage;
  }

  openSnackBar(err: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: {
        message: err,
        type: MessageTypes.ERROR
      },
      panelClass: `snackbar-${MessageTypes.ERROR}`
    });
  }
}
