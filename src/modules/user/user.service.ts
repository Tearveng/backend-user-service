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
import { UpdateUserDTO } from '../../dto/RegisterUserDTO';
import { UsersEntity } from '../../entities/Users';

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

  // search user
  async searchUsers(name: string, page = 1, limit = 10) {
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .where('user.firstName like :firstName', { firstName: `%${name}%` })
      .orWhere('user.phone like :phone', { phone: `%${name}%` })
      // .orWhere('product.skuCode like :skuCode', { skuCode: `%${name}%` })
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();
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
      this.logger.error(`User not found with this id: "${id}"`);
      throw new NotFoundException(`user not found with this id: ${id}`);
    }
    this.logger.log(`[User]: ${JSON.stringify(user, null, 2)}`);
    return user;
  }

  // find all users pagination
  async paginateUsers(page = 1, limit = 10, role: string = 'ALL') {
    let cpUsers = [];
    let cpTotal = 0;
    if (role === 'ALL' || ['USER', "ADMIN", "CLIENT"].indexOf(role) < 0) {
      const [users, total] = await this.userRepository.findAndCount({
        order: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      cpUsers = users;
      cpTotal = total;
    } else {
      const [users, total] = await this.userRepository
        .createQueryBuilder('user')
        .where('JSON_CONTAINS(user.roles, :roles)', { roles: `[\"${role}\"]` })
        .orderBy('user.createdAt', 'DESC') // Order by createdAt in descending order
        .skip((page - 1) * limit) // Pagination - skipping the number of results based on page number
        .take(limit) // Pagination - limiting the results to `limit`
        .getManyAndCount();
      cpUsers = users;
      cpTotal = total;
    }

    return {
      data: cpUsers,
      meta: {
        totalItems: cpTotal,
        itemCount: cpUsers.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(cpTotal / limit),
        currentPage: page,
      },
    };
  }

  // search product
  async searchUser(
    key: keyof UsersEntity,
    value: string,
    page = 1,
    limit = 10,
  ) {
    const [products, total] = await this.userRepository
      .createQueryBuilder('user')
      .where(`user.${key} like :${key}`, { [key]: `%${value}%` })
      // .orWhere('product.lastName like :name', { lastName: `%${name}%` })
      // .orWhere('product.skuCode like :name', { skuCode: `%${name}%` })
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();
    return {
      data: products,
      meta: {
        totalItems: total,
        itemCount: products.length,
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

  // logout user
  async logout(): Promise<boolean> {
    return true;
  }
}
