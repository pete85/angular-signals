import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AppData} from "./app.data";

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      FormsModule,
      InMemoryWebApiModule.forRoot(AppData, { delay: 1000 })
    ),
  ]
};
