import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes,
} from '@angular/animations';
import {NgIf} from "@angular/common";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {GoogleTagManagerService} from "angular-google-tag-manager";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    NgIf
  ],
  animations: [
    trigger('firstRow', [
      transition(':enter',
        [
          animate(
            '2s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(100px)',
                  offset: 0
                }
              ),
              style({
                opacity: 1,
                color: 'var(--main-color)',
                transform: 'translate(0)',
                offset: 1
              }),
            ]),
          )
        ]),
      transition(':leave', [animate('100ms', style({opacity: 0}))]),
    ]),
    trigger('secondRow', [
      transition(':enter',
        [
          animate(
            '2s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(-100px)',
                  offset: 0
                }
              ),
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(-100px)',
                  offset: 0.3
                }
              ),
              style({
                opacity: 1,
                color: 'var(--main-color)',
                transform: 'translate(0)',
                offset: 1
              }),
            ]),
          )
        ]),
      transition(':leave', [animate('100ms', style({opacity: 0}))]),
    ]),
    trigger('thirdRow', [
      transition(':enter',
        [
          animate(
            '2s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(100px)',
                  offset: 0
                }
              ),
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(100px)',
                  offset: 0.6
                }
              ),
              style({
                opacity: 1,
                color: 'var(--main-color)',
                transform: 'translate(0)',
                offset: 1
              }),
            ]),
          )
        ]),
      transition(':leave', [animate('100ms', style({opacity: 0}))]),
    ]),
  ]
})
export class HomeComponent implements OnInit{

  init = false;

  constructor(private router: Router, private gtmService: GoogleTagManagerService) {
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(x => x instanceof NavigationStart)).subscribe((event) => {
      let e = event as NavigationStart;
      this.init = e.url.includes('home') || e.url == '/';
      console.log('home');
      const gtmTag = {
        event: 'page',
        pageName: e.url
      };
      this.gtmService.pushTag(gtmTag);
    });
  }


}
