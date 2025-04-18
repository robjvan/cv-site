import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public showSeconds$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public useDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public showWeather$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  public enableWeather$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  /** Toggles display of seconds in the tray clock. */
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

  /** Toggles the dark mode color theme. */
  public toggleDarkMode() {
    this.useDarkMode$.pipe(take(1)).subscribe({
      next: (useDarkMode: boolean) => this.useDarkMode$.next(!useDarkMode),
      error: (err) => console.log(err.message),
    });
  }

  /** Toggles the weather data in the top bar. */
  public toggleShowWeather() {
    this.showWeather$.pipe(take(1)).subscribe({
      next: (showWeather: boolean) => this.showWeather$.next(!showWeather),
      error: (err) => console.log(err.message),
    });
  }

  // /** Toggles the weather service in the site. */
  // public toggleWeather() {
  //   this.enableWeather$.pipe(take(1)).subscribe({
  //     next: (showWeather: boolean) => this.enableWeather$.next(!showWeather),
  //     error: (err) => console.log(err.message),
  //   });
  // }
}
