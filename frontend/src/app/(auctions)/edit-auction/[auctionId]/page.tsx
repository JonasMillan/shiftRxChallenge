import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import EditAuctionForm from "./EditAuctionForm";
import { toast } from "@/components/ui/use-toast";
import { AuctionResponseType, AuctionType } from "@/app/commons/types";

async function getData(auctionId: number) {
  const response = await fetch(`http://api:4200/api/auctions/${auctionId}`, { next: { revalidate: 0 } });

  if (!response.ok) {
    toast({
      title: "Please try again.",
    });
  }
  return response.json();
}

const EditAuction = async ({ params }: {params: { auctionId: number }}) => {
  const { auctionId }: { auctionId: number } = params;
  const response = await getData(auctionId);

  const {auction}: {auction: AuctionResponseType} = response;
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-full sm:w-1/2 md:w-1/2 lg:w-2/4">
        <CardHeader>
          <CardTitle>Edit Auction</CardTitle>
          <CardDescription>
            Please edit the details of your Auction!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditAuctionForm
            title={auction.title}
            description={auction.description}
            auctionId={auctionId}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default EditAuction;
