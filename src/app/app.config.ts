import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {InMemoryScrollingFeature, provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
  //providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'top'})), provideClientHydration()]
};
