import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entities/Users';
import { bcrypt } from 'bcrypt';

const saltRounds = 10;
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
        `Product already exist with this skuCode ${email}`,
        `${email}`,
      );
    }
    return false;
  }

  // create user
  async createUser(user: UsersEntity) {
    await this.findExistByEmail(user.email);
    const hasPassword = bcrypt.hashSync(user.password, saltRounds);
    const create = this.userRepository.create({
      ...user,
      password: hasPassword,
    });
    const save = await this.userRepository.save(create);
    this.logger.log('user is registered', save);
    return save;
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

  // find user by id
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
