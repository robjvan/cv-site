import { Component } from '@angular/core';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';

@Component({
  selector: 'about-app-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './about-app-dialog.component.html',
  styleUrl: './about-app-dialog.component.scss',
})
export class AboutAppDialogComponent {
  constructor(private readonly launcherService: LauncherService) {}

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.ABOUT);
  }
}
