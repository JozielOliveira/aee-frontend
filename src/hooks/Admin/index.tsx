import React, { useContext, useState, useEffect } from "react";
import { AuthType, UserType } from "services";

export interface AdminProps {
  isAdmin: boolean;
  logged: boolean;
  user?: UserType;
  setUser: (user: AuthType) => Promise<any>;
  removeUser: () => Promise<any>;
}

const AdminContext = React.createContext<AdminProps>({
  isAdmin: false,
  logged: false,
  setUser: async () => new Promise(() => true),
  removeUser: async () => new Promise(() => true),
})

export const getToken = async () => await localStorage.getItem('token')
export const getUser = async () => {
  const user = await localStorage.getItem('user') || '{}'

  if (user)
    return JSON.parse(user)
  return false
}

export const AdminProvider: React.FC = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>()
  const [logged, setLogged] = useState<boolean>()
  const [user, setU] = useState<UserType>()

  const initial = async () => {
    const token = await getToken();
    const user = await getUser();

    if (user?.role?.name === "Authenticated")
      setIsAdmin(true)
    else
      setIsAdmin(false)

    setU(user)
    setLogged(!!token)
  }

  useEffect(() => {
    initial()
  }, [])

  const setUser = async (user: AuthType) => {
    setLogged(true)
    if (user.user.role.name === "Authenticated")
      setIsAdmin(true)
    else
      setIsAdmin(false)

    setU(user.user)
    await localStorage.setItem('user', JSON.stringify(user.user));
    await localStorage.setItem('token', user.jwt);
  }

  const removeUser = async () => {
    setLogged(false)
    setIsAdmin(false)
    await localStorage.removeItem('user');
    await localStorage.removeItem('token');
  }

  if (logged === undefined || isAdmin === undefined) return null;

  return (
    <AdminContext.Provider value={{ user, setUser, removeUser, isAdmin, logged }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext<AdminProps>(AdminContext);

  return context;
};
