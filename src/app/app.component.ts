//import 'zone.js/dist/zone';  // Required for Stackblitz
import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {BasketService} from "./services/basket/basket.service";
import {MatBadge} from "@angular/material/badge";

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
  menuOpen!: boolean;
  pageTitle = 'Demo Product Management';


  toggleMenu() {

  }

}
