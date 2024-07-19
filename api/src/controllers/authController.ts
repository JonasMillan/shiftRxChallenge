import { Request, Response } from 'express';
import authService from '../services/authService';

const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    const token = await authService.generateToken(user.id, user.tokenVersion);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
}

const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const user = await authService.getAuthenticatedUserProfile(token);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message }); // Error 401 Unauthorized
  }
}

export default {
  getProfile,
  register,
  login,
};
