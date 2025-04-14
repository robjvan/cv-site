import { Component, input } from '@angular/core';
import { ITodo } from '../../../../models/todo.interface';
import { TodoService } from '../../../../services/todo.service';
import { TodoStatus } from '../../../../models/enums/todo-status.enum';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { DialogPurpose } from '../../../../models/enums/dialog-purpose.enum';

@Component({
  selector: 'todo-card',
  imports: [CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  todo = input<ITodo | undefined>(undefined);
  constructor(private readonly todosService: TodoService) {}

  editTodo() {}

  deleteTodo() {
    this.todosService.deleteTodo(this.todo()!.id);
  }

  private readonly statusMap: Record<TodoStatus, string> = {
    [TodoStatus.NEW]: 'NEW',
    [TodoStatus.ON_HOLD]: 'ON HOLD',
    [TodoStatus.CANCELLED]: 'CANCELLED',
    [TodoStatus.COMPLETE]: 'COMPLETE',
    [TodoStatus.IN_PROGRESS]: 'IN PROGRESS',
  };

  private readonly statusClassMap: Record<TodoStatus, string> = {
    [TodoStatus.NEW]: 'new',
    [TodoStatus.ON_HOLD]: 'onhold',
    [TodoStatus.CANCELLED]: 'cancelled',
    [TodoStatus.COMPLETE]: 'complete',
    [TodoStatus.IN_PROGRESS]: 'inprogress',
  };

  get status() {
    const status = this.todo()!.status;
    return this.statusMap[status];
  }

  get dueDate(): string | null {
    if (this.todo()?.dueDate) {
      // return moment(this.todo()?.dueDate).format('ddd MMM Do h:mm A');
      return moment(this.todo()?.dueDate).format('dddd MMMM Do');
    }

    return null;
  }

  getColorClass() {
    const status = this.todo()!.status;
    return this.statusClassMap[status];
  }
}
