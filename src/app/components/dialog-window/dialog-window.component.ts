import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { LauncherService } from '../../services/launcher.service';
import { DialogPurpose } from '../../models/enums/dialog-purpose.enum';
import { IOpenApps } from '../../models/open-apps.interface';

@Component({
  selector: 'dialog-window',
  imports: [DragDropModule, CommonModule],
  templateUrl: './dialog-window.component.html',
  styleUrl: './dialog-window.component.scss',
})
export class DialogWindowComponent {
  constructor(private readonly launcherService: LauncherService) {}
  title = input<string>('');
  type = input<string>('');

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

  closeDialog(): void {
    const key = this.type();
    const dialogPurpose = this.dialogMap[key];

    if (dialogPurpose !== undefined) {
      this.launcherService.closeDialog(dialogPurpose);
    } else {
      console.warn(`No DialogPurpose mapped for type: '${key}'`);
    }
  }

  // closeDialog(): void {
  //   switch (this.type()) {
  //     case 'settings':
  //       this.launcherService.closeDialog(DialogPurpose.SETTINGS);
  //       break;
  //     case 'education':
  //       this.launcherService.closeDialog(DialogPurpose.EDUCATION);
  //       break;
  //     case 'projects':
  //       this.launcherService.closeDialog(DialogPurpose.PROJECTS);
  //       break;
  //     case 'notes':
  //       this.launcherService.closeDialog(DialogPurpose.NOTES);
  //       break;
  //     case 'search':
  //       this.launcherService.closeDialog(DialogPurpose.SEARCH);
  //       break;
  //     case 'todos':
  //       this.launcherService.closeDialog(DialogPurpose.TODOS);
  //       break;
  //     case 'stlviewer':
  //       this.launcherService.closeDialog(DialogPurpose.STLVIEWER);
  //       break;
  //     // case 'wallpaper':
  //     //   this.launcherService.closeDialog(DialogPurpose.WALLPAPER);
  //     //   break;
  //     case 'weather':
  //       this.launcherService.closeDialog(DialogPurpose.WEATHER);
  //       break;
  //     case 'about':
  //       this.launcherService.closeDialog(DialogPurpose.ABOUT);
  //       break;
  //     case 'help':
  //       this.launcherService.closeDialog(DialogPurpose.HELP);
  //       break;
  //     case 'about-me':
  //       this.launcherService.closeDialog(DialogPurpose.ABOUT_ME);
  //       break;
  //     case 'skills':
  //       this.launcherService.closeDialog(DialogPurpose.SKILLS);
  //       break;
  //     case 'new-note':
  //       this.launcherService.closeDialog(DialogPurpose.NEW_NOTE);
  //       break;
  //     case 'edit-note':
  //       this.launcherService.closeDialog(DialogPurpose.EDIT_NOTE);
  //       break;
  //     case 'delete-note':
  //       this.launcherService.closeDialog(DialogPurpose.DELETE_NOTE);
  //       break;
  //     case 'new-todo':
  //       this.launcherService.closeDialog(DialogPurpose.NEW_TODO);
  //       break;
  //     case 'edit-todo':
  //       this.launcherService.closeDialog(DialogPurpose.EDIT_TODO);
  //       break;
  //     case 'delete-todo':
  //       this.launcherService.closeDialog(DialogPurpose.DELETE_TODO);
  //       break;
  //   }
  // }
}
