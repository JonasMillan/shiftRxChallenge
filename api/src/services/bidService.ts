import { Auction, Bid } from "@prisma/client";
import { BidsWithUser } from "../commons/types";
import PrismaSingleton from "../singletons/prismaSingleton";

const prisma = PrismaSingleton.getInstance();

const placeBid = async (
  auctionId: number,
  userId: number,
  amount: number
) => {
  if (amount <= 0) {
    throw new Error("Bid amount must be greater than 0.");
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const auction = await tx.auction.findUniqueOrThrow({
        where: { id: auctionId },
        include: { bids: true },
      });

      if (!auction) {
        throw new Error("The Auction doesn't not exist.");
      }

      if (auction.endTime < new Date()) {
        throw new Error("The Auction has ended.");
      }

      if (auction.sellerId === userId) {
        throw new Error("You can't bid on your own Auction.");
      }

      if (auction.currentPrice >= amount) {
        throw new Error("Your bid is lower than the minimum amount.");
      }

      await tx.bid.create({
        data: {
          amount,
          auction: { connect: { id: auctionId } },
          user: { connect: { id: userId } },
        },
      });

      // Update the auction's currentPrice
      const updatedAuction = await tx.auction.update({
        where: { id: auctionId },
        data: { currentPrice: amount },
        select: {
          id: true,
          title: true,
          description: true,
          startingPrice: true,
          currentPrice: true,
          endTime: true,
          seller: {
            select: {
              name: true,
              id: true,
              email: true,
            },
          },
        },
      });

      // Fetch updated bids
      const bids = await tx.bid.findMany({
        where: { auctionId },
        select: {
          id: true,
          amount: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { bids, auction: updatedAuction };
    });
  } catch (error) {
    throw error;
  }
};

const getBidsForAuction = async (
  auctionId: number
): Promise<BidsWithUser[]> => {
  try {
    const bids = await prisma.bid.findMany({
      where: { auctionId },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return bids;
  } catch (error) {
    throw new Error("Internal getting bids.");
  }
};

export default {
  getBidsForAuction,
  placeBid,
};
