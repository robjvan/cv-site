import { Component, OnInit, signal } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
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
  private destroy$ = new Subject<void>();

  private initialState = {
    showNewNoteDialog: false,
    showEditNoteDialog: false,
    showDeleteNoteDialog: false,
  };

  public notes = signal<INote[]>([]);
  public openApps = signal<Partial<IOpenApps>>(this.initialState);

  constructor(
    private readonly launcherService: LauncherService,
    private readonly notesService: NotesService
  ) {}

  public ngOnInit(): void {
    this.notesService.reloadNotes();

    this.notesService.notes$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (notes: INote[]) => {
        this.notes.set(notes);
      },
      error: (err) => console.log(err.message),
    });

    this.launcherService.openApps$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (openApps: IOpenApps) => {
        this.openApps.set(openApps);
        console.log(openApps);
      },
      error: (err: any) => console.log(err.message),
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDialog(type: string): void {
    // Use a map to determine which dialog to open
    const dialogMap: Record<string, DialogPurpose> = {
      newNote: DialogPurpose.NEW_NOTE,
      editNote: DialogPurpose.EDIT_NOTE,
      deleteNote: DialogPurpose.DELETE_NOTE,
    };

    this.launcherService.showDialog(dialogMap[type]);
  }

  public getDialogState(dialogKey: keyof IOpenApps): boolean {
    return this.openApps()[dialogKey] ?? false;
  }
}
