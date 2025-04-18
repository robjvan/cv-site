import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IOpenApps } from '../models/open-apps.interface';
import { DialogPurpose } from '../models/enums/dialog-purpose.enum';

@Injectable({
  providedIn: 'root',
})
export class LauncherService {
  constructor() {}

  public readonly initialAppState: IOpenApps = {
    showSkillsDialog: false,
    showProjectsDialog: false,
    showContactDialog: false,
    showEducationDialog: false,
    showSearchApp: false,
    showTodoApp: false,
    showNotesApp: false,
    show3dViewerApp: false,
    showAboutAppDialog: false,
    showHelpDialog: false,
    showSettingsDialog: false,
    showAboutMeDialog: false,
    showWeatherApp: false,
    showNewNoteDialog: false,
    showEditNoteDialog: false,
    showDeleteNoteDialog: false,
    showNewTodoDialog: false,
    showEditTodoDialog: false,
    showDeleteTodoDialog: false,
    showUploadStlDialog: false,
    showTimerDialog: false,
  };

  public openApps$: BehaviorSubject<IOpenApps> = new BehaviorSubject<IOpenApps>(
    this.initialAppState
  );

  private readonly dialogMap: Record<DialogPurpose, keyof IOpenApps> = {
    [DialogPurpose.SKILLS]: 'showSkillsDialog',
    [DialogPurpose.EDUCATION]: 'showSkillsDialog',
    [DialogPurpose.HELP]: 'showHelpDialog',
    [DialogPurpose.ABOUT]: 'showAboutAppDialog',
    [DialogPurpose.PROJECTS]: 'showProjectsDialog',
    [DialogPurpose.SEARCH]: 'showSearchApp',
    [DialogPurpose.TODOS]: 'showTodoApp',
    [DialogPurpose.NOTES]: 'showNotesApp',
    [DialogPurpose.SETTINGS]: 'showSettingsDialog',
    [DialogPurpose.STLVIEWER]: 'show3dViewerApp',
    [DialogPurpose.ABOUT_ME]: 'showAboutMeDialog',
    [DialogPurpose.WEATHER]: 'showWeatherApp',
    [DialogPurpose.NEW_NOTE]: 'showNewNoteDialog',
    [DialogPurpose.EDIT_NOTE]: 'showEditNoteDialog',
    [DialogPurpose.DELETE_NOTE]: 'showDeleteNoteDialog',
    [DialogPurpose.NEW_TODO]: 'showNewTodoDialog',
    [DialogPurpose.EDIT_TODO]: 'showEditTodoDialog',
    [DialogPurpose.DELETE_TODO]: 'showDeleteTodoDialog',
    [DialogPurpose.UPLOAD_STL]: 'showUploadStlDialog',
    [DialogPurpose.TIMER]: 'showTimerDialog',
  };

  public showDialog(type: DialogPurpose): void {
    const key = this.dialogMap[type];
    if (!key) return;

    this.openApps$.pipe(take(1)).subscribe({
      next: (val) => {
        this.openApps$.next({ ...val, [key]: true });
      },
      error: (err) => console.error(err.message),
    });
  }

  public closeDialog(type: DialogPurpose): void {
    const key = this.dialogMap[type];
    if (!key) return;

    this.openApps$.pipe(take(1)).subscribe({
      next: (val) => {
        this.openApps$.next({ ...val, [key]: false });
      },
      error: (err) => console.error(err.message),
    });
  }

  public closeAllDialogs(): void {
    this.openApps$.next(this.initialAppState);
  }
}
