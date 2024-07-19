import { PrismaClient, User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateToken = (userId: number, tokenVersion: number): string => {
    const secret = process.env.JWT_SECRET ?? null;
    if(!secret) {
      throw new Error("JWT_SECRET not found in environment variables");
    }
    
    return jwt.sign({ userId, tokenVersion }, secret, {
        expiresIn: '5h',
    });
}

const registerUser = async (userData: { name: string; email: string; password: string }): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });
}

const loginUser = async (email: string, password: string): Promise<{ user: User; token: string }> => {
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

  const token = generateToken(user.id, user.tokenVersion);
  return { user, token };
}

const getAuthenticatedUserProfile = async (token: string): Promise<User> => {
  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET not found in environment variables");
    }
    
    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export default {
  getAuthenticatedUserProfile,
  generateToken,
  registerUser,
  loginUser,
};

