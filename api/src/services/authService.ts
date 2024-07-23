import { Auction, Bid, PrismaClient, User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BidsWithUser } from '../commons/types';

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

const registerUser = async (userData: { name: string; email: string; password: string }): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: { ...userData, password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
      tokenVersion: true
    },
  });

  return user;
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

const getProfile = async (userId: number|null): Promise<{ auctions: Auction[], bids: BidsWithUser[] }> => {
  if (!userId){
    throw new Error('Invalid Credentials');
  }

  try {
    const auctions = await prisma.auction.findMany({
      where: { sellerId: userId }
    });

    const bids = await prisma.bid.findMany({
      where: { userId },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { auctions, bids };

  } catch (error) {
    throw error;
  }

}

export default {
  getProfile,
  generateToken,
  registerUser,
  loginUser,
};

