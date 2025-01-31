import { JwtService } from '@nestjs/jwt';

export function decodeToken(jwtService: JwtService, token: string): any {
  try {
    return jwtService.decode(token);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function isTokenExpired(decodedToken: any): boolean {
  if (!decodedToken?.exp) {
    return true; // Token is invalid or missing expiration
  }
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decodedToken.exp < currentTime; // True if expired
}
