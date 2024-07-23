import { getToken, getUserData } from "@/app/server/auth";
import AuctionDetails from "./AuctionDetails";

const Auction = async ({ params }: { params: { auctionId: number } }) => {
  const token = await getToken();
  const user = await getUserData();

  if (!token || !user) {
    throw new Error("");
  }
  return <AuctionDetails token={token} auctionId={params.auctionId} user={user}/>;
};

export default Auction;
