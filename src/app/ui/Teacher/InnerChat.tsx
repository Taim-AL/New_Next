import { useAuth } from "@/app/context/auth-context";
import Axios from "@/app/lib/axios";
import { ChatBotMessages } from "@/app/lib/definitions";
import "@/app/ui/Assets/Css/Main/ChatBot.css"
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import IntegrationNotistack from "../Alert";
import { Skeleton, Stack } from "@mui/material";

export default function InnerChat({session} :{session : string}){
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [messages , setMessages] = useState<ChatBotMessages[]>([{message:"Hi User , How I can Help" , owner:0}])
    const [message , setMessage] = useState<string>("")
    const [message2 , setMessage2] = useState<string>("")
    const [language , setLanguage] = useState<string>("en")
    const [isPending , setIsPending] =useState<boolean | null> (false);
    const [error , setError] =useState<string>("");
    
    // const {session} = useAuth();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleSendMessageToAi =async (event: React.FormEvent)=>{
      event.preventDefault();
      setMessages(prevMessages => [
        ...prevMessages,
        { message: message, owner: 1 }
        ]);
      setIsPending(true)
    try{
    setMessage("")
    const response = await Axios.post(`student/send-message `,{session_id:session , message: message2 , user_language :"ar"})
            setMessage2("")
            console.log("my session :", session)
            console.log( "Message Ai :",response)
            if(response.data.success === true){
            setIsPending(false)
            setMessages(prevMessages => [
            ...prevMessages,
            { message: response.data.data.response, owner: 0 }
            ]);
            }else{
                setError(response.data.message)
                setIsPending(false)
              }
        }catch(e : any){
          console.log(e)
          setIsPending(false)
        }
      }

    return(
        <>
            <div className="chat-box-student">
                <div className="messages_student">
                    {messages.map((e,i)=>{
                        return(
                    <div className={e.owner === 0 ?"message bot" : "message user"} key={i}>{e.message}</div>
                        )
                    })}
                    {isPending ?<div className={"message bot"} >
                        <Stack spacing={1} className="shadow p-2 h-100">
                            <Skeleton variant="text" width={150} sx={{ fontSize: '0.3rem' , bgcolor: '#f2f6fd'}} />
                            <Skeleton variant="text" width={150} sx={{ fontSize: '0.3rem' , bgcolor: '#f2f6fd' }} />
                            <Skeleton variant="text" width={150} sx={{ fontSize: '0.3rem' , bgcolor: '#f2f6fd' }} />
                            <Skeleton variant="text" width={150} sx={{ fontSize: '0.3rem' , bgcolor: '#f2f6fd' }} />
                        </Stack>
                    </div> :""}

                </div>
                <form  onSubmit={handleSendMessageToAi}>
                    <div className="input-area">
                            <input 
                            value={message}
                            placeholder="Your quistion here..." 
                            className='input-search'
                            onChange={(e)=>{setMessage(e.target.value) ; setMessage2(e.target.value)}}
                        />
                        <button  className="send_chat_button" title="send" >
                            <SendIcon className="send-icon" />
                        </button>  
                        
                    </div>
                </form>
                {/* <div className="language_form">
                <button className={language === "ar" ?"active_lang" :"not_active_lang"} onClick={()=>setLanguage("ar")} title="ar">ar</button>
                <button title="en" className={language === "en" ?"active_lang" :"not_active_lang"} onClick={()=>setLanguage("en")}>en</button>
                <button title="fr" className={language === "fr" ?"active_lang" :"not_active_lang"} onClick={()=>setLanguage("fr")}>fr</button>
                </div> */}
            </div>
            {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
            
        </>
    )
}