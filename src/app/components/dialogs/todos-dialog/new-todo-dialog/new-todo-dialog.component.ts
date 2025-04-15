import { Component, signal } from '@angular/core';
import { DialogWindowComponent } from '../../../dialog-window/dialog-window.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../../services/todo.service';
import { LauncherService } from '../../../../services/launcher.service';
import { DialogPurpose } from '../../../../models/enums/dialog-purpose.enum';
import { TodoStatus } from '../../../../models/enums/todo-status.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new-todo-dialog',
  imports: [DialogWindowComponent, FormsModule, CommonModule],
  templateUrl: './new-todo-dialog.component.html',
  styleUrl: './new-todo-dialog.component.scss',
})
export class NewTodoDialogComponent {
  title = signal<string>('');
  description = signal<string>('');
  dueDate = signal<string>('');
  status = signal<string>('');
  hasDueDate = signal<boolean>(false);
  trackStatus = signal<boolean>(false);

  constructor(
    private readonly todosService: TodoService,
    private readonly launcherService: LauncherService
  ) {}

  private readonly statusMap: Record<string, TodoStatus> = {
    NEW: TodoStatus.NEW,
    IN_PROGRESS: TodoStatus.IN_PROGRESS,
    ON_HOLD: TodoStatus.ON_HOLD,
  };

  /** Calls the todos service to save a new todo to local storage. */
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

  /** Resets our signals for the next new todo. */
  public clearForm(): void {
    this.title.set('');
    this.description.set('');
    this.dueDate.set('');
    this.status.set('');
  }

  /** Clears the status field when the toggle is unchecked */
  public handleStatusChecked(): void {
    if (!this.trackStatus()) {
      this.status.set('');
    }
  }

  /** Clears the due date field when the toggle is unchecked */
  public handleDueDateChecked(): void {
    if (!this.hasDueDate()) {
      this.dueDate.set('mm/dd/yyyy');
    }
  }
}
