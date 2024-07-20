import { Response } from "express";
import auctionService from "../services/auctionService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

const createAuction = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req?.user?.userId;
        await auctionService.createAuction(req.body, userId);
        res.sendStatus(204);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating the Auction.' });
    }
}

export default { createAuction }