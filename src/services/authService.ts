import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserLoginDTO, UserRegisterDTO } from '../dto';
import { createAccessToken, createRefreshToken } from '../utils';

const prisma = new PrismaClient();
const saltFactor = Number(process.env.SALT_WORK_FACTOR) || 10;

export const registerUser = async (dto: UserRegisterDTO) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(dto.password, saltFactor);

  const newUser = await prisma.user.create({
    data: {
      email: dto.email,
      password: hashedPassword,
    },
  });

  const accessToken = createAccessToken(newUser.email);
  const refreshToken = createRefreshToken(newUser.email);

  return { accessToken, refreshToken, newUser };
};

export const loginUser = async (dto: UserLoginDTO) => {
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

  const accessToken = createAccessToken(user.email);
  const refreshToken = createRefreshToken(user.email);

  return { accessToken, refreshToken, user };
};

export const refreshTokensUser = async (user: User) => {
  const accessToken = createAccessToken(user.email);
  const refreshToken = createRefreshToken(user.email);

  return { accessToken, refreshToken };
};
