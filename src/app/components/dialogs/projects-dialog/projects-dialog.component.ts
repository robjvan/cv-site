import { Component } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';

@Component({
  selector: 'projects-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './projects-dialog.component.html',
  styleUrl: './projects-dialog.component.scss',
})
export class ProjectsDialogComponent {
  constructor(private readonly launcherService: LauncherService) {}

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.PROJECTS);
  }
}
