import { TodoStatus } from '../enums/todo-status.enum';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class NewTodoDto {
  /** Optional text describing the task in more detail. */
  @IsString()
  @IsOptional()
  description?: string;

  /** Optional due date string for the task. */
  @IsString()
  @IsOptional()
  dueDate?: string;

  /** Optional short title or summary of the task. */
  @IsString()
  @IsOptional()
  title?: string;

  /** Optional status of the task, must be a valid TodoStatus enum value. */
  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;

  /** Optional status of the task, must be a valid TodoStatus enum value. */
  @IsBoolean()
  @IsOptional()
  archived?: boolean;
}
