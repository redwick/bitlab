import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {InMemoryScrollingFeature, provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HttpBackend, provideHttpClient} from "@angular/common/http";
import {GoogleTagManagerModule} from "angular-google-tag-manager";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(GoogleTagManagerModule.forRoot({
      id: 'GTM-KP7W26CQ',
    }))
  ]
  //providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'top'})), provideClientHydration()]
};
