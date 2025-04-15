import { Injectable } from '@angular/core';
import { INote } from '../models/note.interface';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Generic load helper
  private loadFromStorage<T>(key: string): T[] {
    try {
      const rawData = localStorage.getItem(key);
      return rawData ? (JSON.parse(rawData) as T[]) : [];
    } catch (err: any) {
      console.error(`Failed to load "${key}" from localStorage`, err.message);
      return [];
    }
  }

  // Generic save helper
  private saveToStorage<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err: any) {
      console.error(`Failed to save "${key}" to localStorage`, err.message);
    }
  }

  //* ###### Notes ########################################################################

  /** Loads and returns any note objects found in local storage.
   *
   * @returns {INote[]} The list of note objects that were  retrieved from local storage.
   */
  public loadNotes(): INote[] {
    return this.loadFromStorage<INote>('notes');
  }

  /** Saves the user's current list of note objects to local storage.
   *
   * @param {INote[]} notes The list of note objects to be saved.
   */
  public saveNotes(notes: INote[]): void {
    this.saveToStorage<INote>('notes', notes);
  }

  //* ###### Todos ########################################################################

  /** Loads and returns any todo objects found in local storage.
   *
   * @returns {ITodo[]} The list of todo objects that were retrieved from local storage.
   */
  public loadTodos(): ITodo[] {
    return this.loadFromStorage<ITodo>('todos');
  }

  /** Saves the user's current list of todo objects to local storage.
   *
   * @param {ITodo[]} todos The list of todo objects to be saved.
   */
  public saveTodos(todos: ITodo[]): void {
    this.saveToStorage<ITodo>('todos', todos);
  }
}
