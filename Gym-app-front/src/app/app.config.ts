import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { authInterceptor } from './Interceptors/interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]),withFetch()), provideAnimations(), provideNativeDateAdapter()],
};
