import { Component, OnInit, signal } from '@angular/core';
import { DialogWindowComponent } from '../../common/dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { IEducationEvent } from '../../../models/education-event.interface';
import { CommonModule } from '@angular/common';
import { educationEvents } from '../../../data/personal-info.data';

@Component({
  selector: 'education-dialog',
  imports: [DialogWindowComponent, CommonModule],
  templateUrl: './education-dialog.component.html',
  styleUrl: './education-dialog.component.scss',
})
export class EducationDialogComponent {
  educationEvents = educationEvents;

  constructor(private readonly launcherService: LauncherService) {}

  // closeDialog() {
  //   this.launcherService.closeDialog(DialogPurpose.EDUCATION);
  // }
}
