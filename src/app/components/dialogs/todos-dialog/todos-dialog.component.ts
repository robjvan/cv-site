import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { IOpenApps } from '../../../models/open-apps.interface';
import { TodoService } from '../../../services/todo.service';
import { ITodo } from '../../../models/todo.interface';
import { NewTodoDialogComponent } from './new-todo-dialog/new-todo-dialog.component';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';
import { DeleteTodoDialogComponent } from './delete-todo-dialog/delete-todo-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { StorageService } from '../../../services/storage.service';

/**
 * TodosDialogComponent displays and manages a draggable, reorderable
 * list of user todo items. It supports creation, editing, deletion, and
 * persistence via signals and service interactions.
 *
 * The component reacts to dialog state and archive visibility toggles,
 * and integrates Angular CDK drag-and-drop functionality.
 */
@Component({
  selector: 'todos-dialog',
  imports: [
    DialogWindowComponent,
    TodoCardComponent,
    NewTodoDialogComponent,
    EditTodoDialogComponent,
    DeleteTodoDialogComponent,
    ScrollingModule,
    MatListModule,
    CommonModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './todos-dialog.component.html',
  styleUrl: './todos-dialog.component.scss',
})
export class TodosDialogComponent implements OnInit {
  /** Subject to destroy subscriptions and avoid memory leaks. */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Writable signal containing the current list of todos.
   * Filters archived todos unless explicitly toggled.
   */
  public todos: WritableSignal<ITodo[]> = signal([]);

  /**
   * Controls visibility of archived todos.
   * Toggled via button, affects filtering logic.
   */
  public showArchived: WritableSignal<boolean> = signal(false);

  /** Default state for dialog visibility when component loads. */
  private initialState: Partial<IOpenApps> = {
    showNewTodoDialog: false,
    showEditTodoDialog: false,
    showDeleteTodoDialog: false,
  };

  /**
   * Map of dialog types to DialogPurpose enum values.
   * Used for dynamically opening todo-related modals.
   */
  private dialogMap: Record<string, DialogPurpose> = {
    newTodo: DialogPurpose.NEW_TODO,
    editTodo: DialogPurpose.EDIT_TODO,
    deleteTodo: DialogPurpose.DELETE_TODO,
  };

  /**
   * Writable signal for tracking open dialogs.
   * Subscribed to LauncherService's openApps$ stream.
   */
  private openDialogs: WritableSignal<Partial<IOpenApps>> = signal(
    this.initialState
  );

  /**
   * Constructor injects required services.
   *
   * @param {LauncherService} launcherService - Manages dialog open/close state.
   * @param {TodoService} todosService - Emits and persists todo list data.
   * @param {StorageService} storageService - Handles saving todos to persistent storage.
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly todosService: TodoService,
    private readonly storageService: StorageService
  ) {}

  /**
   * Angular lifecycle hook that initializes subscriptions
   * to todos and dialog state, and fetches data.
   */
  public ngOnInit(): void {
    this.todosService.reloadTodos(); // Initial fetch

    // Subscribe to todos list updates
    this.todosService.todos$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (todos: ITodo[]) => {
        if (this.showArchived()) {
          this.todos.set(todos); // Show all
        } else {
          this.todos.set(todos.filter((el) => !el.archived)); // Filter archived
        }
      },
      error: (err: any) =>
        console.error('[TodosDialogComponent] Todos error:', err.message),
    });

    // Subscribe to dialog visibility updates
    this.launcherService.openApps$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (openApps: IOpenApps) => {
        this.openDialogs.set(openApps);
      },
      error: (err: any) =>
        console.error(
          '[TodosDialogComponent] Dialog state error:',
          err.message
        ),
    });
  }

  /**
   * Angular lifecycle hook to tear down subscriptions.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Opens a dialog of the given type ('newTodo', 'editTodo', etc.).
   *
   * @param {string} type - A string key representing the dialog to open.
   */
  public openDialog(type: string): void {
    // Use a map to determine which dialog to open
    this.launcherService.showDialog(this.dialogMap[type]);
  }

  /**
   * Returns whether a dialog identified by `dialogKey` is currently open.
   *
   * @param {keyof IOpenApps} dialogKey - A key from IOpenApps representing dialog visibility.
   * @returns {boolean} true if the dialog is open, false otherwise.
   */
  public getDialogState(dialogKey: keyof IOpenApps): boolean {
    return this.openDialogs()[dialogKey] ?? false;
  }

  /**
   * Toggles the visibility of archived todos.
   * Adds/removes a CSS class and reloads todos to reflect filter.
   */
  public toggleShowArchived(): void {
    const el = document.querySelector('#show-archived-btn');

    if (this.showArchived()) {
      el?.classList.remove('show-archived');
      this.showArchived.set(false);
    } else {
      el?.classList.add('show-archived');
      this.showArchived.set(true);
    }
    this.todosService.reloadTodos();
  }

  /**
   * Handles reordering of todos via drag-and-drop.
   * Updates order in memory, saves to storage, then refreshes.
   *
   * @param {CdkDragDrop<string[], string[], any>} event - Drag event containing new item positions.
   */
  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todos(), event.previousIndex, event.currentIndex);
    this.storageService.saveTodos(this.todos());
    this.todosService.reloadTodos();
  }
}
