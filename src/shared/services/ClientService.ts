import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { circularJSON } from '../circularJSON';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(private readonly httpService: HttpService) {}

  // create cart by userId
  async createCart(userId: string) {
    try {
      this.logger.log(`Getting cart for ${userId}`);
      const response = await firstValueFrom(
        this.httpService
          .post(`http://localhost:4002/carts/create-carts`, {
            userId,
          })
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response);
              // Custom error handling
              throw error;
            }),
          ),
      );
      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Cart service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get products by ids
  async getProducts(ids: string): Promise<string> {
    try {
      this.logger.log(`Getting products for ${ids}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/products/multiple-products?ids=${encodeURIComponent(ids)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response);
              // Custom error handling
              throw error;
            }),
          ),
      );

      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Product service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get products by id
  async getProductById(id: number): Promise<string> {
    try {
      this.logger.log(`Getting product for ${id}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/products/product/${encodeURIComponent(id)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response);
              // Custom error handling
              throw error;
            }),
          ),
      );
      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Product service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get profile by id
  async getProfileById(id: number | string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:4000/profile/${id}`),
      );
      this.logger.log(`[Profile service]: ${JSON.stringify(response)}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error making HTTP request:', error);
      throw error;
    }
  }

  // get authorization
  getBearerToken(authHeader: string): string {
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return 'No bearer token found';
  }
}
