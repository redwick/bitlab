import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlusMinus} from "./plus-minus";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-deploy',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './deploy.component.html',
  styleUrl: './deploy.component.css',
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
export class DeployComponent implements OnInit{
  cloud: PlusMinus = new PlusMinus([
    'высокая эффективность, возможность подобрать оптимальные конфигурации серверов',
    'быстрая масштабируемость, новые сервера добавляются за несколько минут',
    'неограниченные ресурсы, нет необходимости заботится о вместимости серверного шкафа',
  ], [
    'ежемесячная плата, необходимо платить за обслуживание и резервное копирование серверов',
    'зависимость от провайдера, вы полагаетесь на надёжность провайдера в предоставлении услуг',
  ]);
  server: PlusMinus = new PlusMinus([
    'полная автономность, вы не зависите от работы провайдеров и сторонних сервисов',
    'безопасность, только вы имеете доступ к серверам и регилируете их работу',
    'отсутствие ежемесячной платы за обслуживание серверов',
  ], [
    'требуется больше времени на подготовку и запуск приложения',
    'приобретение и сборка серверов требует значительных средств',
    'масштабирование требует приобретения дополнительных серверов',
  ]);
  init = false;
  constructor(public router: Router) {
  }
  ngOnInit(): void {
    this.router.events.pipe(filter(x => x instanceof NavigationStart)).subscribe((event) => {
      let e = event as NavigationStart;
      this.init = e.url.includes('deploy');
    });
  }
}
