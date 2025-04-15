import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CupertinoBarComponent } from './components/cupertino-bar/cupertino-bar.component';
import { AppDockComponent } from './components/app-dock/app-dock.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CupertinoBarComponent, AppDockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
