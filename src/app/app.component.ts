import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }
}
