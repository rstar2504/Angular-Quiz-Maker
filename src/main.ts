import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app.component';
import { appRoutes } from './app.routes'

bootstrapApplication(App, 
  {
   providers: [
     provideRouter(appRoutes),
   ]
  })
.catch(err => console.error(err));