import { Component, input } from '@angular/core';
import { ITodo } from '../../../../models/todo.interface';
import { TodoService } from '../../../../services/todo.service';
import { TodoStatus } from '../../../../models/enums/todo-status.enum';
import moment from 'moment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-card',
  imports: [CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  public todo = input<ITodo | undefined>(undefined);

  constructor(private readonly todosService: TodoService) {}

  public editTodo() {}

  public deleteTodo() {
    this.todosService.deleteTodo(this.todo()!.id);
  }

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

  public get status(): string {
    return this.statusMap[this.todo()!.status].status;
  }

  public get dueDate(): string | null {
    if (this.todo()?.dueDate) {
      return moment(this.todo()?.dueDate).format('dddd MMMM Do');
    } else {
      return null;
    }
  }

  public get getColorClass(): string {
    return this.statusMap[this.todo()!.status].colorClass;
  }
}
