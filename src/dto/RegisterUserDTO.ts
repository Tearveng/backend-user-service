export interface RegisterUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  profile: string;
  publicId: string;
}

export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: string;
  publicId: string;
}
