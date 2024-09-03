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
    new NavMenu('/home', 'Главная'),
    new NavMenu('/offers', 'Предложения'),
    new NavMenu('/skills', 'Технологии'),
    new NavMenu('/deploy', 'Реализация'),
    new NavMenu('/about', 'Контакты'),
  ];
}
