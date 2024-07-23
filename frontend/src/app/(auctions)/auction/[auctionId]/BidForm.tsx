"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { placeBit } from "@/app/server/actions";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  amount: z.number(),
});

export const BidForm = ({
  auctionId,
  currentPrice,
}: {
  auctionId: number;
  currentPrice: number;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: currentPrice + 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const auctionResponse = await placeBit(data, auctionId);
    if (auctionResponse.success) {
      toast({
        title: "You submitted a Bid!!!",
      });
    } else {
      toast({
        title: auctionResponse.errorMessage,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Make a Bid!</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Place a Bid</SheetTitle>
          <SheetDescription>
            Add Amount to your Bid. Click Submit when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bid Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : 0
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <SheetClose asChild>
                <Button className="my-4" type="submit">
                  Submit
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
