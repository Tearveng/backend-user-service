// todos/dtos/create-todo.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  userId?: number; // Assuming user is passed by ID
}
