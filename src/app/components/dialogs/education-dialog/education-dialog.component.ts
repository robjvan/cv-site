import { Component } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';

@Component({
  selector: 'education-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './education-dialog.component.html',
  styleUrl: './education-dialog.component.scss',
})
export class EducationDialogComponent {
  constructor(private readonly launcherService: LauncherService) {}

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.EDUCATION);
  }
}
