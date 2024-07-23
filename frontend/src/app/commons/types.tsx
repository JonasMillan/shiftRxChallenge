export type Seller = {
  id: number;
  name: string;
  email: string;
};

export type UserResponse = {
  user: User;
  token: string;
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
  updatedAt: string;
  endTime: string;
  seller: Seller;
};

export type BidResponseType = {
  id: number;
  auctionId: number;
  amount: number;
  createdAt: string;
  user: User
};

export type PostBid = {
  amount: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
