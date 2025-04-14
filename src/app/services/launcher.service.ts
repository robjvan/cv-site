import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IOpenApps } from '../models/open-apps.interface';
import { DialogPurpose } from '../models/enums/dialog-purpose.enum';

@Injectable({
  providedIn: 'root',
})
export class LauncherService {
  constructor() {}

  readonly initialAppState: IOpenApps = {
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
  };

  openApps$ = new BehaviorSubject(this.initialAppState);

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
  };

  showDialog(type: DialogPurpose): void {
    const key = this.dialogMap[type];
    if (!key) return;

    this.openApps$.pipe(take(1)).subscribe({
      next: (val) => {
        this.openApps$.next({ ...val, [key]: true });
      },
      error: (err) => console.error(err.message),
    });
  }

  closeDialog(type: DialogPurpose): void {
    const key = this.dialogMap[type];
    if (!key) return;

    this.openApps$.pipe(take(1)).subscribe({
      next: (val) => {
        this.openApps$.next({ ...val, [key]: false });
      },
      error: (err) => console.error(err.message),
    });
  }

  closeAllDialogs(): void {
    this.openApps$.next(this.initialAppState);
  }

  // showDialog(type: DialogPurpose): void {
  //   this.openApps$.pipe(take(1)).subscribe({
  //     next: (val) => {
  //       switch (type) {
  //         case DialogPurpose.SKILLS:
  //           this.openApps$.next({ ...val, showSkillsDialog: true });
  //           break;
  //         case DialogPurpose.HELP:
  //           this.openApps$.next({ ...val, showHelpDialog: true });
  //           break;
  //         case DialogPurpose.ABOUT:
  //           this.openApps$.next({ ...val, showAboutAppDialog: true });
  //           break;
  //         case DialogPurpose.PROJECTS:
  //           this.openApps$.next({ ...val, showProjectsDialog: true });
  //           break;
  //         case DialogPurpose.EDUCATION:
  //           this.openApps$.next({ ...val, showEducationDialog: true });
  //           break;
  //         case DialogPurpose.SEARCH:
  //           this.openApps$.next({ ...val, showSearchApp: true });
  //           break;
  //         case DialogPurpose.TODOS:
  //           this.openApps$.next({ ...val, showTodoApp: true });
  //           break;
  //         case DialogPurpose.NOTES:
  //           this.openApps$.next({ ...val, showNotesApp: true });
  //           break;
  //         case DialogPurpose.SETTINGS:
  //           this.openApps$.next({ ...val, showSettingsDialog: true });
  //           break;
  //         case DialogPurpose.STLVIEWER:
  //           this.openApps$.next({ ...val, show3dViewerApp: true });
  //           break;
  //         case DialogPurpose.WALLPAPER:
  //           this.openApps$.next({ ...val, showWallpaperApp: true });
  //           break;
  //         case DialogPurpose.ABOUT_ME:
  //           this.openApps$.next({ ...val, showAboutMeDialog: true });
  //           break;
  //         case DialogPurpose.WEATHER:
  //           this.openApps$.next({ ...val, showWeatherApp: true });
  //           break;
  //         case DialogPurpose.NEW_NOTE:
  //           this.openApps$.next({ ...val, showNewNoteDialog: true });
  //           break;
  //         case DialogPurpose.EDIT_NOTE:
  //           this.openApps$.next({ ...val, showEditNoteDialog: true });
  //           break;
  //         case DialogPurpose.DELETE_NOTE:
  //           this.openApps$.next({ ...val, showDeleteNoteDialog: true });
  //           break;
  //         case DialogPurpose.NEW_TODO:
  //           this.openApps$.next({ ...val, showNewTodoDialog: true });
  //           break;
  //         case DialogPurpose.EDIT_TODO:
  //           this.openApps$.next({ ...val, showEditTodoDialog: true });
  //           break;
  //         case DialogPurpose.DELETE_TODO:
  //           this.openApps$.next({ ...val, showDeleteTodoDialog: true });
  //           break;
  //       }
  //     },
  //     error: (err) => console.log(err.message),
  //   });
  // }

  // closeDialog(type: DialogPurpose): void {
  //   this.openApps$.pipe(take(1)).subscribe({
  //     next: (val) => {
  //       switch (type) {
  //         case DialogPurpose.SKILLS:
  //           this.openApps$.next({ ...val, showSkillsDialog: false });
  //           break;
  //         case DialogPurpose.HELP:
  //           this.openApps$.next({ ...val, showHelpDialog: false });
  //           break;
  //         case DialogPurpose.ABOUT:
  //           this.openApps$.next({ ...val, showAboutAppDialog: false });
  //           break;
  //         case DialogPurpose.PROJECTS:
  //           this.openApps$.next({ ...val, showProjectsDialog: false });
  //           break;
  //         case DialogPurpose.EDUCATION:
  //           this.openApps$.next({ ...val, showEducationDialog: false });
  //           break;
  //         case DialogPurpose.SEARCH:
  //           this.openApps$.next({ ...val, showSearchApp: false });
  //           break;
  //         case DialogPurpose.TODOS:
  //           this.openApps$.next({ ...val, showTodoApp: false });
  //           break;
  //         case DialogPurpose.NOTES:
  //           this.openApps$.next({ ...val, showNotesApp: false });
  //           break;
  //         case DialogPurpose.SETTINGS:
  //           this.openApps$.next({ ...val, showSettingsDialog: false });
  //           break;
  //         case DialogPurpose.STLVIEWER:
  //           this.openApps$.next({ ...val, show3dViewerApp: false });
  //           break;
  //         case DialogPurpose.ABOUT_ME:
  //           this.openApps$.next({ ...val, showAboutMeDialog: false });
  //           break;
  //         case DialogPurpose.WEATHER:
  //           this.openApps$.next({ ...val, showWeatherApp: false });
  //           break;
  //         case DialogPurpose.NEW_NOTE:
  //           this.openApps$.next({ ...val, showNewNoteDialog: false });
  //           break;
  //         case DialogPurpose.EDIT_NOTE:
  //           this.openApps$.next({ ...val, showEditNoteDialog: false });
  //           break;
  //         case DialogPurpose.NEW_TODO:
  //           this.openApps$.next({ ...val, showNewTodoDialog: false });
  //           break;
  //         case DialogPurpose.EDIT_TODO:
  //           this.openApps$.next({ ...val, showEditTodoDialog: false });
  //           break;
  //         case DialogPurpose.DELETE_NOTE:
  //           this.openApps$.next({ ...val, showDeleteNoteDialog: false });
  //           break;
  //         case DialogPurpose.DELETE_TODO:
  //           this.openApps$.next({ ...val, showDeleteTodoDialog: false });
  //           break;
  //       }
  //     },
  //     error: (err) => console.log(err.message),
  //   });
  // }
}
