import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppRoutingModule)
  ]
};
