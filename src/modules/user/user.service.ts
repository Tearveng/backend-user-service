import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { omit } from 'src/utils/RemoveAttribute';
import { DeepPartial, Repository } from 'typeorm';
import { UsersEntity } from '../../entities/Users';
import { UpdateUserDTO } from '../../dto/RegisterUserDTO';

export const saltRounds = 10;
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  // find exist user by email
  async findExistByEmail(email: string) {
    const existEmail = await this.userRepository.findOneBy({ email });
    if (existEmail) {
      this.logger.error(`user already exist with this email ${email}`);
      throw new BadRequestException(
        `User already exist with this email`,
        `${email}`,
      );
    }
    return false;
  }

  // create user
  async createUser(user: DeepPartial<UsersEntity>) {
    await this.findExistByEmail(user.email);
    const hasPassword = bcrypt.hashSync(user.password, saltRounds);
    const create = this.userRepository.create({
      ...user,
      password: hasPassword,
    });
    const save = await this.userRepository.save(create);
    this.logger.log('user is registered', save);
    return omit(save, 'password');
  }

  // find product by id
  async findById(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      this.logger.error('User not found with this id', id);
      throw new NotFoundException('user not found');
    }
    this.logger.log(`[User]: ${JSON.stringify(user, null, 2)}`);
    return user;
  }

  // find all users pagination
  async paginateUsers(page = 1, limit = 10) {
    const [users, total] = await this.userRepository.findAndCount({
      order: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      meta: {
        totalItems: total,
        itemCount: users.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  // update user
  async updateUser(id: number, user: UpdateUserDTO) {
    const previous = await this.findById(id);
    const save = await this.userRepository.save({
      ...previous,
      ...user,
    });
    this.logger.log('user is updated', save);
    return save;
  }

  // delete user
  async deleteUser(id: number) {
    this.logger.log('user is deleted', id);
    return this.userRepository.delete(id);
  }

  // find user by email
  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (!user) {
      this.logger.error('user not found with this email', email);
      throw new NotFoundException('User not found');
    }
    this.logger.log(`[User]: ${JSON.stringify(user, null, 2)}`);
    return user;
  }
}
