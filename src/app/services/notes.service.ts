import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, take } from 'rxjs';
import { INote } from '../models/note.interface';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private readonly storageService: StorageService) {}

  public notes$: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);

  public reloadNotes(): void {
    this.notes$.next(this.storageService.loadNotes());
  }

  public createNote(title?: string, description?: string): void {
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

  public deleteNote(id: string): void {
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

  public updateNote(id: string, title?: string, description?: string): void {}

  public archiveNote(id: string): void {}
}
