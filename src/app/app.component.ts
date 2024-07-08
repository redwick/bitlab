import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SectionsComponent} from "../sections/sections.component";
import {HomeComponent} from "../home/home.component";
import {OffersComponent} from "../offers/offers.component";
import {AboutComponent} from "../about/about.component";
import {NaviComponent} from "../navi/navi.component";
import {DeployComponent} from "../deploy/deploy.component";
import {SkillsComponent} from "../skills/skills.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SectionsComponent, NaviComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  components = [HomeComponent, OffersComponent, SkillsComponent, DeployComponent, AboutComponent];
  routes = ['home', 'offers', 'deploy', 'skills', 'about'];
  protected readonly NaviComponent = NaviComponent;
}
