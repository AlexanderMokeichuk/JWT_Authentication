import jwt from 'jsonwebtoken';

const JWT_ACCESS_EXPIRES_IN = '1h';
const JWT_REFRESH_EXPIRES_IN = '15d';

export const createAccessToken = (email: string) => {
  return jwt.sign({ user: email }, `${process.env.JWT_ACCESS}`, {
    expiresIn: `${JWT_ACCESS_EXPIRES_IN}`,
  });
};

export const createRefreshToken = (email: string) => {
  return jwt.sign({ user: email }, `${process.env.JWT_REFRESH}`, {
    expiresIn: `${JWT_REFRESH_EXPIRES_IN}`,
  });
};
