import { Component, input } from '@angular/core';
import { DialogWindowComponent } from '../../../common/dialog-window/dialog-window.component';
import { INote } from '../../../../models/note.interface';

@Component({
  selector: 'delete-note-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './delete-note-dialog.component.html',
  styleUrl: './delete-note-dialog.component.scss',
})
export class DeleteNoteDialogComponent {
  note = input<INote>();
}
