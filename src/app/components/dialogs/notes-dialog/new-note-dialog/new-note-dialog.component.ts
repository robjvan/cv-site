import { Component, signal } from '@angular/core';
import { DialogWindowComponent } from '../../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../../services/launcher.service';
import { NotesService } from '../../../../services/notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'new-note-dialog',
  imports: [DialogWindowComponent, FormsModule],
  templateUrl: './new-note-dialog.component.html',
  styleUrl: './new-note-dialog.component.scss',
})
export class NewNoteDialogComponent {
  title = signal<string>('');
  body = signal<string>('');

  constructor(
    private readonly notesService: NotesService,
    private readonly launcherService: LauncherService
  ) {}

  /** Calls the notes service to save a new note to local storage. */
  saveNote(): void {
    try {
      if (this.title() !== '' || this.body() !== '') {
        // Send a request to our notes service to save the note.
        this.notesService.createNote(this.title(), this.body());

        // Reset our signals for the next new note.
        this.title.set('');
        this.body.set('');

        // Close the new note dialog.
        this.launcherService.closeDialog(DialogPurpose.NEW_NOTE);
      }
    } catch (err: any) {
      console.log(`Failed to save new note`, err.message);
    }
  }
}
