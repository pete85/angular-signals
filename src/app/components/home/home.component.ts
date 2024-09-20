import { Component } from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSlideToggle,
    NgOptimizedImage,
    MatButton,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
