import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, take } from 'rxjs';
import { ITodo } from '../models/todo.interface';
import { v4 as uuidv4 } from 'uuid';
import { NewTodoDto } from '../models/dtos/new-todo.dto';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly storageService: StorageService) {}

  /** Observable stream of todo items */
  public todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);

  /** Reloads todos from local storage into the observable stream. */
  public reloadTodos(): void {
    this.todos$.next(this.storageService.loadTodos());
    // TODO(RV): Fix this so it loads archived todos after current ones
  }

  /** Creates a new todo item and adds it to the current list.
   *
   * @param todo - The new todo data transfer object
   */
  public createTodo(todo: NewTodoDto): void {
    try {
      const newTodo: ITodo = {
        id: uuidv4(),
        dueDate: todo.dueDate,
        status: todo.status ?? undefined,
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

  /** Updates a todo item by merging new data with the existing item.
   *
   * @param id - ID of the todo to update
   * @param newData - Partial fields to update on the todo
   */
  public updateTodo(id: string, newData: Partial<NewTodoDto>): void {
    try {
      this.todos$.pipe(take(1)).subscribe({
        next: (currentTodos: ITodo[]) => {
          // Run a map on all list entries checking the id field.
          // If the id matches our updated Todo object, apply new data.
          const updatedTodos = currentTodos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  ...newData,
                }
              : todo
          );

          // Apply the updated todo list to the behavior subject.
          // this.todos$.next(updatedTodos);
          this.storageService.saveTodos(updatedTodos);
          this.reloadTodos();
        },
        error: (err) => console.log(err.message),
      });
    } catch (err: any) {
      console.log(`Failed to update todo with id: ${id}`, err.message);
    }
  }

  /** Deletes a todo item by its ID.
   *
   * @param id - ID of the todo to delete
   */
  public deleteTodo(id: string): void {
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
