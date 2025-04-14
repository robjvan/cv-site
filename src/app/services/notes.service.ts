import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, take } from 'rxjs';
import { INote } from '../models/note.interface';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { LauncherService } from './launcher.service';
import { DialogPurpose } from '../models/enums/dialog-purpose.enum';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private readonly storageService: StorageService) {}

  notes$ = new BehaviorSubject<INote[]>([]);

  reloadNotes() {
    this.notes$.next(this.storageService.loadNotes());
  }

  createNote(title?: string, description?: string) {
    const newNote: INote = {
      id: uuidv4(),
      description: description ?? '',
      title: title ?? '',
      archived: false,
      createdAt: moment().format(),
    };

    this.notes$.pipe(take(1)).subscribe({
      next: (notes: INote[]) => {
        const newNotesList = [...notes, newNote];
        this.storageService.saveNotes(newNotesList);
        this.reloadNotes();
      },
      error: (err: any) => console.log(err.message),
    });
  }

  deleteNote(id: string): void {
    try {
      this.notes$.pipe(take(1)).subscribe({
        next: (notes: INote[]) => {
          this.storageService.saveNotes(
            notes.filter((note: INote) => note.id != id)
          );
        },
        error: (err: any) => console.log(err.message),
      });
      this.reloadNotes();
    } catch (err: any) {
      console.log(`Failed to delete note with id ${id}`, err.message);
    }
  }

  updateNote(id: string, title?: string, description?: string) {}

  archiveNote(id: string) {}
}
