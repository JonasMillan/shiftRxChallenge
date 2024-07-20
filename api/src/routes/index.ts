import express from 'express';
const api = express.Router();

import authController from "../controllers/authController";
import auctionController from '../controllers/auctionController';
import authMiddleware from '../middlewares/authMiddleware';

api.post('/auth/sign-up', authController.register);
api.post('/auth/login', authController.login);
api.get('/auth/profile', authController.getProfile);

api.post('/auctions', authMiddleware, auctionController.createAuction);

export default api;