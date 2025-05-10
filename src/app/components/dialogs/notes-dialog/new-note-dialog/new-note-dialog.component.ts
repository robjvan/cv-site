import { Component, signal, WritableSignal } from '@angular/core';
import { DialogWindowComponent } from '../../../common/dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../../services/launcher.service';
import { NotesService } from '../../../../services/notes.service';
import { FormsModule } from '@angular/forms';

/**
 * NewNoteDialogComponent provides a modal interface for creating a new note.
 *
 * It allows users to enter a title and body, then submit the data to the NotesService.
 * After saving, it clears the form and closes the dialog.
 */
@Component({
  selector: 'new-note-dialog',
  imports: [DialogWindowComponent, FormsModule],
  templateUrl: './new-note-dialog.component.html',
  styleUrl: './new-note-dialog.component.scss',
})
export class NewNoteDialogComponent {
  /** * Signal that holds the note's title input value. */
  public title: WritableSignal<string> = signal('');

  /** Signal that holds the note's body/content. */
  public body: WritableSignal<string> = signal('');

  /**
   * Constructor injects the NotesService for saving data
   * and LauncherService for closing the dialog.
   *
   * @param {NotesService} notesService - Manages creation and persistence of notes
   * @param {LauncherService} launcherService - Controls dialog state in the app
   */
  constructor(
    private readonly notesService: NotesService,
    private readonly launcherService: LauncherService
  ) {}

  /**
   * Saves a new note if either the title or body contains input.
   *
   * Also resets the form signals and closes the dialog window.
   */
  public saveNote(): void {
    try {
      // Only proceed if title or body has content
      if (this.title() !== '' || this.body() !== '') {
        // Send a request to our notes service to save the note.
        this.notesService.createNote(this.title(), this.body());

        // Reset fields
        this.title.set('');
        this.body.set('');

        // Close modal dialog
        this.launcherService.closeDialog(DialogPurpose.NEW_NOTE);
      }
    } catch (err: any) {
      console.log(`Failed to save new note`, err.message);
    }
  }
}
