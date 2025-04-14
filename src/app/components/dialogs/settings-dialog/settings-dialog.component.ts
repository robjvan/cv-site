import { Component, signal } from '@angular/core';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { SettingsService } from '../../../services/settings.service';
import { Subject, take, takeUntil } from 'rxjs';

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

  showSeconds = signal<boolean>(false);
  // useDarkMode = signal<boolean>(false);
  useDynamicBg = signal<boolean>(false);

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.SETTINGS);
  }

  get secondsBtnLabel() {
    return this.showSeconds() === true ? 'ON' : 'OFF';
  }

  // get dynamicBgBtnLabel() {
  //   return this.useDynamicBg() === true ? 'ON' : 'OFF';
  // }

  // get darkModeBtnLabel() {
  //   return this.useDarkMode() === true ? 'ON' : 'OFF';
  // }

  ngOnInit() {
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSeconds(): void {
    this.settingsService.toggleSeconds();
  }
}
