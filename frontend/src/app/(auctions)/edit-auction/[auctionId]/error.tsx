"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-full sm:w-1/2 md:w-1/2 lg:w-2/4">
        <CardHeader>
          <CardTitle>Edit Auction</CardTitle>
          <CardDescription>
            Please edit the details of your Auction!
          </CardDescription>
        </CardHeader>
        <CardContent>{error.message}</CardContent>
      </Card>
    </main>
  );
}
