import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NavigationStart, Router} from "@angular/router";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {filter} from "rxjs";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {PlusMinus} from "../deploy/plus-minus";
import {Offer} from "../offers/offer";
import {Project} from "./project";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [
    trigger('left-right', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(-100px, 0px)',
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
    trigger('right-left', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(100px, 0px)',
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

    trigger('right-top', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(100px, -100px)',
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
    trigger('right-bottom', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(100px, 100px)',
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
    trigger('left-top', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(-100px, -100px)',
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
    trigger('left-bottom', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translate(-100px, 100px)',
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
    trigger('top', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style(
                {
                  opacity: 0,
                  color: 'var(--main-active-color)',
                  transform: 'translateY(-50px)',
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
                  transform: 'translateY(50px)',
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
    trigger('background', [
      transition('closed => init',
        [
          animate(
            '1s',
            keyframes([
              style({
                  background: 'var(--second-color)',
                  offset: 0
                }
              ),
              style({
                background: 'transparent',
                offset: 1
              }),
            ]),
          )
        ]),
      transition('init => closed', [animate('100ms', style({opacity: 0}))]),
    ]),
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms')),
      transition('inactive => active', animate('500ms'))
    ])
  ]
})
export class ProjectsComponent implements OnInit {

  flipped: Project[] = [];
  video: Project | undefined;

  projects = [
    new Project(
      'https://s3.regru.cloud/bitlab/deepsea_1.mp4',
      'https://s3.regru.cloud/bitlab/deepsea_1_thumb.mp4',
      'DeepSea ERP',
      'Автоматизированная система управления бизнес процессами компании',
      ['Angular/TypeScript/HTML/CSS', 'ThreeJS/WebGL', 'Scala/Java', 'PostgreSQL/OracleDB', 'Docker/Kubernetes'],
      ['Информационная система', 'Рабочее место сотрудника', 'Обмен данными с внешними системами']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/deepsea_2.mp4',
      'https://s3.regru.cloud/bitlab/deepsea_2_thumb.mp4',
      'DeepSea CRM',
      'Система планирования и учёта времени работы сотрудников',
      ['Angular/TypeScript/HTML/CSS', 'BPMN', 'Scala/Java', 'PostgreSQL/MongoDB', 'Nginx/Docker/Kubernetes'],
      ['Рабочее место сотрудника', 'Ведение задач и проектов', 'Обсуждение вопросов и обмен информацией', 'Планирование и учёт времени работы сотрудников', 'Статистика и аналитика по проектам и сотрудникам']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/webgpu.mp4',
      'https://s3.regru.cloud/bitlab/webgpu_thumb.mp4',
      'Web3D Viewer',
      'Браузерный сервис для визуализации объёмных 3D моделей',
      ['Angular/TypeScript/HTML/CSS', 'BPMN', 'Scala/Java', 'PostgreSQL/MongoDB', 'Nginx/Docker/Kubernetes'],
      ['Рабочее место сотрудника', 'Ведение задач и проектов', 'Обсуждение вопросов и обмен информацией', 'Планирование и учёт времени работы сотрудников', 'Статистика и аналитика по проектам и сотрудникам']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/nautic.mp4',
      'https://s3.regru.cloud/bitlab/nautic_thumb.mp4',
      'NauticRus',
      'Официальный сайт компании NauticRus',
      ['Angular/TypeScript/HTML/CSS', 'NestJS', 'MongoDB', 'Nginx/Docker'],
      ['Официальный сайт компании', 'Отправка откликов на вакансии', 'Email рассылка']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/eurasian.mp4',
      'https://s3.regru.cloud/bitlab/eurasian_thumb.mp4',
      'The Eurasian',
      'Официальный сайт журнала The Eurasian',
      ['Angular/TypeScript/HTML/CSS', 'Ionic', 'Java/Scala', 'MongoDB', 'Nginx/Docker'],
      ['Официальный сайт компании', 'Email подписка и рассылка', 'Мобильное приложение для Adnroid и iOS']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/spysee.mp4',
      'https://s3.regru.cloud/bitlab/spysee_thumb.mp4',
      'SpySee',
      'Программный продукт для мониторинга и контроля активности сотрудников',
      ['Electron/Angular/TypeScript/HTML/CSS', '.NET Core C#'],
      ['Мониторинг активности сотрудников', 'Просмотр экранов сотрудников в реальном времени', 'Учёт времени работы и бездействия сотрудников', 'Создание отчётов по работе сотрудников']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/charts.mp4',
      'https://s3.regru.cloud/bitlab/charts_thumb.mp4',
      'MinCharts',
      'Демо проект цифровизации расчёта судовых заказов минпромторга',
      ['Angular/TypeScript/HTML/CSS', 'Nginx'],
      []
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/eurasian24.mp4',
      'https://s3.regru.cloud/bitlab/eurasian24_thumb.mp4',
      'Eurasian24',
      'Официальный сайт СМИ «Евразия 24»',
      ['Angular/TypeScript/HTML/CSS', 'Ionic', 'Java/Scala', 'MongoDB', 'Nginx/Docker/AWS S3'],
      ['Официальный сайт компании', 'Email подписка и рассылка', 'Мобильное приложение для Adnroid и iOS', 'Кастомный видео плеер', 'Потоковая трансляция видео']
    )
  ];

  init = false;
  constructor(public router: Router) {
  }
  ngOnInit(): void {
    this.router.events.pipe(filter(x => x instanceof NavigationStart)).subscribe((event) => {
      let e = event as NavigationStart;
      this.init = e.url.includes('projects');
      setTimeout(() => {
        this.flipped = [];
      }, 1000);
    });
  }

  toggleFlip(flip: Project) {
    if (this.flipped.includes(flip)){
      this.flipped.splice(this.flipped.indexOf(flip), 1);
    }
    else{
      this.flipped.push(flip);
    }
  }

  getFlipState(flip: Project) {
    return this.flipped.includes(flip) ? 'active' : 'inactive';
  }

  openVideo(project: Project) {
    this.video = project;
    console.log(this.video);
  }

  closeVideo() {
    this.video = undefined;
  }
}
