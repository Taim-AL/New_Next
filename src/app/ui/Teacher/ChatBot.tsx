import Image from "next/image";
import logo from "@/app/ui/Assets/Css/happy face bot.png";
import logo1 from "@/app/ui/Assets/Css/sleep face bot.png";
import "@/app/ui/Assets/Css/Main/ChatBot.css"
import Chat from "../Main/Chat";
import { useEffect, useState } from "react";
import Axios from "@/app/lib/axios";
import InnerChat from "./InnerChat";
import styles from "./ChatBot.module.css";

export default function ChatBot({video_id}:{video_id:string}){
        const [session , setSession] = useState<string>("")
        const [open, setOpen] = useState(false);
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


{/* الزر الثابت */}
      <button
        className={styles.chatButton}
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* الـ sidebar */}
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>Smart Assistant</h3>
          <button className={styles.close_chat_button} onClick={() => setOpen(false)}>✖</button>
        </div>
        <div className={styles.chatContent}>
            <InnerChat session={session}/>
          {/* هنا يمكن وضع واجهة الشات الحقيقية */}
        </div>
      </div>



            {/* <div className="chatbot-logo-container ">
                <Image src={logo1} alt="sleep bot" className="chatbot-logo1 shadow"/>
            </div>
            <div className="outer-container-chatbot">
                <div className="inner-container-chatbot shadow">
                </div>
            </div> */}
            
        </>
    )
}