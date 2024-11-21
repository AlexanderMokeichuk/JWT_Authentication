import { Request, Response, RequestHandler } from 'express';
import { validate } from 'class-validator';
import { LoginUserDTO, RegisterUserDTO } from '../dto';
import { loginUser, registerUser } from '../services';

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const registerUserDTO = new RegisterUserDTO();
  registerUserDTO.email = req.body.email;
  registerUserDTO.password = req.body.password;

  const errors = await validate(registerUserDTO);
  if (errors.length > 0) {
    return void res.status(400).json({ errors });
  }

  try {
    const { accessToken, refreshToken, newUser } = await registerUser(registerUserDTO);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return void res.status(201).json({
      accessToken: accessToken,
      user: newUser,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return void res.status(400).json({ error: error.message });
    }
    return void res.status(400).json({ error: 'Unknown error occurred' });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const loginUserDTO = new LoginUserDTO();
  loginUserDTO.email = req.body.email;
  loginUserDTO.password = req.body.password;

  const errors = await validate(loginUserDTO);
  if (errors.length > 0) {
    return void res.status(400).json({ errors });
  }

  try {
    const { accessToken, refreshToken, user } = await loginUser(loginUserDTO);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return void res.status(200).json({
      accessToken,
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return void res.status(400).json({ error: error.message });
    }
    return void res.status(400).json({ error: 'Unknown error occurred' });
  }
};
