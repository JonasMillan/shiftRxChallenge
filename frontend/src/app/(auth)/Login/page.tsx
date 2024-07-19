import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import LogInForm from "./LoginForm";

const Register = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <LogInForm />
        </CardContent>
      </Card>
    </main>
  );
};
export default Register;
