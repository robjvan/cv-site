import { Component } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'weather-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './weather-dialog.component.html',
  styleUrl: './weather-dialog.component.scss',
})
export class WeatherDialogComponent {
  private destroy$ = new Subject<void>();
  constructor(private readonly launcherService: LauncherService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.WEATHER);
  }
}
