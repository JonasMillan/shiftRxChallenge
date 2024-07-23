import { getUserData } from "@/app/server/auth";
import AuctionDetails from "./AuctionDetails";
import {
  AuctionResponseType,
  BidResponseType,
  User,
} from "@/app/commons/types";

async function getData(auctionId: number) {
  const [auctionResponse, bidsResponse, user] = await Promise.all([
    fetch(`http://api:4200/api/auctions/${auctionId}`, {
      next: { revalidate: 0 },
    }),
    fetch(`http://api:4200/api/auctions/${auctionId}/bids`, {
      next: { revalidate: 0 },
    }),
    getUserData(),
  ]);

  if (!auctionResponse.ok || !bidsResponse.ok) {
    throw new Error("Error Please try again another time!");
  }

  const { auction } = await auctionResponse.json();
  const bids = await bidsResponse.json();

  return { auction, bids, user } as {
    auction: AuctionResponseType;
    bids: BidResponseType[];
    user: User | null;
  };
}

const Auction = async ({ params }: { params: { auctionId: number } }) => {
  const { auctionId }: { auctionId: number } = params;
  const response = await getData(auctionId);

  const {
    auction,
    bids,
    user,
  }: {
    auction: AuctionResponseType;
    bids: BidResponseType[];
    user: User | null;
  } = response;

  return (
    <AuctionDetails
      auctionId={params.auctionId}
      user={user}
      auction={auction}
      bids={bids}
    />
  );
};

export default Auction;
