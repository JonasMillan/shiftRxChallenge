import express from 'express';

const api = express.Router();

import authController from "../controllers/authController";
import auctionController from '../controllers/auctionController';
import authMiddleware from '../middlewares/authMiddleware';
import bidController from '../controllers/bidController';

api.post('/auth/sign-up', authController.register);
api.post('/auth/login', authController.login);
api.get('/auth/profile',authMiddleware,  authController.getProfile);

api.get('/auctions', auctionController.getActiveAuctions);
api.get('/auctions/:id', auctionController.getAuctionById);
api.post('/auctions', authMiddleware, auctionController.createAuction);
api.put('/auctions/:id', authMiddleware, auctionController.updateAuction);
api.delete('/auctions/:id', authMiddleware, auctionController.deleteAuction);

api.post('/auctions/:id/bid', authMiddleware, bidController.placeBid);
api.get('/auctions/:id/bids', bidController.getBidsForAuction);

export default api;