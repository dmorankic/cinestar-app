import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { aplication_settings } from './aplication_settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  management=false;
  client=false;
  auth=false;

  constructor() {

  }
}

