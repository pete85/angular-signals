import {Component, Inject, Input} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {Message} from "../../models/messages";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Message
  ) {
  }

}
