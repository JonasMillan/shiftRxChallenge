import { Request, Response } from "express";
import authService from "../services/authService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    const token = await authService.generateToken(user.id, user.tokenVersion);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req?.user?.userId ?? null;
  try {
    const user = await authService.getProfile(userId);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

export default {
  getProfile,
  register,
  login,
};
