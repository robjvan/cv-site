import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

/**
 * SettingsService manages UI configuration preferences for the user.
 *
 * Settings include visual options like dark mode and whether to display seconds,
 * as well as UI modules like weather display toggles.
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  /**
   * Controls whether seconds are shown on the tray clock.
   * Default: false.
   */
  public showSeconds$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // /**
  //  * Controls whether dark mode is enabled.
  //  * Default: false (light theme).
  //  */
  // public useDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  //   false
  // );

  /**
   * Controls the visibility of weather data in the top bar.
   * Default: true.
   */
  public showWeather$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  /**
   * Enables or disables the weather service.
   * Default: true (enabled).
   */
  public enableWeather$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  /**
   * Toggles the display of seconds in the tray clock.
   * Emits the opposite of the current value.
   */
  public toggleSeconds(): void {
    this.showSeconds$.pipe(take(1)).subscribe({
      next: (val: boolean) => {
        if (val === true) {
          this.showSeconds$.next(false);
        } else {
          this.showSeconds$.next(true);
        }
      },
      error: (err: any) => console.log(err.message),
    });
  }

  // /**
  //  * Toggles between light and dark UI themes.
  //  */
  // public toggleDarkMode() {
  //   this.useDarkMode$.pipe(take(1)).subscribe({
  //     next: (useDarkMode: boolean) => this.useDarkMode$.next(!useDarkMode),
  //     error: (err) => console.log(err.message),
  //   });
  // }

  /**
   * Toggles the visibility of weather info in the top bar.
   */
  public toggleShowWeather() {
    this.showWeather$.pipe(take(1)).subscribe({
      next: (showWeather: boolean) => this.showWeather$.next(!showWeather),
      error: (err) => console.log(err.message),
    });
  }

  // /**
  //  * Optional toggle for fully enabling or disabling the weather system.
  //  * Useful for performance or privacy-conscious users.
  //  */
  // public toggleWeather() {
  //   this.enableWeather$.pipe(take(1)).subscribe({
  //     next: (showWeather: boolean) => this.enableWeather$.next(!showWeather),
  //     error: (err) => console.log(err.message),
  //   });
  // }
}
