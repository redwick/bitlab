import {AfterViewInit, Component, ElementRef, Input, OnInit, Type, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, Routes} from "@angular/router";
import {NgComponentOutlet, NgForOf, NgIf, NgStyle} from "@angular/common";
import {NaviComponent} from "../navi/navi.component";
import {filter} from "rxjs";
import {routes} from "../app/app.routes";

@Component({
  selector: 'sections',
  standalone: true,
  imports: [
    NgForOf,
    NgComponentOutlet,
    NgStyle,
    NaviComponent,
    NgIf
  ],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class SectionsComponent implements OnInit, AfterViewInit{



  scrolledSection = 0;
  scrollDelay = false;
  scrollDelayAmount = 800;
  amountOfSections = 0;
  naviHeight = 0;
  componentStyle = {
    height: 'calc(100vh)'
  };

  @Input({required: true}) components: Type<any>[] = [];
  @Input() naviComponent: Type<any> | null = null;
  @Input() routes: string[] = [];

  @ViewChild('navi') navi: ElementRef | null = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.amountOfSections = this.components.length;
    if (this.routes.length > 0 && this.components.length != this.routes.length){
      console.error('Amount of routes doesnt equal amount of components')
    }
  }
  ngAfterViewInit(): void {
    if (this.naviComponent != null){
      this.naviHeight = this.navi?.nativeElement.offsetHeight;
      this.componentStyle = {
        height: 'calc(100vh - ' + this.naviHeight + 'px)'
      };
    }
    if (this.routes.length > 0){
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
        let e = event as NavigationStart;
        let route = this.routes.find(x => '/' + x == e.url);
        if (route != null){
          this.scrolledSection = this.routes.indexOf(route);
          setTimeout(()  => {
            this.scrollToComponent();
          });
        }
      });
    }
  }
  scrollToComponent(){
    this.scrollDelay = true;
    window.scrollTo({top: (window.innerHeight - this.naviHeight) * this.scrolledSection, behavior: 'smooth'});
    setTimeout(() => {
      this.scrollDelay = false;
    }, this.scrollDelayAmount);
  }
  scrollEvent(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.scrollDelay){
      this.scrolledSection += (this.isBottom(event) ? 1 : -1);
      if (this.scrolledSection < 0){
        this.scrolledSection = 0;
      }
      if (this.scrolledSection >= this.amountOfSections){
        this.scrolledSection = this.amountOfSections - 1;
      }
      if (this.routes.length > 0){
        this.router.navigate([this.routes[this.scrolledSection]]);
      }
      else{
        this.scrollToComponent();
      }
    }
  }
  isBottom(event: WheelEvent){
    return event.deltaY > 0;
  }
}
