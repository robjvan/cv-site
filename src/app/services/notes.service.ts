import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, take } from 'rxjs';
import { INote } from '../models/note.interface';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

/**
 * NotesService manages the state and storage of user-created notes.
 *
 * It supports creation, deletion, retrieval, and future expansion for updates and archiving.
 * State is maintained reactively via a BehaviorSubject and synchronized with localStorage through StorageService.
 */
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  /**
   * Constructor injects a storage layer for persistence.
   *
   * @param {StorageService} storageService - Handles saving and loading notes from local storage.
   */
  constructor(private readonly storageService: StorageService) {}

  /**
   * Observable stream of notes.
   * Can be subscribed to from components to receive real-time updates.
   */
  public notes$: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);

  /**
   * Loads notes from persistent storage and updates the observable state.
   */
  public reloadNotes(): void {
    this.notes$.next(this.storageService.loadNotes());
  }

  /**
   * Creates a new note object and adds it to the current note stream.
   *
   * @param {string} title - Optional title for the new note.
   * @param {string} description - Optional description or body content.
   */
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

  /**
   * Deletes a note by ID and updates both the observable and persistent storage.
   *
   * @param {string} id - Unique identifier of the note to delete.
   */
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

  /**
   * Placeholder for future implementation to update a note's title or description.
   *
   * @param {string} id - Note ID to update.
   * @param {string} title - New title value (optional).
   * @param {string} description - New description value (optional).
   */
  public updateNote(id: string, title?: string, description?: string): void {}

  /**
   * Placeholder for future implementation to archive a note.
   *
   * @param {string} id - Note ID to archive.
   */
  public archiveNote(id: string): void {}
}
