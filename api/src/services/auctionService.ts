import { Auction, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type AuctionWithoutId = Omit<Auction, "id">;

const createAuction = async (
  {
    title,
    description,
    startingPrice,
    endTime,
  }: {
    title: string;
    description: string;
    startingPrice: number;
    endTime: Date;
  },
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
    throw new Error("Internal server error creating auction");
  }
};

const getActiveAuctions = async (userId?: number | null) => {
  const currentTime = new Date();

  const whereClause: { sellerId?: number; endTime: { gt: Date } } = {
    endTime: {
      gt: currentTime,
    },
  };

  if (userId) {
    whereClause.sellerId = userId;
  }

  return prisma.auction.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      startingPrice: true,
      endTime: true,
      seller: {
        select: {
          name: true,
        },
      },
    },
  });
};

const getAuctionById = async (auctionId: number) => {
  return await prisma.auction.findUnique({
    where: { id: auctionId },
  });
};

const updateAuction = async (
  auctionId: number,
  updatedAuctionData: Auction,
  userId?: number,
) => {
  const existingAuction = await prisma.auction.findUnique({
    where: { id: auctionId },
  });

  if (!existingAuction || existingAuction.sellerId !== userId) {
    return null;
  }

  return await prisma.auction.update({
    where: { id: auctionId },
    data: updatedAuctionData,
  });
};

const deleteAuction = async (auctionId: number, userId?: number | null) => {
  const existingAuction = await prisma.auction.findUnique({
    where: { id: auctionId },
  });

  if (!userId || !existingAuction || existingAuction.sellerId !== userId) {
    return null;
  }

  return await prisma.auction.delete({
    where: { id: auctionId },
  });
};

export default {
  deleteAuction,
  updateAuction,
  getAuctionById,
  createAuction,
  getActiveAuctions,
};
