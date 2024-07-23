"use client";
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
import { memo, useEffect, useState } from "react";
import io from "socket.io-client";
import { Bids } from "@/components/ui/Bids";
import { BidForm } from "./BidForm";

function AuctionDetails({
  auctionId,
  user,
  auction,
  bids,
}: {
  auctionId: number;
  user: User | null;
  auction: AuctionResponseType;
  bids: BidResponseType[];
}) {
  const [_auction, setAuction] = useState<AuctionResponseType>(auction);
  const [_bids, setBids] = useState<BidResponseType[]>(bids);

  useEffect(() => {
    const socket = io("http://localhost:4200");

    socket.on(
      `auction-${auctionId}:new-bid`,
      ({
        bids,
        auction,
      }: {
        auction: AuctionResponseType;
        bids: BidResponseType[];
      }) => {
        setBids(bids);
        setAuction(auction);
      }
    );

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col items-center justify-between ">
      <Card className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-5">
        {_auction?.title ? (
          <>
            <CardHeader>
              <CardTitle>{_auction.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{_auction.description}</p>
              <p>current price: {_auction.currentPrice}</p>
              <p>ending: {_auction.endTime}</p>
              <p>by: {_auction.seller?.name}</p>
            </CardContent>
            <CardFooter className="flex space-x-5">
              {user?.id !== _auction?.seller.id && (
                <BidForm auctionId={auctionId} currentPrice={_auction.currentPrice}/>
              )}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <p>loading...</p>
              <p>current price: loading...</p>
              <p>ending: loading...</p>
              <p>by: loading...</p>
            </CardContent>
            <CardFooter className="flex space-x-5">loading...</CardFooter>
          </>
        )}
      </Card>
      <div className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-5">
        {!!_bids.length && <Bids bids={_bids} />}
      </div>
    </main>
  );
}

export default memo(AuctionDetails);
