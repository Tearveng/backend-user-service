import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CartRepsonse } from 'src/dto/CartDTO';
import { CartPayload } from 'src/model/Cart.interface';
import { circularJSON } from 'src/shared/circularJSON';
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

    if(newUser) {
      return this.clientService.createCart(`${encodeURIComponent(newUser.id)}`);
    }
  }

  async createCart(payload: CartPayload) {
    const carts = circularJSON.convertJsonStringToObject(
      await this.clientService.createCart(`${payload}`),
    ) as CartRepsonse;
    this.logger.log('Cart is created', carts);
    return true;
  }

  // update user
  async updateUser(id: number, user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }
}
