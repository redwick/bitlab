import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'offers', component: AppComponent },
  { path: 'deploy', component: AppComponent },
  { path: 'skills', component: AppComponent },
  { path: 'about', component: AppComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
