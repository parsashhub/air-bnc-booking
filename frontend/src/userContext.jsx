import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { data } = useUsers();

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users/me").then((res) => res.data?.data),
    retry: 0,
    staleTime: 60 * 1000 * 60, // 1 hour
  });
