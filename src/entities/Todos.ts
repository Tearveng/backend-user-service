import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './Users';
import { TodoStatus } from '../shared/enum';

@Entity()
export class TodosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.TODO,
  })
  status: TodoStatus;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  sortOrder: number;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @ManyToOne(() => UsersEntity, (user) => user.todos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
