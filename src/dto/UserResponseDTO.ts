import { Exclude, Expose } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

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
    createdAt: Date,
    updatedAt: Date,
    password: string,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.password = password;
  }
}
