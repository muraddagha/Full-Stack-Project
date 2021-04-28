import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event, ActivationStart } from '@angular/router';


@Component({
  selector: 'app-app',
  template: `<app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>`
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

  }

}
