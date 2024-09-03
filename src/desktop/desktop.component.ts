import { Component } from '@angular/core';
import {NaviComponent} from "../navi/navi.component";
import {SectionsComponent} from "../sections/sections.component";
import {HomeComponent} from "../home/home.component";
import {OffersComponent} from "../offers/offers.component";
import {SkillsComponent} from "../skills/skills.component";
import {DeployComponent} from "../deploy/deploy.component";
import {AboutComponent} from "../about/about.component";

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    SectionsComponent
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
    components = [HomeComponent, OffersComponent, SkillsComponent, DeployComponent, AboutComponent];
    routes = ['home', 'offers', 'skills', 'deploy', 'about'];
    protected readonly NaviComponent = NaviComponent;
}