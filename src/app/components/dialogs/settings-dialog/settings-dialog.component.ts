import { Component, signal } from '@angular/core';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { SettingsService } from '../../../services/settings.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'settings-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
})
export class SettingsDialogComponent {
  private destroy$ = new Subject<void>();
  constructor(
    private readonly launcherService: LauncherService,
    private readonly settingsService: SettingsService
  ) {}

  public showSeconds = signal<boolean>(false);
  // public useDarkMode = signal<boolean>(false);
  public useDynamicBg = signal<boolean>(false);
  public showWeather = signal<boolean>(false);

  public closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.SETTINGS);
  }

  public get secondsBtnLabel() {
    return this.showSeconds() === true ? 'ON' : 'OFF';
  }

  // get darkModeBtnLabel() {
  //   return this.useDarkMode() === true ? 'ON' : 'OFF';
  // }

  get showWeatherBtnLabel() {
    return this.showWeather() === true ? 'ON' : 'OFF';
  }

  public ngOnInit() {
    // Set the color and status of the 'toggle seconds button'
    this.settingsService.showSeconds$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (showSeconds: boolean) => {
        const btn = document.querySelector('#secondsBtn');
        if (showSeconds) {
          btn?.classList.remove('btn-outline-dark');
          btn?.classList.add('btn-dark');
        } else {
          btn?.classList.remove('btn-dark');
          btn?.classList.add('btn-outline-dark');
        }
        this.showSeconds.set(showSeconds);
      },
      error: (err: any) => console.log(err.message),
    });

    // Set the color and status of the 'show weather button'
    this.settingsService.showWeather$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (showWeather: boolean) => {
        const btn = document.querySelector('#showWeatherBtn');
        if (showWeather) {
          btn?.classList.remove('btn-outline-dark');
          btn?.classList.add('btn-dark');
        } else {
          btn?.classList.remove('btn-dark');
          btn?.classList.add('btn-outline-dark');
        }
        this.showWeather.set(showWeather);
      },
      error: (err: any) => console.log(err.message),
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleSeconds(): void {
    this.settingsService.toggleSeconds();
  }

  public toggleWeather(): void {
    this.settingsService.toggleShowWeather();
  }
}
