import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // destroy$: Subject<boolean> = new Subject<boolean>();

  showSeconds$ = new BehaviorSubject<boolean>(false);
  useDarkMode$ = new BehaviorSubject<boolean>(false);

  // ngOnDestroy() {
  //   this.destroy$.next(true);
  //   this.destroy$.unsubscribe();
  // }

  /** Toggles display of seconds in the tray clock. */
  toggleSeconds(): void {
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

  toggleDarkMode() {
    this.useDarkMode$.pipe(take(1)).subscribe({
      next: (useDarkMode: boolean) => this.useDarkMode$.next(!useDarkMode),
      error: (err) => console.log(err.message),
    });
  }
}
