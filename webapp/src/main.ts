import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { routes } from './app/app.routes'; 
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // <-- this replaces HttpClientModule
  ]
})
.catch(err => console.error(err));