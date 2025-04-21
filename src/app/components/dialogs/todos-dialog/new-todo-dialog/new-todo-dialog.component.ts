import { Component, signal, WritableSignal } from '@angular/core';
import { DialogWindowComponent } from '../../../dialog-window/dialog-window.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../../services/todo.service';
import { LauncherService } from '../../../../services/launcher.service';
import { DialogPurpose } from '../../../../models/enums/dialog-purpose.enum';
import { TodoStatus } from '../../../../models/enums/todo-status.enum';
import { CommonModule } from '@angular/common';

/**
 * NewTodoDialogComponent provides a UI dialog for creating new todo items.
 *
 * It allows users to optionally track due dates and status, then submit
 * their todo to be saved and persisted locally.
 */
@Component({
  selector: 'new-todo-dialog',
  imports: [DialogWindowComponent, FormsModule, CommonModule],
  templateUrl: './new-todo-dialog.component.html',
  styleUrl: './new-todo-dialog.component.scss',
})
export class NewTodoDialogComponent {
  /** Title input value for the new todo. */
  title: WritableSignal<string> = signal('');

  /** Description or body text of the new todo. */
  description: WritableSignal<string> = signal('');

  /** Due date as a raw string (optional). */
  dueDate: WritableSignal<string> = signal('');

  /** Status string input (mapped to TodoStatus). */
  status: WritableSignal<string> = signal('');

  /** Toggle flag for enabling/disabling the due date field. */
  hasDueDate: WritableSignal<boolean> = signal(false);

  /** Toggle flag for enabling/disabling status selection. */
  trackStatus: WritableSignal<boolean> = signal(false);

  /**
   * Constructor injects services to create todos and manage dialog state.
   *
   * @param {TodoService} todosService - Provides methods to store and manage todo objects.
   * @param {LauncherService} launcherService - Controls visibility of dialogs via centralized app state.
   */
  constructor(
    private readonly todosService: TodoService,
    private readonly launcherService: LauncherService
  ) {}

  /**
   * Maps user-readable status labels to the TodoStatus enum.
   */
  private readonly statusMap: Record<string, TodoStatus> = {
    NEW: TodoStatus.NEW,
    IN_PROGRESS: TodoStatus.IN_PROGRESS,
    ON_HOLD: TodoStatus.ON_HOLD,
  };

  /**
   * Attempts to save the todo by calling the TodoService.
   * Performs basic validation and resets form state on success.
   */
  public saveTodo(): void {
    try {
      if (this.title() !== '' || this.description() !== '') {
        // Send a request to our notes service to save the todo.
        this.todosService.createTodo({
          title: this.title(),
          description: this.description(),
          dueDate:
            this.dueDate() == 'mm/dd/yyyy' || this.dueDate() == ''
              ? ''
              : this.dueDate(),
          status: this.statusMap[this.status()],
        });

        // Clear the form before closing.
        this.clearForm();

        // Close the new todo dialog.
        this.launcherService.closeDialog(DialogPurpose.NEW_TODO);
      }
    } catch (err: any) {
      console.log(`Failed to save new todo`, err.message);
    }
  }

  /** Clears the form fields to prepare for new entry or after submission. */
  public clearForm(): void {
    this.title.set('');
    this.description.set('');
    this.dueDate.set('');
    this.status.set('');
  }

  /**
   * Clears the status value if the "Track Status" toggle is turned off.
   * Called when the toggle is unchecked.
   */
  public handleStatusChecked(): void {
    if (!this.trackStatus()) {
      this.status.set('');
    }
  }

  /**
   * Sets a placeholder or resets the due date if the toggle is turned off.
   * Called when the "Has Due Date" checkbox is unchecked.
   */
  public handleDueDateChecked(): void {
    if (!this.hasDueDate()) {
      this.dueDate.set('mm/dd/yyyy');
    }
  }
}
