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
    new NavMenu('home', 'ГЛАВНАЯ'),
    new NavMenu('offers', 'ПРЕДЛОЖЕНИЯ'),
    new NavMenu('skills', 'ТЕХНОЛОГИИ'),
    new NavMenu('deploy', 'РЕАЛИЗАЦИЯ'),
    new NavMenu('about', 'КОНТАКТЫ'),
  ];
}
