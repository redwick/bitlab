import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-skills',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  animations: [
    trigger('right', [
      transition('closed => init',
        [
          animate(
            '1s',
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
      transition('init => closed', [animate('100ms', style({opacity: 0}))]),
    ]),
    trigger('left', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(-100px)',
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
      transition('init => closed', [animate('100ms', style({opacity: 0}))]),
    ]),
    trigger('bottom', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(0, 100px)',
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
      transition('init => closed', [animate('100ms', style({opacity: 0}))]),
    ]),
    trigger('text-color', [
      transition('closed => init',
        [
          animate(
            '2s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-color)',
                  offset: 0
                }
              ),
              style({
                opacity: 1,
                color: 'var(--main-active-color)',
                offset: 1
              }),
            ]),
          )
        ]),
      transition('init => closed', [animate('100ms', style({opacity: 0}))]),
    ]),
  ]
})
export class SkillsComponent implements OnInit{
  uses: string[] = [
    'современные',
    'популярные',
    'практичные',
    'проверенные',
  ];
  having: string[] = [
    'распределённые',
    'отказоустойчивые',
    'высокоуровневые',
    'масштабируемые',
  ];
  init = false;
  constructor(public router: Router) {
  }
  ngOnInit(): void {
    this.router.events.pipe(filter(x => x instanceof NavigationStart)).subscribe((event) => {
      let e = event as NavigationStart;
      this.init = e.url.includes('skills');
    });
  }
}
