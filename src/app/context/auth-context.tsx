"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "../lib/definitions";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  

  let token = null , id = null , role = null , image =null,points=null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    id = localStorage.getItem('id');
    role = localStorage.getItem('role');
    image = localStorage.getItem('image');
    points = localStorage.getItem('points');
  }
  const [user, setUser] = useState<User | null>({
    id:Number(id),
    fullName:null,
    userName:null,
    token:token,
    email:null,
    role:null,
    points : null ,
  });
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("points");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ points,user, setUser, logout , token , role , id , image }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
