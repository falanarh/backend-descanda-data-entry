import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (namaLengkap: string, email: string, password: string, peran: string, isSendEmail: boolean) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ namaLengkap, email, password: hashedPassword, peran, isSendEmail });
  await newUser.save();
  return newUser;
};

const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email tidak ditemukan');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password salah');
  }

  const token = jwt.sign(
    { namaLengkap: user.namaLengkap, email: user.email, peran: user.peran },
    process.env.JWT_SECRET!,
    { expiresIn: '6h' }
  );

  return token;
};

export default {
  registerUser,
  authenticateUser,
};
