import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'your_access_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key';

const JWT_ACCESS_EXPIRES_IN = '1h';
const JWT_REFRESH_EXPIRES_IN = '15d';

export const createAccessToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
};

export const createRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
};

export const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        return {
          error: 'TOKEN_EXPIRED',
          message: 'Access token has expired. Please refresh your token.',
        };
      }
      return { error: 'INVALID_ACCESS_TOKEN', message: 'Invalid access token.' };
    }

    return {
      error: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred during token validation.',
    };
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'INVALID_REFRESH_TOKEN',
        message: 'Refresh token is invalid or expired. Please log in again.',
      };
    }

    return {
      error: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred during refresh token validation.',
    };
  }
};
