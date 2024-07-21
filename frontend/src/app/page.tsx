import Auction from "@/components/ui/Auction";
import { AuctionType } from "./commons/types";

async function getData() {
  const response = await fetch("http://api:4200/api/auctions", { cache: 'no-store' });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function Home() {
  const { auctions }: { auctions: AuctionType[] } = await getData();

  return (
    <main className="flex flex-col items-center justify-between ">
      <h1 className="text-xl">Welcome ShiftRx Challenge</h1>

      <div className="flex flex-wrap p-2 justify-evenly">
        {auctions.length &&
          auctions.map(
            ({
              id,
              title,
              description,
              startingPrice,
              endTime,
              seller,
            }: AuctionType) => (
              <Auction
                id={id}
                key={id}
                title={title}
                description={description}
                startingPrice={startingPrice}
                endTime={endTime}
                seller={seller}
              />
            )
          )}
      </div>
    </main>
  );
}
