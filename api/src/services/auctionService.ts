import { Auction, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type AuctionWithoutId = Omit<Auction, 'id'>;

const createAuction = async (
  { title, description, startingPrice, endTime }: { title: string; description: string; startingPrice: number; endTime: Date },
  userId: number | undefined
): Promise<Auction> => {

  if (!userId) {
    throw new Error("Error creating auction: User ID not provided."); 
  }

  const newAuctionData: AuctionWithoutId = {
    title,
    description,
    startingPrice,
    currentPrice: startingPrice,
    endTime,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: userId, 
  };

  try {
    const auction = await prisma.auction.create({
      data: newAuctionData,
    });

    return auction;
  } catch (error) {

    throw new Error('Internal server error creating auction');
  }
};

export default {
  createAuction,
};
