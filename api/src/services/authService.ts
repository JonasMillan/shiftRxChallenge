import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateToken = (userId: number, tokenVersion: number) => {
  const secret = process.env.JWT_SECRET;

//   return jwt.sign({ userId, tokenVersion }, secret, {
//     expiresIn: '5h',
//   });
return true
}

const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });
}

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid Credentials');
  }

  const token = await generateToken(user.id, user.tokenVersion);
  return { user, token };
}

export default {
  generateToken,
  registerUser,
  loginUser,
};

