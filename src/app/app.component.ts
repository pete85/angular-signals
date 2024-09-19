//import 'zone.js/dist/zone';  // Required for Stackblitz
import {Component, computed, HostListener, inject, Input} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {BasketService} from "./services/basket/basket.service";
import {MatBadge} from "@angular/material/badge";
import {BasketItem} from "./models/basket";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadge
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _basketService = inject(BasketService);

  basketCount = this._basketService.basketCount;
  events: string[] = [];
  innerHeight!: number;
  innerWidth!: number;
  menuOpen!: boolean;
  pageTitle = 'Demo Product Management';

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  }

  constructor() {
    this.onResize();
  }

}
