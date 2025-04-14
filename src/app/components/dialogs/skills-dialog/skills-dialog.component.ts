import { Component } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';

@Component({
  selector: 'skills-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './skills-dialog.component.html',
  styleUrl: './skills-dialog.component.scss',
})
export class SkillsDialogComponent {
  constructor(private readonly launcherService: LauncherService) {}

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.SKILLS);
  }
}
