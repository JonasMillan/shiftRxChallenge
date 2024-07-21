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
    res.status(500).json({ message: "Error creating the Auction." });
  }
};

const getActiveAuctions = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.query.userId ? (Number(req.query.userId) as number) : null;
  try {
    const auctions = await auctionService.getActiveAuctions(userId);
    res.status(200).json({ auctions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving active Auctions." });
  }
};

const getAuctionById = async (req: AuthenticatedRequest, res: Response) => {
  const auctionId = Number(req.params.id);

  try {
    const auction = await auctionService.getAuctionById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found." });
    }
    res.status(200).json({ auction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAuction = async (req: AuthenticatedRequest, res: Response) => {
  const auctionId = Number(req.params.id);
  const userId = req?.user?.userId;
  const updatedAuctionData = req.body;

  try {
    const updatedAuction = await auctionService.updateAuction(
      auctionId,
      updatedAuctionData,
      userId
    );

    if (!updatedAuction) {
      return res.status(404).json({ message: "Auction not found." });
    }

    res.status(200).json({ updatedAuction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAuction = async (req: AuthenticatedRequest, res: Response) => {
  const auctionId = Number(req.params.id);
  const userId = req?.user?.userId;

  try {
    const deletedAuction = await auctionService.deleteAuction(
      auctionId,
      userId
    );

    if (!deletedAuction) {
      return res.status(404).json({ message: "Auction not found." });
    }

    res.status(200).json({ message: "Auction deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getActiveAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
  createAuction,
};
