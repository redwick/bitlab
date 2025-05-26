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
  additional = -1;

  projects = [
    new Project(
      'https://s3.regru.cloud/bitlab/deepsea_1.mp4',
      'https://s3.regru.cloud/bitlab/deepsea_1_thumb.mp4',
      'DeepSea ERP',
      'Автоматизированная система управления бизнес процессами компании',
      ['Angular/TypeScript/HTML/CSS', 'ThreeJS/WebGL', 'Scala/Java', 'PostgreSQL/OracleDB', 'Docker/Kubernetes'],
      ['Информационная система', 'Рабочее место сотрудника', 'Обмен данными с внешними системами'],
      new Project(
        'https://s3.regru.cloud/bitlab/deepsea_2.mp4',
        'https://s3.regru.cloud/bitlab/deepsea_2_thumb.mp4',
        'DeepSea CRM',
        'Система планирования и учёта времени работы сотрудников',
        ['Angular/TypeScript/HTML/CSS', 'BPMN', 'Scala/Java', 'PostgreSQL/MongoDB', 'Nginx/Docker/Kubernetes'],
        ['Рабочее место сотрудника', 'Ведение задач и проектов', 'Обсуждение вопросов и обмен информацией', 'Планирование и учёт времени работы сотрудников', 'Статистика и аналитика по проектам и сотрудникам']
      ),
      ['ERP', 'CRM']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/webgpu.mp4',
      'https://s3.regru.cloud/bitlab/webgpu_thumb.mp4',
      '3D WebLab',
      'Вёб-приложение для интерактивной работы с тяжёлыми 3D-моделями',
      ['Angular/TypeScript/HTML/CSS', 'WebGPU/WebAssembly', 'Rust', 'Nginx/Docker/Kubernetes'],
      ['Оптимизация объёмных 3D моделей', 'Интерактивный осмотр в реальном времени', 'Интеллектуальное взаимодействие с объектами', 'Высокая производительность в браузере', 'Гибкая интеграция с внешними данными', 'Поддержка навигации и слоёв'],
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/spysee.mp4',
      'https://s3.regru.cloud/bitlab/spysee_thumb.mp4',
      'SpySee',
      'Программный продукт для мониторинга и контроля активности сотрудников',
      ['Electron/Angular/TypeScript/HTML/CSS', '.NET Core C#'],
      ['Распределённая система отображения видео потоков', 'Высокая производительность и низкий уровень нагрузки', 'Не требует наличия централизованного сервера и высокой пропускной способности', 'Мониторинг активности сотрудников', 'Просмотр экранов сотрудников в реальном времени', 'Учёт времени работы и бездействия сотрудников', 'Создание отчётов по работе сотрудников']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/fest.mp4',
      'https://s3.regru.cloud/bitlab/fest_thumb.mp4',
      'NauticFest',
      'Платформа для проведения спортивных мероприятий',
      ['AngularSSR/TypeScript/HTML/CSS', 'Scala/Java', 'PostgreSQL', 'Nginx/Docker'],
      ['Мобильная версия', 'Ведение протоколов соревнований', 'Учёт команд и участников', 'Планирование встреч', 'Расчёт результатов соревнований', 'Бронирование услуг мероприятия', 'Информационное табло результатов для больших экранов']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/bend.mp4',
      'https://s3.regru.cloud/bitlab/bend_thumb.mp4',
      'PipeBend',
      'Интерактивный вёб-симулятор гибки труб с поддержкой экспорта управляющего файла для станков',
      ['AngularSSR/TypeScript/HTML/CSS', 'WebGPU/WebAssembly', 'Rust', 'Nginx/Docker'],
      ['Импорт 3D-модели трубы из STP файлов', 'Интерактивное представление процесса гибки поэтапно', 'Подробное отображение характеристик каждого сегмента трубы', 'Симуляция процесса гибки', 'Экспорт управляющего файла для станка', 'Высокая производительность в браузере']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/charts.mp4',
      'https://s3.regru.cloud/bitlab/charts_thumb.mp4',
      'ЦНИИТС MinLab',
      'Визуализация расчётов <a href=\"https://tsniis.com/\" target=\"_blank\">ЦНИИТС</a> приказа <a href=\"http://publication.pravo.gov.ru/document/0001202304040039\" target=\"_blank\">минпромторга Д.В.Мантурова</a> ',
      ['Angular/TypeScript/HTML/CSS', 'Nginx'],
      ['Интерактивное представление нормативов трудоёмкости строительства судов', 'Агрегация и анализ объёмных данных', 'Визуализация расчётов', 'Анализ временных рядов', 'Представление данных на экране', 'Работа с большим объёмом данных']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/nautic.mp4',
      'https://s3.regru.cloud/bitlab/nautic_thumb.mp4',
      'NauticRus',
      'Официальный сайт компании NauticRus',
      ['AngularSSR/TypeScript/HTML/CSS', 'NestJS', 'MongoDB', 'Nginx/Docker'],
      ['Официальный сайт компании', 'Отправка откликов на вакансии', 'Email рассылка', 'Мобильная версия']
    ),
    new Project(
      'https://s3.regru.cloud/bitlab/eurasian.mp4',
      'https://s3.regru.cloud/bitlab/eurasian_thumb.mp4',
      'The Eurasian',
      'Официальный сайт журнала «The Eurasian»',
      ['Angular/TypeScript/HTML/CSS', 'Ionic', 'Java/Scala', 'MongoDB', 'Nginx/Docker'],
      ['Официальный сайт компании', 'Email подписка и рассылка', 'Мобильное приложение для Adnroid и iOS'],
      new Project(
        'https://s3.regru.cloud/bitlab/eurasian24.mp4',
        'https://s3.regru.cloud/bitlab/eurasian24_thumb.mp4',
        'Eurasian 24',
        'Официальный сайт СМИ «Eurasian 24»',
        ['Angular/TypeScript/HTML/CSS', 'Ionic', 'Java/Scala', 'MongoDB', 'Nginx/Docker/AWS S3'],
        ['Официальный сайт компании', 'Email подписка и рассылка', 'Мобильное приложение для Adnroid и iOS', 'Кастомный видео плеер', 'Потоковая трансляция видео']
      ),
      ['TE', 'TE24']
    ),
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
