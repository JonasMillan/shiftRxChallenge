import {
  AuctionResponseType,
  BidResponseType,
  User,
} from "@/app/commons/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BidForm } from "./BidForm";
import { getUserData } from "@/app/server/auth";
import { Bids } from "@/components/ui/Bids";

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

  const { title, description, endTime, seller, currentPrice } = auction;

  return (
    <main className="flex flex-col items-center justify-between ">
      <Card className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-5">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
          <p>current price: {currentPrice}</p>
          <p>ending: {endTime}</p>
          <p>by: {seller?.name}</p>
        </CardContent>
        <CardFooter className="flex space-x-5">
          {user?.id !== seller.id && <BidForm auctionId={auctionId} />}
        </CardFooter>
      </Card>
      <div className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-5">
        {!!bids.length && <Bids bids={bids} />}
      </div>
    </main>
  );
};

export default Auction;
