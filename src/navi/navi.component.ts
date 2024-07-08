import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavMenu} from "./nav-menu";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'navi',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent {
  navMenu: NavMenu[] = [
    new NavMenu('home', 'HOME'),
    new NavMenu('offers', 'OFFERS'),
    new NavMenu('deploy', 'DEPLOY'),
    new NavMenu('skills', 'SKILLS'),
    new NavMenu('about', 'ABOUT'),
  ];
}
