import { Component, input, InputSignal } from '@angular/core';
import { ITodo } from '../../../../models/todo.interface';
import { TodoService } from '../../../../services/todo.service';
import { TodoStatus } from '../../../../models/enums/todo-status.enum';
import moment from 'moment';
import { CommonModule } from '@angular/common';

/**
 * TodoCardComponent represents a single todo item card.
 *
 * It handles presentation logic (status, color, due date) and
 * user interactions such as status updates, archiving, and deletion.
 */
@Component({
  selector: 'todo-card',
  imports: [CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  /**
   * Input signal containing the todo item.
   * Supplied by the parent component to bind individual todo data.
   */
  public todo: InputSignal<ITodo | undefined> = input<ITodo | undefined>(
    undefined
  );

  /**
   * Constructor injects the TodoService for interaction with backend/state.
   *
   * @param {TodoService} todosService - Service to perform CRUD operations on todos.
   */
  constructor(private readonly todosService: TodoService) {}

  /**
   * Placeholder method for editing todos.
   * Actual implementation handled elsewhere (e.g. launching modal).
   */
  public editTodo(): void {}

  /**
   * Deletes the current todo if it is not archived.
   * Prevents accidental removal of archived items.
   */
  public deleteTodo(): void {
    if (!this.todo()?.archived) {
      this.todosService.deleteTodo(this.todo()!.id);
    }
  }

  /**
   * Maps each TodoStatus enum to a display string and CSS class.
   * Used for badge styling and user-readable labels.
   */
  private readonly statusMap: Record<
    TodoStatus,
    { status: string; colorClass: string }
  > = {
    [TodoStatus.NEW]: { status: 'NEW', colorClass: 'new' },
    [TodoStatus.ON_HOLD]: { status: 'ON HOLD', colorClass: 'onhold' },
    [TodoStatus.CANCELLED]: { status: 'CANCELLED', colorClass: 'cancelled' },
    [TodoStatus.COMPLETE]: { status: 'COMPLETE', colorClass: 'complete' },
    [TodoStatus.IN_PROGRESS]: {
      status: 'IN PROGRESS',
      colorClass: 'inprogress',
    },
  };

  /**
   * Maps lowercase status strings to their enum equivalents.
   * Enables dynamic status changes from the UI.
   */
  private readonly statusStringMap: Record<string, TodoStatus> = {
    new: TodoStatus.NEW,
    onhold: TodoStatus.ON_HOLD,
    cancelled: TodoStatus.CANCELLED,
    complete: TodoStatus.COMPLETE,
    inprogress: TodoStatus.IN_PROGRESS,
  };

  /**
   * Gets the user-facing label for the current status.
   *
   * @returns {string} Readable status (e.g. 'IN PROGRESS').
   */
  public get status(): string | undefined {
    if (this.todo()!.status !== undefined) {
      return this.statusMap[this.todo()!.status!].status;
    }

    return undefined;
  }

  /**
   * Formats the due date (if available) using Moment.js.
   *
   * @returns {string | null} A nicely formatted due date or null.
   */
  public get dueDate(): string | null {
    if (this.todo()?.dueDate) {
      return moment(this.todo()?.dueDate).format('dddd MMMM Do');
    } else {
      return null;
    }
  }

  /**
   * Returns the appropriate CSS class for the todo badge based on status.
   * If archived, applies a 'disabled' style instead.
   *
   * @returns {string} The CSS class name.
   */
  public get getColorClass(): string {
    if (this.todo()?.archived) {
      return 'disabled-badge';
    }
    return this.statusMap[this.todo()!.status!].colorClass;
  }

  /**
   * Updates the status of the current todo item.
   *
   * @param statusKey - Key matching a status in `statusStringMap`.
   */
  public updateStatus(statusKey: string): void {
    if (!this.todo()?.archived) {
      this.todosService.updateTodo(this.todo()?.id!, {
        status: this.statusStringMap[statusKey],
      });
    }
  }

  /**
   * Toggles the `archived` state of the todo item.
   * Archives if active, and restores if already archived.
   */
  public toggleArchivedStatus() {
    if (this.todo()?.archived) {
      this.todosService.updateTodo(this.todo()?.id!, { archived: false });
    } else {
      this.todosService.updateTodo(this.todo()?.id!, { archived: true });
    }
  }

  /**
   * Returns whether the current todo is archived.
   *
   * @returns {boolean}
   */
  public get archived(): boolean {
    return this.todo()?.archived!;
  }
}
