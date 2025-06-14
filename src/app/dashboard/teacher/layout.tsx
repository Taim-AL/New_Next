"use client"

import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/app/ui/Teacher/Navbar";
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
        if (!id || Number(role)!== 1 || token === undefined ) {
          router.push("/login");
        }
        console.log(user);
      },[user]);
  return (
    <>
      <div className="w-100 d-flex ">
        <Navbar />
      </div> 
      <div style={{marginBottom:"6.5rem"}}>{children}</div>
      {/* <ChatBot/> */}
      {/* <div className="position-absolute bottom-0 w-100"> */}
      <div>
            <Wave  fill={'#7aaddc'} paused={false} options={{height:70 , amplitude:50 , speed:0.15 , points:4,}}/>          
            <Wave fill={'#3a6a98'} paused={false} options={{height:70 , amplitude:35 , speed:0.20 , points:4,}} className='wave-1'/>
            <Wave fill={'#1F4E79'} paused={false} options={{height:70 , amplitude:40 , speed:0.25 , points:4,}} className='wave-1'/>
      </div>
      <Footer2/>
      {/* </div> */}
    </>
  );
}
