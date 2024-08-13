import { Request, Response } from 'express';
import userService from '../services/userService';

const register = async (req: Request, res: Response) => {
  try {
    const { namaLengkap, email, password, peran, isSendEmail } = req.body;
    const newUser = await userService.registerUser(namaLengkap, email, password, peran, isSendEmail);
    res.status(201).json({
      statusCode: 201,
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userService.authenticateUser(email, password);
    res.status(200).json({
      statusCode: 200,
      message: 'Login successful',
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
};

export default {
  register,
  login,
};
