import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosEntity } from '../../entities/Todos';
import { In, Repository } from 'typeorm';
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
    const maxSortOrderResult = await this.todosRepository
      .createQueryBuilder('todo')
      .select('MAX(todo.sortOrder)', 'max')
      .where('todo.status = :status', { status: 'TODO' })
      .getRawOne();
    const todo = this.todosRepository.create({
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      sortOrder: (maxSortOrderResult?.max ?? 0) + 1,
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
      order: { sortOrder: 'ASC' },
      where: {
        user: {
          id: currentUserId,
        },
      },
    });
  }

  // update todos order
  async updateOrder(orderedIds: number[]) {
    const todos = await this.todosRepository.findBy({ id: In(orderedIds) });
    const todoMap = new Map(todos.map((todo) => [todo.id, todo]));
    const updatedTodos = orderedIds.map((id, index) => {
      const todo = todoMap.get(id);
      if (todo) {
        todo.sortOrder = index;
      }
      return todo;
    });
    await this.todosRepository.save(updatedTodos);
    return { success: true };
  }

  // delete item_todo
  async deleteUser(id: number) {
    this.logger.log('todo is deleted', id);
    return this.todosRepository.delete(id);
  }
}
