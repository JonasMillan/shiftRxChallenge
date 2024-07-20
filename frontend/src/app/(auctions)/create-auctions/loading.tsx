import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  
  const loading = async () => {
    return (
      <main className="flex justify-center items-center h-screen">
        <Card className="w-full sm:w-1/2 md:w-1/2 lg:w-2/4">
          <CardHeader>
            <CardTitle>Create Auction</CardTitle>
            <CardDescription>
              Please add the details of your Auction!
            </CardDescription>
          </CardHeader>
          <CardContent>
            ...loading
          </CardContent>
        </Card>
      </main>
    );
  };
  
  export default loading;
  