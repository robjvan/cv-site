import { TodoStatus } from '../enums/todo-status.enum';

export class NewTodoDto {
  description?: string;
  dueDate?: string;
  title?: string;
  status?: TodoStatus;
}
