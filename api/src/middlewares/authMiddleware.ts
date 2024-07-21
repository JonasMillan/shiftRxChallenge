import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type userDecoded = {
    userId: number;
    tokenVersion: number
}
export interface AuthenticatedRequest extends Request {
  user?: userDecoded;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return next(new Error('Access Denied: No token provided'));
  }

  const secret: string | undefined = process.env.JWT_SECRET;
  if (!secret) {
    return next(new Error('Internal Server Error: JWT secret is missing'));
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret) as userDecoded;
    req.user = decoded;
    next();
  } catch (err) {
    next(new Error('Unauthorized: Invalid token'));
  }
};

export default authMiddleware;
