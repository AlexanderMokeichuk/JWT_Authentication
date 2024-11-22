import { Request } from 'express';
import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface IRequestWithUser extends Request {
  user?: User;
}

export interface IDecodedJwt extends JwtPayload {
  user?: string;
}
