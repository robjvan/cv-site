import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppDockComponent } from './components/common/app-dock/app-dock.component';
import { CupertinoBarComponent } from './components/common/cupertino-bar/cupertino-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CupertinoBarComponent, AppDockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
