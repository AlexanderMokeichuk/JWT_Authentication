import { Exclude, Expose } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  role: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(
    id: number,
    email: string,
    name: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    password: string,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.password = password;
  }
}
