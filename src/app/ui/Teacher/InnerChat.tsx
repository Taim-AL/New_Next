import { useAuth } from "@/app/context/auth-context";
import Axios from "@/app/lib/axios";
import { ChatBotMessages } from "@/app/lib/definitions";
import "@/app/ui/Assets/Css/Main/ChatBot.css"
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function InnerChat({session} :{session : string}){
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [messages , setMessages] = useState<ChatBotMessages[]>([{message:"Hi User , How I can Help" , owner:0}])
    const [message , setMessage] = useState<string>("")
    const [isPending , setIsPending] =useState<boolean | null> (false);
    // const {session} = useAuth();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleSendMessageToAi =async (event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      setIsPending(true)
    try{
    const response = await Axios.post(`student/send-message `,{session_id:session , message: message , user_language :"ar"})
            console.log("my session :", session)
            console.log( "Message Ai :",response)
            setIsPending(false)
            
  
        }catch(e : any){
          console.log(e)
          setIsPending(false)
        }
      }

    return(
        <>
            <div className="chat-box">
                <div className="messages">
                    {messages.map((e,i)=>{
                        return(
                    <div className={e.owner === 0 ?"message bot" : "message user"} key={i}>{e.message}</div>
                        )
                    })}
                    

                </div>
                <div className="input-area">
                    <input 
                        placeholder="Your quistion here..." 
                        className='input-search'
                        onChange={(e)=>{setMessage(e.target.value)}}
                    />
                    <button  className="send_chat_button" title="send" onClick={handleSendMessageToAi}>
                        <SendIcon className="send-icon" />
                    </button>  
                </div>
            </div>
        </>
    )
}