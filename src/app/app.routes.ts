import { Routes } from '@angular/router';
import {DesktopComponent} from "../desktop/desktop.component";
import {MobileComponent} from "../mobile/mobile.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DesktopComponent },
  { path: 'm', component: MobileComponent },
  { path: '**', component: DesktopComponent },
];
