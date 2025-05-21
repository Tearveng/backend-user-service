// dto/update-todo-order.dto.ts
import { IsArray, IsInt } from 'class-validator';

export class UpdateTodoOrderDto {
  @IsArray()
  @IsInt({ each: true })
  orderedTodoIds: number[];
}
