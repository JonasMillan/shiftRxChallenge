import { BidResponseType } from "@/app/commons/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "./card";

export function Bids({ bids }: { bids: BidResponseType[] }) {

  return (
    <Card className="w-full">
        <Table className="w-full">
        <TableCaption>A list the recent Bids.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>username</TableHead>
            <TableHead>created Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {bids.map((bid: BidResponseType) => (
            <TableRow key={bid.id}>
                <TableCell className="font-medium">{bid.user?.name}</TableCell>
                <TableCell>{bid.createdAt}</TableCell>
                <TableCell className="text-right">{bid.amount}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </Card>
  );
}
