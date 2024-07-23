import { Request, Response } from 'express';
import bidService from '../services/bidService';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

const placeBid = async (req: AuthenticatedRequest, res: Response) => {
  const auctionId = Number(req.params.id);
  const userId = Number(req?.user?.userId);
  const amount = Number(req.body.amount);

  try {
    await bidService.placeBid(auctionId, userId, amount);
    res.sendStatus(201); 
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  }
}

const getBidsForAuction = async (req: Request, res: Response) => {
  const auctionId = Number(req.params.id);
  try {
    const bids = await bidService.getBidsForAuction(auctionId);
    res.json(bids);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default {
    getBidsForAuction,
    placeBid
};