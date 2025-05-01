import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IOpenApps } from '../models/open-apps.interface';
import { DialogPurpose } from '../models/enums/dialog-purpose.enum';

/**
 * LauncherService acts as a centralized dialog and app state controller.
 *
 * It maintains a shared observable state of open dialogs/apps and provides
 * utilities to open, close, or reset these dialogs using strongly typed enums.
 */
@Injectable({
  providedIn: 'root',
})
export class LauncherService {
  /**
   * Initial/default state of all openable dialogs/apps.
   * Each flag represents the visibility state of a specific UI element.
   */
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

  /**
   * Reactive stream of all currently open dialog/app states.
   * Subscribers will be notified when any visibility flag changes.
   */
  public openApps$: BehaviorSubject<IOpenApps> = new BehaviorSubject<IOpenApps>(
    this.initialAppState
  );

  /**
   * Maps a DialogPurpose enum value to the corresponding IOpenApps property key.
   * Enables dynamic dialog toggling based on enum input.
   */
  private readonly dialogMap: Record<DialogPurpose, keyof IOpenApps> = {
    [DialogPurpose.SKILLS]: 'showSkillsDialog',
    [DialogPurpose.EDUCATION]: 'showEducationDialog',
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

  /**
   * Opens the specified dialog or app by setting its visibility to `true`.
   *
   * @param {DialogPurpose} type - DialogPurpose enum indicating which dialog to open.
   */
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

  /**
   * Closes the specified dialog or app by setting its visibility to `false`.
   *
   * @param {DialogPurpose} type - DialogPurpose enum indicating which dialog to close.
   */
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

  /**
   * Closes all currently open dialogs/apps by resetting state
   * to the initial/default configuration.
   */
  public closeAllDialogs(): void {
    this.openApps$.next(this.initialAppState);
  }
}
