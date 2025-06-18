import { useAuth } from "@/app/context/auth-context";
import Axios from "@/app/lib/axios";
import { ChatBotMessages, RecomendationMessages } from "@/app/lib/definitions";
import "@/app/ui/Assets/Css/Main/ChatBot.css"
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import IntegrationNotistack from "../Alert";
import { Skeleton, Stack } from "@mui/material";

export default function InnerChatRecomendation(){
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [messages , setMessages] = useState<RecomendationMessages[]>([{message:"Hello and welcome. I am an intelligent course recommendation system designed to help you find educational programs that align with your interests and the skills you aim to develop." , owner:0 ,courses :null} , {message:"How I can Help :)" , owner:0 ,courses :null}])
    const [message , setMessage] = useState<string>("")
    const [message2 , setMessage2] = useState<string>("")
    const [isPending , setIsPending] =useState<boolean | null> (false);
    const [error , setError] =useState<string>("");
    
    // const {session} = useAuth();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleSendMessageToRecomendation =async (event: React.FormEvent)=>{
      event.preventDefault();
      setMessages(prevMessages => [
        ...prevMessages,
        { message: message, owner: 1 ,courses:null}
        ]);
      setIsPending(true)
    try{
    setMessage("")
    const response = await Axios.post(`student/send-recomendation `,{ interest: message2})
            setMessage2("")
            console.log( "Message Ai :",response)
            if(response.data.success === true){
            setIsPending(false)
            if(response.data.data.length >0){
                setMessages(prevMessages => [
                ...prevMessages,
                { message: "Here are some courses you might be interested in", owner: 0  , courses:response.data.data }
            ]);
            }else{
                setMessages(prevMessages => [
            ...prevMessages,
            { message: "There are no matching courses right now, but more are coming soon!", owner: 0  , courses:null}
            ]);
            }
            
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
            <div className="chat-box">
                <div className="messages">
                    {messages.map((e,i)=>{
                        return(
                    <div className={e.owner === 0 ?"message bot" : "message user"} key={i}>{e.message}
                        <div className="Recomended_course_container">
                            {e.owner === 0 ?
                            e.courses?.map((e,i)=>{
                                return(
                                    <Link className="Recomended_course" href={`student/course/${e.id}`} key={i}>
                                        <div  >{e.name}</div>
                                    </Link>
                                )                            
                            })
                            
                            :""}
                        </div>
                    </div>
                        )
                    })}
                    {isPending ?<div className={"message bot"} >
                        <Stack spacing={1} className="shadow p-2 h-100">
                            <Skeleton variant="text" width={300} sx={{ fontSize: '1rem' , bgcolor: '#f2f6fd'}} />
                            <Skeleton variant="text" width={300} sx={{ fontSize: '1rem' , bgcolor: '#f2f6fd' }} />
                            <Skeleton variant="text" width={300} sx={{ fontSize: '1rem' , bgcolor: '#f2f6fd' }} />
                            <Skeleton variant="text" width={300} sx={{ fontSize: '1rem' , bgcolor: '#f2f6fd' }} />
                        </Stack>
                    </div> :""}

                </div>
                <form  onSubmit={handleSendMessageToRecomendation}>
                    <div className="input-area">
                        <input 
                            value={message}
                            placeholder="Your interest ...." 
                            className='input-search'
                            onChange={(e)=>{setMessage(e.target.value) ; setMessage2(e.target.value)}}
                        />
                        <button  className="send_chat_button" title="send" >
                            <SendIcon className="send-icon" />
                        </button>  
                    </div>
                </form>
            </div>
            {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
            
        </>
    )
}