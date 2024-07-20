import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
  

  const Dashboard = async () => {
    return (
      <main className="flex justify-center items-center h-screen">
        <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
          Dashboard
          </CardContent>
        </Card>
      </main>
    );
  };
  export default Dashboard;
  