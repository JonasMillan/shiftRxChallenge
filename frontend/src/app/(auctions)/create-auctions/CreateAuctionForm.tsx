"use client";
import { memo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/DatePicker";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startingPrice: z.number({
    required_error: "Starting Price is required",
    invalid_type_error: "Starting Price must be a number",
  }),
  endTime: z.date({
    required_error: "End Time Price is required",
    invalid_type_error: "End Time Price must be a number",
  }),
});

const CreateAuctionForm = () => {
  const router = useRouter();
  const { userData } = useUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      startingPrice: 1,
      endTime: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response: Response = await fetch(
      "http://localhost:4200/api/auctions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
        body: JSON.stringify({ ...data }),
      }
    );

    console.log("🚀 ~ onSubmit ~ response:", response);
    if (response.ok) {
      toast({
        title: "You submitted a Auction!!!",
      });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "something went wrong.");
    }

    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" type="textarea" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ending Auction</FormLabel>
              <FormControl>
                <>
                  <br />
                  <DatePicker
                    date={field.value}
                    setDate={(date: Date | undefined) => field.onChange(date)}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="my-3">
          Add Auction!
        </Button>
      </form>
    </Form>
  );
};

export default memo(CreateAuctionForm);
