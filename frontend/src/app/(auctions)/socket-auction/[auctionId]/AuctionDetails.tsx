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
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { BidForm } from "./BidForm";
import { Bids } from "@/components/ui/Bids";
import { toast } from "@/components/ui/use-toast";

function AuctionDetails({
  auctionId,
  token,
  user,
}: {
  auctionId: number;
  token: string;
  user: User;
}) {
  const [auction, setAuction] = useState<AuctionResponseType>();
  const [bids, setBids] = useState<BidResponseType[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:4200", {
      auth: {
        token,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("requestAuction", { auctionId });
    });

    socket.on("getAuction", (data) => {
      setAuction(data);
    });

    socket.on("getBids", (data) => {
      setBids(data);
    });

    socket.on("bidSuccess", (data) => {
      toast({
        title: data,
      });
    });

    socket.on("bidError", () => {
      toast({
        title: "Unexpected Error",
      });
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitBid = ({ amount }: { amount: number }, auctionId: number) => {
    if (socketRef.current) {
      socketRef.current.emit("placeBid", amount, auctionId);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between ">
      <Card className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-5">
        {auction?.title ? (
          <>
            <CardHeader>
              <CardTitle>{auction.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{auction.description}</p>
              <p>current price: {auction.currentPrice}</p>
              <p>ending: {auction.endTime}</p>
              <p>by: {auction.seller?.name}</p>
            </CardContent>
            <CardFooter className="flex space-x-5">
              {user?.id !== auction?.seller.id && (
                <BidForm auctionId={auctionId} placeBit={emitBid} />
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
        {!!bids.length && <Bids bids={bids} />}
      </div>
    </main>
  );
}

export default AuctionDetails;
