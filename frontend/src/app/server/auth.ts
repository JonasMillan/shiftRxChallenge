"use server";

import { cookies } from "next/headers";
import { User } from "../commons/types";

type UserData = {
  email: string;
  password: string;
};

type UserResponse = {
  user: User;
  token: string;
};

type UserRegistrationParams = {
  name: string;
  email: string;
  password: string;
};

const setUser = (userResponse: UserResponse) => {
  const cookieStore = cookies();
  cookieStore.set("authToken", userResponse.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "strict",
  });

  const userData = JSON.stringify({
    id: userResponse.user.id,
    name: userResponse.user.name,
    email: userResponse.user.email,
  });
  cookieStore.set("userData", userData, {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "strict",
  });

  return { success: true };
};

export async function login(data: UserData) {
  const response: Response = await fetch("http://api:4200/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });

  if (response.ok) {
    const userResponse = await response.json();

    return setUser(userResponse);
  } else {
    return { success: false };
  }
}

export async function getUserData() {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get("userData");
  const userDataJSON = userDataCookie?.value ?? null;
  if (!userDataJSON) {
    return null;
  }
  const userData: User = JSON.parse(userDataJSON);
  return userData;
}

export async function getToken() {
  const cookieStore = cookies();
  const tokenDataCookie = cookieStore.get("authToken");
  const token = tokenDataCookie?.value ?? null;
  if (!token) {
    return null;
  }
  return token;
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("authToken");
  cookieStore.delete("userData");
}

export async function register(params: UserRegistrationParams) {
  const response: Response = await fetch("http://api:4200/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params }),
  });

  if (response.ok) {
    const userResponse = await response.json();
    return setUser(userResponse);
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || "something went wrong.");
  }
}
