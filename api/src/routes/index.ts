import express from 'express';
const api = express.Router();

import authController from "../controllers/authController";
import auctionController from '../controllers/auctionController';
import authMiddleware from '../middlewares/authMiddleware';

api.post('/auth/sign-up', authController.register);
api.post('/auth/login', authController.login);
api.get('/auth/profile', authController.getProfile);

api.get('/auctions', auctionController.getActiveAuctions);
api.get('/auctions/:id', auctionController.getAuctionById);
api.post('/auctions', authMiddleware, auctionController.createAuction);
api.put('/auctions/:id', authMiddleware, auctionController.updateAuction);
api.delete('/auctions/:id', authMiddleware, auctionController.deleteAuction);

export default api;