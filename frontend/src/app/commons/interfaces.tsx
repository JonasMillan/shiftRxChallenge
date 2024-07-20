import { User } from "../context/UserContext";

export interface UserResponse {
  user: User;
  token: string;
}
