import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import RegistrationForm from "./RegistrationForm";

const Register = async () => {

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardHeader>
          <CardTitle>Register User</CardTitle>
          <CardDescription>Please add your info!</CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationForm/>
        </CardContent>
      </Card>
    </main>
  );
};
export default Register;
