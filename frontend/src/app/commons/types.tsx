export type Seller = {
  name: string;
};

export type AuctionType = {
  id: number;
  title: string;
  description: string;
  startingPrice: number;
  endTime: string;
  seller: Seller;
};

export type EditAuctionType = {
  title: string;
  description: string;
};

export type AuctionResponseType = {
  id: number;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  createdAt: string;
  updatedAt: string
  endTime: string;
  sellerId: Seller;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
