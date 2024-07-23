import Auction from "@/components/ui/Auction";
import { AuctionType, BidResponseType } from "../commons/types";
import { getToken } from "../server/auth";
import { Bids } from "@/components/ui/Bids";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

async function getData() {
  const token = await getToken();
  const response = await fetch(`http://api:4200/api/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

const Dashboard = async () => {
  const {
    auctions,
    bids,
  }: { auctions: AuctionType[]; bids: BidResponseType[] } = await getData();

  return (
    <main className="flex flex-col items-center justify-between ">
      <Tabs defaultValue="auctions" className="w-full flex flex-col items-center justify-between ">
        <TabsList>
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
          <TabsTrigger value="bids">Bids</TabsTrigger>
        </TabsList>
        <TabsContent value="auctions" className="w-full flex flex-wrap justify-around">
        {!!auctions.length &&
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
                isEditable
              />
            )
          )}
        </TabsContent>
        <TabsContent value="bids" className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 p-2">
          {!!bids.length && <Bids bids={bids} />}
        </TabsContent>
      </Tabs>
    </main>
  );
};
export default Dashboard;
