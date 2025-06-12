"use client"

import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavbarSt from "@/app/ui/Student/NavbarStudent";
import ChatBot from "@/app/ui/Teacher/ChatBot";
import Wave from "react-wavify";
import Footer2 from "@/app/ui/Main/Footer2";

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
    <>
      <NavbarSt/> 
      <div>{children}</div>
      {/* <ChatBot/> */}
      <div>
          <Wave  fill={'rgb(136,138,255)'} paused={false} options={{height:70 , amplitude:50 , speed:0.15 , points:4,}}/>          
          <Wave fill={'rgba(136, 138, 255, 0.673)'} paused={false} options={{height:70 , amplitude:35 , speed:0.20 , points:4,}} className='wave-1'/>
          <Wave fill={'rgba(136, 138, 255, 0.500)'} paused={false} options={{height:70 , amplitude:40 , speed:0.25 , points:4,}} className='wave-1'/>
      </div>
      <Footer2/>
    </>
  );
}
