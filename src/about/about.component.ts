import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {FormsModule} from "@angular/forms";
import {QRCodeModule} from "angularx-qrcode";
import {TextLocation} from "./text-location";
import {ContactComponent} from "./contact/contact.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    FormsModule,
    QRCodeModule,
    ContactComponent
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
  whatsapp = '+79992127238';
  telegram = 'spiridovich_p';

  tooltip = new TextLocation();
  qrCode = new TextLocation();
  showContact = false;



  constructor(public router: Router) {
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
}
