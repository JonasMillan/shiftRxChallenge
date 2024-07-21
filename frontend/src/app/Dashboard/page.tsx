import Auction from "@/components/ui/Auction";
import { AuctionType } from "../commons/types";
import { getUserData } from "../server/auth";

  
  async function getData() {
    const userData = await getUserData();
    const response = await fetch(`http://api:4200/api/auctions?userId=${userData?.id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }

  const Dashboard = async () => {
    const { auctions }: { auctions: AuctionType[] } = await getData();

    return (
      <main className="flex flex-col items-center justify-between ">
      <h1 className="text-xl">Dashboard</h1>

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
                isEditable
              />
            )
          )}
      </div>
    </main>
    );
  };
  export default Dashboard;
  