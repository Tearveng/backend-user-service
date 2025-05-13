import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosEntity } from '../../entities/Todos';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../../dto/todos/create-todo.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @InjectRepository(TodosEntity)
    private readonly todosRepository: Repository<TodosEntity>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  // create item_todo
  async create(createTodoDto: CreateTodoDto): Promise<TodosEntity> {
    const { title, description, isCompleted, dueDate, userId } = createTodoDto;

    const todo = this.todosRepository.create({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      isCompleted: isCompleted ?? false,
    });

    if (userId) {
      todo.user = await this.userService.findById(userId);
    }
    this.logger.log(`[Todo]: Todo created successfully.`);
    return this.todosRepository.save(todo);
  }
}
