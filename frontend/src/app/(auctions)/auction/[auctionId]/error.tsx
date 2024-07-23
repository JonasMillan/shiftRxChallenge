"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-full sm:w-1/2 md:w-1/2 lg:w-2/4">
        <CardHeader>
          <CardTitle>Auction</CardTitle>
        </CardHeader>
        <CardContent>{error.message}</CardContent>
      </Card>
    </main>
  );
}
