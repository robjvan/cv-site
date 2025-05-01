import { TodoStatus } from './enums/todo-status.enum';

export interface ITodo {
  /** Unique identifier for the todo item. */
  id: string;

  /** Current status of the todo item, based on the TodoStatus enum. */
  status?: TodoStatus;

  /** Optional detailed description of the task. */
  description?: string;

  /** Optional due date for the task. */
  dueDate?: string;

  /** Indicates whether the todo item has been archived. */
  archived: boolean;

  /** Optional short title or summary of the task. */
  title?: string;
}
