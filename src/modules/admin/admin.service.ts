import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CartPayload } from 'src/model/Cart.interface';
import { ClientService } from 'src/shared/services/ClientService';
import { RegisterUserDTO, UpdateUserDTO } from '../../dto/RegisterUserDTO';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
  ) {}

  // register user
  async registerUser(user: RegisterUserDTO) {
    const newUser = await this.usersService.createUser({
      ...user,
      roles: ['ADMIN'],
    });
    if (newUser) {
      const cart = await this.createCart({ userId: newUser.id });
      if (cart) {
        return newUser;
      }
    }
    throw new BadRequestException(
      'Unable to create the user or the cart; the creation failed.',
    );
  }

  async createCart(payload: CartPayload) {
    await this.clientService.createCart(`${payload.userId}`);
    this.logger.log('Cart is created');
    return true;
  }

  // update user
  async updateUser(id: number, user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }
}
