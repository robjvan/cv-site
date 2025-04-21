import { Component, signal, WritableSignal } from '@angular/core';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { SettingsService } from '../../../services/settings.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * SettingsDialogComponent provides toggles for UI customization options like:
 * - Showing seconds in the clock
 * - Displaying weather data
 *
 * It syncs with the global app state using RxJS and signals.
 */
@Component({
  selector: 'settings-dialog',
  imports: [DialogWindowComponent, CommonModule],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
})
export class SettingsDialogComponent {
  private destroy$: Subject<void> = new Subject<void>();

  /** UI signals for local visual states */
  public showSeconds: WritableSignal<boolean> = signal(false);
  public useDynamicBg: WritableSignal<boolean> = signal(false);
  public showWeather: WritableSignal<boolean> = signal(false);

  /**
   * Constructor injects dialog and settings services.
   *
   * @param launcherService Controls dialog open/close behavior
   * @param settingsService Manages global toggle settings via BehaviorSubjects
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly settingsService: SettingsService
  ) {}

  /** Closes the settings dialog window. */
  public closeDialog(): void {
    this.launcherService.closeDialog(DialogPurpose.SETTINGS);
  }

  /** Button label derived from signal state */
  public get secondsBtnLabel(): string {
    return this.showSeconds() === true ? 'ON' : 'OFF';
  }

  /** Button label derived from signal state */
  get showWeatherBtnLabel(): string {
    return this.showWeather() === true ? 'ON' : 'OFF';
  }

  // get enableWeatherBtnLabel(): string {
  //   return this.enableWeather() === true ? 'ON' : 'OFF';
  // }

  /**
   * Angular lifecycle hook.
   * Subscribes to the BehaviorSubjects from the settings service and updates local state/signals.
   */
  public ngOnInit(): void {
    // Listen to 'showSeconds' preference and update button styling + local signal
    this.settingsService.showSeconds$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (showSeconds: boolean) => {
        const btn: Element | null = document.querySelector('#secondsBtn');
        if (showSeconds) {
          btn?.classList.add('active');
        } else {
          btn?.classList.remove('active');
        }
        this.showSeconds.set(showSeconds);
      },
      error: (err: any) => console.log(err.message),
    });

    // Listen to 'showWeather' preference
    this.settingsService.showWeather$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (showWeather: boolean) => {
        const btn: Element | null = document.querySelector('#showWeatherBtn');
        if (showWeather) {
          btn?.classList.add('active');
        } else {
          btn?.classList.remove('active');
        }
        this.showWeather.set(showWeather);
      },
      error: (err: any) => console.log(err.message),
    });

    // Reserved for future: enableWeather$, dynamic backgrounds, etc.

    // // Set the color and status of the 'show weather button'
    // this.settingsService.enableWeather$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (enableWeather: boolean) => {
    //       const btn: Element | null =
    //         document.querySelector('#toggleWeatherBtn');
    //       if (enableWeather) {
    //         btn?.classList.remove('btn-outline-dark');
    //         btn?.classList.add('btn-dark');
    //       } else {
    //         btn?.classList.remove('btn-dark');
    //         btn?.classList.add('btn-outline-dark');
    //       }
    //       this.enableWeather.set(enableWeather);
    //     },
    //     error: (err: any) => console.log(err.message),
    //   });
  }

  /** Lifecycle cleanup to unsubscribe from all observables and prevent memory leaks. */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Toggle visibility of seconds in tray clock */
  public toggleSeconds(): void {
    this.settingsService.toggleSeconds();
  }

  /** Toggle visibility of weather data in tray */
  public toggleWeather(): void {
    this.settingsService.toggleShowWeather();
  }

  // Future: Toggle entire weather system backend support
  // public toggleWeatherService(): void {
  //   this.settingsService.toggleWeather();
  // }
}
