import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  email: string = '';

  @IsString()
  @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters.' })
  password: string = '';
}
