// todos/dtos/create-todo.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { TodoStatus } from '../../shared/enum';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  status?: TodoStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  userId?: number; // Assuming user is passed by ID
}
