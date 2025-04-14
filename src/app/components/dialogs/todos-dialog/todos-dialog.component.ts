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

@Component({
  selector: 'todos-dialog',
  imports: [
    DialogWindowComponent,
    TodoCardComponent,
    NewTodoDialogComponent,
    EditTodoDialogComponent,
    DeleteTodoDialogComponent,
  ],
  templateUrl: './todos-dialog.component.html',
  styleUrl: './todos-dialog.component.scss',
})
export class TodosDialogComponent implements OnInit {
  private destroy$ = new Subject<void>();

  private initialState = {
    showNewTodoDialog: false,
    showEditTodoDialog: false,
    showDeleteTodoDialog: false,
  };

  /** Writable signal to store a list of the user's todo objects.
   * This is kept reactive to reflect real-time UI updates.
   */
  todos: WritableSignal<ITodo[]> = signal<ITodo[]>([]);

  /** Writable signal to store the current state of open dialogs.
   * This is kept reactive to reflect real-time UI updates.
   */
  openDialogs: WritableSignal<Partial<IOpenApps>> = signal<Partial<IOpenApps>>(
    this.initialState
  );

  /** Constructor injects required services.
   *
   * @param {LauncherService} launcherService Provides the observable stream of open applications.
   * @param {TodoService} todosService Provides the observable stream of todo objects.
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly todosService: TodoService
  ) {}

  /** Angular lifecycle hook.
   * Subscribes to todo and open apps streams  on initialization to keep UI in sync.
   */
  ngOnInit(): void {
    this.todosService.reloadTodos();

    // Fetch the list of todo objects.
    this.todosService.todos$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (todos: ITodo[]) => {
        // Update the signal with latest list of todo objects.
        this.todos.set(todos);
      },
      error: (err: any) => console.log(err.message),
    });

    // Fetch the list of open dialogs.
    this.launcherService.openApps$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (openApps: IOpenApps) => {
        // Update the signal with latest open dialog state.
        this.openDialogs.set(openApps);
      },
      error: (err: any) => console.log(err.message),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog(type: string): void {
    // Use a map to determine which dialog to open
    const dialogMap: Record<string, DialogPurpose> = {
      newTodo: DialogPurpose.NEW_TODO,
      editTodo: DialogPurpose.EDIT_TODO,
      deleteTodo: DialogPurpose.DELETE_TODO,
    };

    this.launcherService.showDialog(dialogMap[type]);
  }

  getDialogState(dialogKey: keyof IOpenApps): boolean {
    return this.openDialogs()[dialogKey] ?? false;
  }
}
