import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DialogWindowComponent } from '../../common/dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { INote } from '../../../models/note.interface';
import { NotesService } from '../../../services/notes.service';
import { IOpenApps } from '../../../models/open-apps.interface';
import { NoteCardComponent } from './note-card/note-card.component';
import { NewNoteDialogComponent } from './new-note-dialog/new-note-dialog.component';
import { EditNoteDialogComponent } from './edit-note-dialog/edit-note-dialog.component';
import { DeleteNoteDialogComponent } from './delete-note-dialog/delete-note-dialog.component';
import { Subject, takeUntil } from 'rxjs';

/**
 * NotesDialogComponent is responsible for rendering the main notes dashboard.
 *
 * It displays the user's notes and conditionally opens dialogs for
 * creating, editing, and deleting notes.
 */
@Component({
  selector: 'notes-dialog',
  imports: [
    DialogWindowComponent,
    NoteCardComponent,
    NewNoteDialogComponent,
    EditNoteDialogComponent,
    DeleteNoteDialogComponent,
  ],
  templateUrl: './notes-dialog.component.html',
  styleUrl: './notes-dialog.component.scss',
})
export class NotesDialogComponent implements OnInit {
  /** Cleanup subject for unsubscribing from RxJS streams. */
  private destroy$: Subject<void> = new Subject<void>();

  /** Initial visibility state for all note-related modals. */
  private initialState = {
    showNewNoteDialog: false,
    showEditNoteDialog: false,
    showDeleteNoteDialog: false,
  };

  /**
   * Reactive signal containing the user's list of notes.
   * Automatically updated from the NotesService.
   */
  public notes: WritableSignal<INote[]> = signal([]);

  /**
   * Signal for tracking which note-related dialogs are currently open.
   */
  public openApps: WritableSignal<Partial<IOpenApps>> = signal(
    this.initialState
  );

  /**
   * Constructor injects services for managing notes and dialog states.
   *
   * @param launcherService - Controls app-wide dialog visibility
   * @param notesService - Manages note creation, updates, and retrieval
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly notesService: NotesService
  ) {}

  /**
   * Lifecycle hook for initializing the component.
   * Subscribes to note and dialog state streams to maintain UI consistency.
   */
  public ngOnInit(): void {
    this.notesService.reloadNotes(); // Triggers loading from local storage or source

    // Listen for updated notes list
    this.notesService.notes$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (notes: INote[]) => {
        this.notes.set(notes);
      },
      error: (err) => console.log(err.message),
    });

    // Listen for dialog visibility state
    this.launcherService.openApps$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (openApps: IOpenApps) => {
        this.openApps.set(openApps);
        console.log(openApps);
      },
      error: (err: any) => console.log(err.message),
    });
  }

  /**
   * Cleans up all subscriptions on component teardown to prevent memory leaks.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Opens a specific note dialog based on the provided type string.
   *
   * @param {DialogPurpose} type - String key matching a DialogPurpose enum entry
   */
  public openDialog(type: string): void {
    // Use a map to determine which dialog to open
    const dialogMap: Record<string, DialogPurpose> = {
      newNote: DialogPurpose.NEW_NOTE,
      editNote: DialogPurpose.EDIT_NOTE,
      deleteNote: DialogPurpose.DELETE_NOTE,
    };

    this.launcherService.showDialog(dialogMap[type]);
  }

  /**
   * Returns the open/closed state of a specific dialog.
   *
   * @param {keyof IOpenApps} dialogKey - One of the keys from the IOpenApps state interface
   * @returns {boolean} boolean indicating visibility status
   */
  public getDialogState(dialogKey: keyof IOpenApps): boolean {
    return this.openApps()[dialogKey] ?? false;
  }
}
