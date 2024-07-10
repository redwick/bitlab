import {Component, OnInit} from '@angular/core';
import {Offer} from "./offer";
import {NgForOf, NgIf} from "@angular/common";
import {filter, of} from "rxjs";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
  animations: [
    trigger('right', [
      transition('closed => init',
        [
          animate(
            '0.5s',
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
            '0.5s',
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
export class OffersComponent implements OnInit{

  offers: Offer[] = [
    new Offer('Сайты и Web-приложения', 'web.png', [
      'Разработка и дизайн сайтов любой сложности.',
      'От простого сайта-визитки или сайта компании до разработки сложных сайтов, требующих наличия системы авторизации, платёжных систем, бизнес-логики и интреграции с другими приложениями.',
      'Помогаем в регистрации домена, размещение на хостинге, установка SSL сертификатов.'
    ]),
    new Offer('SEO оптимизация и продвижение', 'seo.png', [
      'Оптимизация сайта для лучшего индексирования в поисковых системах.',
      'Установка счётчиков, метрики и других аналитических средств сбора данных.',
      'Продвижение в поисковых системах Yandex, Google, Mail.RU',
      'Реклама вашего сайта или приложения на платформах Яндекс.Директ, ВК Реклама и др.'
    ]),
    new Offer('Мобильная разработка', 'mobile.png', [
      'Создание мобильных приложений для Android и iOS.',
      'Публикация во всевозможных магазинах приложений GooglePlay, AppStore, AppGallery, RuStore.',
      'Опубликуем от нашего имени или поможем вам зарегистрировать вашу компанию в магазинах приложений.'
    ]),
    new Offer('Десктопные приложения', 'desktop.png', [
      'Разработка приложений для компьютеров под управлением ОС Microsoft Windows или Apple MacOS.',
      'Подходит для разработки копоративного ПО и приложений для бизнеса.',
      'Используется когда необходимо задействовать все вычислительные мощности вашего ПК.',
      'Будет работать без доступа в интернет или локальной сети.',
    ]),
    new Offer('Интеграции и плагины', 'integration.png', [
      'Расширение возможностей и функционала имеющихся у вас приложений.',
      'Разработка дополнительных инструментов для работы с вашими приложениями.',
      'Сбор и аггрегация информационных и статистических данных с ваших приложений.',
    ]),
    new Offer('IT парк компьютеров', 'park.png', [
      'Проектирование и настройка IT инфраструктуры вашей компании.',
      'Установка серверов, сетевого хранилища, настройка резервного копирования, Samba, ActiveDirectory, FTP.',
      'Внедрение OpenSource ПО: корпоративный чат Rocket.Chat, облачное хранилище NextCloud, видеоконференции JitsiMeet.',
      'Настройка сети, безопасности, VPN и удалённого подключения.'
    ]),
  ];
  flipped: Offer[] = [];
  init = false;
  constructor(public router: Router) {
  }
  ngOnInit(): void {
    this.router.events.pipe(filter(x => x instanceof NavigationStart)).subscribe((event) => {
      let e = event as NavigationStart;
      this.init = e.url.includes('offers');
      setTimeout(() => {
        this.flipped = [];
      }, 1000);
    });
  }

  toggleFlip(offer: Offer) {
    if (this.flipped.includes(offer)){
      this.flipped.splice(this.flipped.indexOf(offer), 1);
    }
    else{
      this.flipped.push(offer);
    }
  }

  getFlipState(offer: Offer) {
    return this.flipped.includes(offer) ? 'active' : 'inactive';
  }
}
