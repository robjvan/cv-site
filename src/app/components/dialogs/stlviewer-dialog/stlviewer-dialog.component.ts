import { Component } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';

@Component({
  selector: 'stlviewer-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './stlviewer-dialog.component.html',
  styleUrl: './stlviewer-dialog.component.scss',
})
export class StlviewerDialogComponent {
  constructor(private readonly launcherService: LauncherService) {}

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.STLVIEWER);
  }
}
