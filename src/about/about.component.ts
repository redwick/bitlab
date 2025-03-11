import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {QRCodeModule} from "angularx-qrcode";
import {TextLocation} from "./text-location";
import {ContactComponent} from "./contact/contact.component";
import {RecaptchaModule} from "ng-recaptcha";
import {NotifyMessage} from "./notify-message";
import {HttpClient} from "@angular/common/http";
import {MessageSendComponent} from "./message-send/message-send.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    FormsModule,
    QRCodeModule,
    ContactComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    MessageSendComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
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
    trigger('in', [
      transition(':enter',
        [
          animate(
            '200ms',
            keyframes([
              style(
                {
                  opacity: 0,
                  offset: 0
                }
              ),
              style({
                opacity: 1,
                offset: 1
              }),
            ]),
          )
        ]),
      transition(':leave', [animate('200ms', style({opacity: 0}))]),
    ]),
  ]
})
export class AboutComponent implements OnInit{
  init = false;
  email = 'mail@it-bitlab.ru';
  whatsapp = '+79216118165';
  telegram = 'redwick';

  tooltip = new TextLocation();
  qrCode = new TextLocation();
  showContact = false;
  showMessageSend = false;
  captchaResolved = false;


  contacts = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]),
    text: new FormControl('', [Validators.required]),
    company: new FormControl(''),
    topic: new FormControl('offer'),
  });

  constructor(public router: Router, public http: HttpClient) {
  }
  ngOnInit(): void {
    this.router.events.pipe(filter(x => x instanceof NavigationStart)).subscribe((event) => {
      let e = event as NavigationStart;
      this.init = e.url.includes('about');
    });
  }

  copyEmail(event: MouseEvent) {
    navigator.clipboard.writeText(this.email).then(() => {});
    this.showTextLocation(this.tooltip, event.clientX, event.clientY, 'E-mail скопирован');
  }

  showTextLocation(textLocation: TextLocation, x: number, y: number, text: string, timeOut = true){
    textLocation.set(text, x, y);
    if (timeOut){
      setTimeout(() => {
        textLocation.set('');
      }, 1000);
    }
  }
  getTextLocationStyle(textLocation: TextLocation) {
    return {
      position: 'fixed',
      left: 'calc(' + textLocation.x + 'px + 1vh)',
      top: 'calc(' + textLocation.y + 'px - 2vh)',
    };
  }

  resolved(event: string | null) {
    this.captchaResolved = true;
  }

  sendNotify() {
    let notify = new NotifyMessage();
    notify.name = this.contacts.get('name')!.value!;
    notify.company = this.contacts.get('company')!.value!;
    notify.email = this.contacts.get('email')!.value!;
    notify.text = this.contacts.get('text')!.value!;
    this.http.post<string>('https://it-bitlab.ru/rest/mail', notify).subscribe(() => {
      this.contacts.reset();
      this.showMessageSend = true;
    });
  }
}
