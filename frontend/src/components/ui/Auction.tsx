"use client";
import { memo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./button";
import Link from "next/link";
import { deleteAuction } from "@/app/server/actions";
import { toast } from "./use-toast";

type Seller = {
  name: string;
};

type Auction = {
  id: number;
  title: string;
  description: string;
  startingPrice: number;
  endTime: string;
  seller: Seller;
  isEditable?: boolean;
};

const Auction = ({
  id,
  title,
  description,
  startingPrice,
  endTime,
  seller,
  isEditable,
}: Auction) => {
  const router = useRouter();

  const handleDeleteAuction = async (id: number) => {
    const deleteResponse = await deleteAuction(id);
    if (deleteResponse.success) {
      toast({
        title: "You deleted a Auction.",
      });
    } else {
      toast({
        title: deleteResponse.errorMessage,
      });
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/edit-auction/${id}`);
  };

  return (
    <Card className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <p>price: {startingPrice}</p>
        <p>ending: {endTime}</p>
        <p>by: {seller?.name}</p>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row md:space-x-5 flex-wrap md:flex-nowrap items-center justify-between md:justify-start">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto mb-4 md:mb-0">
          <Link href={`/auction/${id}`} legacyBehavior passHref>
            <Button className="w-full md:w-auto">Auction</Button>
          </Link>
        </div>

        {isEditable && (
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
            <Button
              variant="secondary"
              onClick={() => handleEdit(id)}
              className="w-full md:w-auto"
            >
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full md:w-auto">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your auction from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteAuction(id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default memo(Auction);
