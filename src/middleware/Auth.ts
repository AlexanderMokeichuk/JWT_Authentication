import { NextFunction, Response } from 'express';
import { IDecodedJwt, IRequestWithUser } from '../types';
import prisma from '../config/database';
import jwt from 'jsonwebtoken';

const Auth = async (req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  const tokenData = req.get('Authorization');

  if (!tokenData) {
    return void res.status(401).send({ error: 'No token provided' });
  }

  const [, token] = tokenData.split(' ');

  let decoded: IDecodedJwt;
  try {
    decoded = jwt.verify(token, `${process.env.JWT_ACCESS}`) as IDecodedJwt;
  } catch (e) {
    console.log(e);
    return void res.status(401).send({ error: 'Unauthorized' });
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

export { Auth };
