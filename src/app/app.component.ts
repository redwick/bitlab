import { Component } from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {SectionsComponent} from "../sections/sections.component";
import {HomeComponent} from "../home/home.component";
import {OffersComponent} from "../offers/offers.component";
import {AboutComponent} from "../about/about.component";
import {NaviComponent} from "../navi/navi.component";
import {DeployComponent} from "../deploy/deploy.component";
import {SkillsComponent} from "../skills/skills.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {MobileComponent} from "../mobile/mobile.component";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SectionsComponent, NaviComponent, MobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  components = [HomeComponent, OffersComponent, SkillsComponent, DeployComponent, AboutComponent];
  routes = ['home', 'offers', 'skills', 'deploy', 'about'];
  protected readonly NaviComponent = NaviComponent;
  constructor(public d: DeviceDetectorService, private router: Router, private gtmService: GoogleTagManagerService) {
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe((event) => {
      let e = event as NavigationEnd;
      const gtmTag = {
        event: 'page',
        pageName: e.url
      };
      this.gtmService.pushTag(gtmTag);
    });
  }
}
