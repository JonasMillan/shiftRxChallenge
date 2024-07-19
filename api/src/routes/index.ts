import express from 'express';
const api = express.Router();

import authController from "../controllers/authController";

api.post('/auth/sign-up', authController.register);
api.post('/auth/login', authController.login);
api.get('/auth/profile', authController.getProfile);

export default api ;