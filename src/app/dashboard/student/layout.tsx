"use client"

import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {user , token , role , id}  = useAuth();
      const router = useRouter();
    
      useEffect(() => {
        if (!id || Number(role)!== 2 || token === undefined ) {
          router.push("/login");
        }
        console.log(user);
      },[user]);
  return (
      <div>{children}</div>
  );
}
