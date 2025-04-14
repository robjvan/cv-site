import { TodoStatus } from './enums/todo-status.enum';
import { v4 as uuidv4 } from 'uuid';

export interface ITodo {
  id: string;
  status: TodoStatus;
  description?: string;
  dueDate?: string;
  archived: boolean;
  title?: string;
}
