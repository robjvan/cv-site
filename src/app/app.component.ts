import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppDockComponent } from './components/common/app-dock/app-dock.component';
import { CupertinoBarComponent } from './components/common/cupertino-bar/cupertino-bar.component';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CupertinoBarComponent, AppDockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  isDesktop: boolean = false;

  private isMobile(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

  ngOnInit(): void {
    this.isDesktop = this.platform.isBrowser && !this.isMobile();
  }
}
