import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { LauncherService } from '../../services/launcher.service';
import { DialogPurpose } from '../../models/enums/dialog-purpose.enum';

@Component({
  selector: 'dialog-window',
  imports: [DragDropModule, CommonModule],
  templateUrl: './dialog-window.component.html',
  styleUrl: './dialog-window.component.scss',
})
export class DialogWindowComponent {
  constructor(private readonly launcherService: LauncherService) {}

  public title = input<string>('');
  public type = input<string>('');

  private readonly dialogMap: Record<string, DialogPurpose> = {
    settings: DialogPurpose.SETTINGS,
    education: DialogPurpose.EDUCATION,
    projects: DialogPurpose.PROJECTS,
    notes: DialogPurpose.NOTES,
    search: DialogPurpose.SEARCH,
    todos: DialogPurpose.TODOS,
    stlviewer: DialogPurpose.STLVIEWER,
    weather: DialogPurpose.WEATHER,
    about: DialogPurpose.ABOUT,
    help: DialogPurpose.HELP,
    'about-me': DialogPurpose.ABOUT_ME,
    skills: DialogPurpose.SKILLS,
    'new-note': DialogPurpose.NEW_NOTE,
    'edit-note': DialogPurpose.EDIT_NOTE,
    'delete-note': DialogPurpose.DELETE_NOTE,
    'new-todo': DialogPurpose.NEW_TODO,
    'edit-todo': DialogPurpose.EDIT_TODO,
    'delete-todo': DialogPurpose.DELETE_TODO,
  };

  public closeDialog(): void {
    const key = this.type();
    const dialogPurpose = this.dialogMap[key];

    if (dialogPurpose !== undefined) {
      this.launcherService.closeDialog(dialogPurpose);
    } else {
      console.warn(`No DialogPurpose mapped for type: '${key}'`);
    }
  }
}
