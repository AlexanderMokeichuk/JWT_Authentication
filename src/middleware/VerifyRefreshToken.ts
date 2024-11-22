import { NextFunction, Response } from 'express';
import prisma from '../config/database';
import { IDecodedJwt, IRequestWithUser } from '../types';
import jwt from 'jsonwebtoken';

const VerifyRefreshToken = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return void res.status(401).send({ error: 'No refresh token provided' });
  }

  let decoded: IDecodedJwt;
  try {
    decoded = jwt.verify(refreshToken, `${process.env.JWT_REFRESH}`) as IDecodedJwt;
  } catch (e) {
    console.log(e);
    return void res.status(401).send({ error: 'Update refresh token' });
  }

  const user = await prisma.user.findUnique({
    where: { email: decoded.user },
  });

  if (!user) {
    return void res.status(403).send({ error: 'User not found' });
  }

  req.user = user;
  next();
};

export { VerifyRefreshToken };
