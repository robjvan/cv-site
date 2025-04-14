import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, take } from 'rxjs';
import { ITodo } from '../models/todo.interface';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { NewTodoDto } from '../models/dtos/new-todo.dto';
import { TodoStatus } from '../models/enums/todo-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly storageService: StorageService) {}

  todos$ = new BehaviorSubject<ITodo[]>([]);

  reloadTodos(): void {
    this.todos$.next(this.storageService.loadTodos());
  }

  createTodo(todo: NewTodoDto): void {
    try {
      const newTodo: ITodo = {
        id: uuidv4(),
        dueDate: todo.dueDate,
        status: todo.status ?? TodoStatus.NEW,
        description: todo.description ?? '',
        title: todo.title ?? '',
        archived: false,
      };

      this.todos$.pipe(take(1)).subscribe({
        next: (todos: ITodo[]) => {
          const newTodosList = [...todos, newTodo];
          this.storageService.saveTodos(newTodosList);
          this.reloadTodos();
        },
        error: (err: any) => console.log(err.message),
      });
    } catch (err: any) {
      console.log(`Failed to add new todo`, err.message);
    }
  }

  updateTodo(id: string, newData: Partial<NewTodoDto>): void {
    try {
      console.log(id, newData);
      // TODO(RV): Add logic
    } catch (err: any) {
      console.log(`Failed to delete todo with id: ${id}`, err.message);
    }
  }

  deleteTodo(id: string): void {
    try {
      this.todos$.pipe(take(1)).subscribe({
        next: (todos: ITodo[]) => {
          this.storageService.saveTodos(
            todos.filter((todo: ITodo) => todo.id != id)
          );
        },
        error: (err: any) => console.log(err.message),
      });

      this.reloadTodos();
    } catch (err: any) {
      console.log(`Failed to delete todo with id: ${id}`, err.message);
    }
  }
}
