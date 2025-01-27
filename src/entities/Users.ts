import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ nullable: true })
  publicId: string;

  username: string;

  @Column({ type: 'json' })
  roles: string[];

  @AfterLoad()
  afterLoad() {
    this.username = `${this.firstName} ${this.lastName}`;
    if (!this.roles) {
      this.roles = [];
    }
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
