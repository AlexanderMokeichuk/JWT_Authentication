import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createAccessToken, createRefreshToken } from '../config';
import { LoginUserDTO, RegisterUserDTO } from '../dto';

const prisma = new PrismaClient();

export const registerUser = async (dto: RegisterUserDTO) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: dto.email,
      password: hashedPassword,
    },
  });

  const accessToken = createAccessToken(newUser.id);
  const refreshToken = createRefreshToken(newUser.id);

  return { accessToken, refreshToken, newUser };
};

export const loginUser = async (dto: LoginUserDTO) => {
  const user = await prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  return { accessToken, refreshToken, user };
};
