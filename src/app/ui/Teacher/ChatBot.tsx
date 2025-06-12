import Image from "next/image";
import logo from "@/app/ui/Assets/Css/happy face bot.png";
import logo1 from "@/app/ui/Assets/Css/sleep face bot.png";
import "@/app/ui/Assets/Css/Main/ChatBot.css"
import Chat from "../Main/Chat";
import { useEffect, useState } from "react";
import Axios from "@/app/lib/axios";
import InnerChat from "./InnerChat";

export default function ChatBot({video_id}:{video_id:string}){
        const [session , setSession] = useState<string>("")
    useEffect(()=>{
                try{
                    Axios.post(`/student/create-session`,{video_id:video_id}).then(response =>{
                      console.log("create-session :",response)
                      localStorage.setItem('session' , response.data.data);
                      setSession(response.data.data)
                  })}catch(error){
                    console.log(error)
                  }
            },[])
    
    return(
        <>
            <div className="chatbot-logo-container ">
                {/* <Image src={logo1} alt="sleep bot" className="chatbot-logo1 shadow"/> */}
                <Image src={logo} alt="happy bot" className="chatbot-logo1 shadow"/>
            </div>
            <div className="outer-container-chatbot">
                <div className="inner-container-chatbot shadow">
                    <InnerChat session={session}/>
                </div>
            </div>
            
        </>
    )
}