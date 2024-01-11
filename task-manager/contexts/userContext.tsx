"use client";
import { ChildrenProps, IUser, UserContextProps } from "@/types";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext<UserContextProps>({
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    photoUrl: "",
    fileKey: '',
  },
  loading: false,
  setUser: () => null,
  setLoading: () => null,
});

export const UserProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);

  const value: UserContextProps = { user, loading, setUser, setLoading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
