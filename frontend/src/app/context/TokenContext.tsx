"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  removeToken: () => void;
}

const TokenContext = createContext<TokenContextType>({
  token: null,
  setToken: () => {},
  removeToken: () => {}
});

export const TokenProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <TokenContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken most be use inside TokenProvider");
  }
  return context;
};
