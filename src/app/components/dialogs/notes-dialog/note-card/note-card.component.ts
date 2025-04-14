import { Component, input } from '@angular/core';
import { INote } from '../../../../models/note.interface';
import moment from 'moment';
import { NotesService } from '../../../../services/notes.service';

@Component({
  selector: 'note-card',
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  note = input<INote | undefined>(undefined);

  constructor(private readonly notesService: NotesService) {}

  createdTime(createdAt: string) {
    return moment(createdAt).format('MMM D h:mm A');
  }

  editNote() {}

  deleteNote() {
    this.notesService.deleteNote(this.note()!.id);
  }
}
