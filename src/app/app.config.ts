import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {InMemoryScrollingFeature, provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient()]
  //providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'top'})), provideClientHydration()]
};
