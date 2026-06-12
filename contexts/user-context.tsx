"use client";

import { User } from "@/interfaces/user";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoading: boolean;
}

interface UserProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser ?? null);

  const isLoading = false;

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: updateUser, clearUser, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}
