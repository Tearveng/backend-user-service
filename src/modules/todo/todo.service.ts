import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
  async create(
    req: Request,
    createTodoDto: CreateTodoDto,
  ): Promise<TodosEntity> {
    const currentUserId = (req as any).user.userId;
    const {
      title,
      description,
      isCompleted,
      dueDate,
      status,
      userId = currentUserId,
    } = createTodoDto;

    const todo = this.todosRepository.create({
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      isCompleted: isCompleted ?? false,
    });

    if (userId) {
      todo.user = await this.userService.findById(userId);
    }
    this.logger.log(`[Todo]: Todo created successfully.`);
    return this.todosRepository.save(todo);
  }

  async findTodoById(id: number) {
    const todo = this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('Todo not found with this id: ' + id);
    }

    return todo;
  }

  // update item_todo
  async update(id: number, updateTodoDto: CreateTodoDto): Promise<TodosEntity> {
    const previousTodo = await this.findTodoById(id);
    const save = await this.todosRepository.save({
      ...previousTodo,
      ...updateTodoDto,
    });
    this.logger.log('todo is updated', save);
    return save;
  }

  // find all todos pagination
  async getAllTodos(req: Request) {
    const currentUserId = (req as any).user.userId;
    return this.todosRepository.find({
      where: {
        user: {
          id: currentUserId,
        },
      },
    });
  }
}
