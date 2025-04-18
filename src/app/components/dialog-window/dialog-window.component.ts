import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { LauncherService } from '../../services/launcher.service';
import { DialogPurpose } from '../../models/enums/dialog-purpose.enum';

/**
 * DialogWindowComponent represents a draggable, closable, and minimizable dialog window.
 *
 * It is dynamically created for various dialog types (e.g., Notes, Settings, Help).
 * Each instance manages its own state and uses input signals for title/type data binding.
 * The component supports drag-and-drop, minimization, and contextual closing based on dialog type.
 */
@Component({
  selector: 'dialog-window',
  imports: [DragDropModule, CommonModule],
  templateUrl: './dialog-window.component.html',
  styleUrl: './dialog-window.component.scss',
})
export class DialogWindowComponent {
  /**
   * Constructor injects the launcher service for dialog state control.
   *
   * @param {LauncherService} launcherService - Service to show or close dialogs.
   */
  constructor(private readonly launcherService: LauncherService) {}

  /**
   * Signal holding the title of the dialog window.
   * Typically set by the parent component.
   */
  public title: InputSignal<string> = input<string>('');

  /**
   * Signal indicating the dialog type (e.g., 'settings', 'notes').
   * Used to determine the mapped DialogPurpose.
   */
  public type: InputSignal<string> = input<string>('');

  /**
   * Signal controlling the minimized state of the dialog.
   * If true, the dialog will appear visually minimized.
   */
  public minimized: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Mapping of dialog type string identifiers to their corresponding DialogPurpose enums.
   * This allows for dynamic dialog handling with a simple lookup.
   */
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
    timer: DialogPurpose.TIMER,
  };

  /**
   * Closes the current dialog using the mapped DialogPurpose based on its type.
   * Falls back to a warning if the type is not found in the dialog map.
   */
  public closeDialog(): void {
    const key = this.type();
    const dialogPurpose = this.dialogMap[key];

    if (dialogPurpose !== undefined) {
      this.launcherService.closeDialog(dialogPurpose);
    } else {
      console.warn(`[DialogWindow] No DialogPurpose mapped for type: '${key}'`);
    }
  }

  /**
   * Toggles the minimized state of the dialog window.
   * Updates the signal and adjusts styling on the DOM element to reflect state visually.
   */
  public toggleMinimized(): void {
    const el = document.querySelector('.window-header');
    if (this.minimized()) {
      this.minimized.set(false);
      el?.classList.remove('full-radius');
    } else {
      this.minimized.set(true);
      el?.classList.add('full-radius');
    }
  }
}
