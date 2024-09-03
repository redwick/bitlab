import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Offer} from "../offers/offer";
import {PlusMinus} from "../deploy/plus-minus";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RecaptchaModule} from "ng-recaptcha";
import {of} from "rxjs";
import {DesktopComponent} from "../desktop/desktop.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {Router} from "@angular/router";
import {NotifyMessage} from "../about/notify-message";
import {HttpClient} from "@angular/common/http";
import {MessageSendComponent} from "../about/message-send/message-send.component";

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgStyle,
    MessageSendComponent
  ],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.css'
})
export class MobileComponent implements OnInit{

  offers: Offer[] = [
    new Offer('Сайты и Web-приложения', 'web.svg', [
      'От простого сайта-визитки или сайта компании до разработки сложных сайтов, требующих наличия системы авторизации, платёжных систем, бизнес-логики и интреграции с другими приложениями.',
      'Помогаем в регистрации домена, размещение на хостинге, установка SSL сертификатов.'
    ], 'Разработка и дизайн сайтов любой сложности.'),
    new Offer('SEO оптимизация и продвижение', 'seo.svg', [
      'Установка счётчиков, метрики и других аналитических средств сбора данных.',
      'Продвижение в поисковых системах Yandex, Google, Mail.RU',
      'Реклама вашего сайта или приложения на платформах Яндекс.Директ, ВК Реклама и др.'
    ], 'Оптимизация сайта для лучшего индексирования в поисковых системах.'),
    new Offer('Мобильная разработка', 'app.svg', [
      'Публикация во всевозможных магазинах приложений GooglePlay, AppStore, AppGallery, RuStore.',
      'Опубликуем от нашего имени или поможем вам зарегистрировать вашу компанию в магазинах приложений.'
    ], 'Создание мобильных приложений для Android и iOS.'),
    new Offer('Десктопные приложения', 'desktop.svg', [
      'Подходит для разработки копоративного ПО и приложений для бизнеса.',
      'Используется когда необходимо задействовать все вычислительные мощности вашего ПК.',
      'Будет работать без доступа в интернет или локальной сети.',
    ], 'Разработка приложений для компьютеров под управлением ОС Microsoft Windows или Apple MacOS.'),
    new Offer('Интеграции и плагины', 'plugin.svg', [
      'Разработка дополнительных инструментов для работы с вашими приложениями.',
      'Сбор и аггрегация информационных и статистических данных с ваших приложений.',
    ], 'Расширение возможностей и функционала имеющихся у вас приложений.',),
    new Offer('IT парк компьютеров', 'server.svg', [
      'Установка серверов, сетевого хранилища, настройка резервного копирования, Samba, ActiveDirectory, FTP.',
      'Внедрение OpenSource ПО: корпоративный чат Rocket.Chat, облачное хранилище NextCloud, видеоконференции JitsiMeet.',
      'Настройка сети, безопасности, VPN и удалённого подключения.'
    ], 'Проектирование и настройка IT инфраструктуры вашей компании.'),
  ];
  uses: string[] = [
    'Распределенность',
    'Отказоустойчивость',
    'Масштабируемость'
  ];
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
  email = 'mail@it-bitlab.ru';
  whatsapp = '+79992127238';
  telegram = 'spiridovich_p';
  contacts = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', [Validators.required]),
    topic: new FormControl('offer'),
  });
  captchaResolved = false;
  resolved(event: string | null) {
    this.captchaResolved = true;
  }
  side = 0;
  expandedOffers: number[] = [];
  sections = [1, 2, 3, 4, 5];
  activeSection = 1;
  scrollTop = 0;
  showMessageSend = false;

  protected readonly scroll = scroll;

  constructor(public d: DeviceDetectorService, public r: Router, public http: HttpClient) {
    if (!this.d.isMobile()){
      this.r.navigate(['']);
    }
  }
  ngOnInit(): void {
    window.onscroll = () => {
      this.scrollTop = window.scrollY;
      if (this.scrollTop < 640){
        this.activeSection = 1;
      }
      else if (this.scrollTop < 1625){
        this.activeSection = 2;
      }
      else if (this.scrollTop < 2360){
        this.activeSection = 3;
      }
      else if (this.scrollTop < 3415){
        this.activeSection = 4;
      }
      else{
        this.activeSection = 5;
      }
    };
  }
  scrollToOffers() {
    window.scrollTo({top: (window.innerHeight), behavior: 'smooth'});
  }

  touchMove(event: TouchEvent) {
    console.log(event)
  }

  touchEnd(event: TouchEvent) {
    console.log(event)
  }

  headerTouchStart(event: TouchEvent) {
    this.side = event.touches[0].clientY;
  }

  headerTouchEnd(event: TouchEvent) {
    let te = event.changedTouches[0].clientY;
    if (te < this.side){
      this.scrollToOffers();
    }
  }

  getOfferDescriptionStyle(i: number) {
    if (this.offerExpanded(i)){
      return {
        'max-height': '500px',
        transition: '1s'
      };
    }
    else{
      return {
        'max-height': 0,
        opacity: 0,
        transition: '0.5s'
      };
    }
  }
  getOfferImgStyle(i: number) {
    if (this.offerExpanded(i)){
      return {
        transition: '0.5s',
      };
    }
    else{
      return {
        transition: '0.5s',
        transform: 'rotate(-90deg)'
      };
    }
  }

  toggleOffer(i: number) {
    if (this.expandedOffers.includes(i)){
      this.expandedOffers.splice(this.expandedOffers.indexOf(i), 1);
    }
    else{
      this.expandedOffers.push(i);
    }
  }

  offerExpanded(i: number) {
    return this.expandedOffers.includes(i);
  }

  showOffset($event: MouseEvent) {
    console.log(window.scrollY);
  }

  protected readonly window = window;

  scrollToTop(event: MouseEvent) {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  sendNotify() {
    let notify = new NotifyMessage();
    notify.name = this.contacts.get('name')!.value!;
    notify.company = this.contacts.get('company')!.value!;
    notify.email = this.contacts.get('email')!.value!;
    notify.text = this.contacts.get('text')!.value!;
    this.http.post<string>('https://it-bitlab.ru/rest/mail', notify).subscribe(() => {
      this.showMessageSend = true;
    });
  }
}
