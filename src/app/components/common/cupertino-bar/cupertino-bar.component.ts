import { Component, signal } from '@angular/core';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { SettingsService } from '../../../services/settings.service';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

/**
 * CupertinoBarComponent simulates a macOS-style status bar.
 *
 * Displays time (with optional seconds), weather status, and provides quick access
 * to dialogs like "About" and "Help". Time updates every second based on user settings.
 */
@Component({
  selector: 'cupertino-bar',
  imports: [NgbModule, NgbTooltipModule, WeatherWidgetComponent],
  templateUrl: './cupertino-bar.component.html',
  styleUrl: './cupertino-bar.component.scss',
})
export class CupertinoBarComponent {
  /** Subject to clean up subscriptions on component destroy. */
  private destroy$ = new Subject<void>();

  /** Holds the subscription to the time interval observable. */
  private subscription!: Subscription;

  /**
   * Signal holding the current time display string.
   * Updates every second or minute depending on settings.
   */
  public time = signal<string | undefined>(undefined);

  /** Whether the time should display seconds. */
  public showSeconds = false;

  /** Whether the weather widget should be visible. */
  public showWeather = true;

  /** Whether the weather widget is enabled (tied to system-level toggle). */
  public enableWeather = true;

  /**
   * Constructor injects services for user settings and dialog management.
   *
   * @param {SettingsService} settingsService - Emits settings related to UI display.
   * @param {LauncherService} launcherService - Manages dialogs and app windows.
   */
  constructor(
    private readonly settingsService: SettingsService,
    private readonly launcherService: LauncherService
  ) {}

  /**
   * Maps simple string keys to their respective dialog purposes.
   * Used for triggering dialogs based on toolbar input.
   */
  private readonly dialogMap: Record<string, DialogPurpose> = {
    about: DialogPurpose.ABOUT,
    help: DialogPurpose.HELP,
  };

  /**
   * Angular lifecycle hook that initializes the component.
   *
   * - Subscribes to user settings (weather and clock).
   * - Sets up an interval to update the clock display.
   */
  public ngOnInit(): void {
    this.time.set(moment().format('ddd MMM D h:mm A'));
    this.settingsService.showSeconds$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (showSeconds: boolean) => (this.showSeconds = showSeconds),
      error: (err: any) => console.log(err.message),
    });
    this.settingsService.showWeather$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (showWeather: boolean) => (this.showWeather = showWeather),
      error: (err: any) => console.log(err.message),
    });
    this.settingsService.enableWeather$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (enableWeather: boolean) => (this.enableWeather = enableWeather),
        error: (err: any) => console.log(err.message),
      });

    this.subscription = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        if (this.showSeconds) {
          this.time.set(moment().format('ddd MMM D h:mm:ss A'));
        } else {
          this.time.set(moment().format('ddd MMM D h:mm A'));
        }
      });
  }

  /**
   * Angular lifecycle hook to clean up subscriptions when the component is destroyed.
   */
  public ngOnDestroy() {
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showDialog(key: string) {
    const dialogPurpose = this.dialogMap[key];

    if (dialogPurpose !== undefined) {
      this.launcherService.showDialog(dialogPurpose);
    } else {
      console.warn(`No DialogPurpose mapped for type: '${key}'`);
    }
  }

  public closeAllDialogs() {
    this.launcherService.closeAllDialogs();
  }
}
