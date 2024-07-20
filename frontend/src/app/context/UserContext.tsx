'use client';

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserData = {
  user: User;
  token: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  logout: () => {},
});

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userData, setUserData] = useLocalStorage("user", null);

  const logout = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside of UserProvider");
  }
  return context;
};
