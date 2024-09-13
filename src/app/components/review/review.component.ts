import {Component, Input} from '@angular/core';
import {Review} from "../../data/review";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  @Input() review!: Review;

}
