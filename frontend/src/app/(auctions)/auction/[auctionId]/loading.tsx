import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const loading = async () => {
  return (
    <main className="flex flex-col items-center justify-between ">
      <Card className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-5">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
          <p>current price: Loading...</p>
          <p>ending: Loading...</p>
          <p>by: Loading...</p>
        </CardContent>
        <CardFooter className="flex space-x-5">Loading...</CardFooter>
      </Card>
      <div className="w-full sm:w-2/2 md:w-2/3 lg:w-2/5 m-5">Loading...</div>
    </main>
  );
};

export default loading;
