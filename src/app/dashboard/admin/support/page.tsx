"use client";

import Axios from "@/app/lib/axios";
import { useEffect, useState } from "react";
import "@/app/ui/Assets/Css/admin/Support.css"
import SupportContainer from "@/app/ui/Admin/SupportChat";
import { Avatar } from "@mui/material"
import { MessageSupportType, ProfileUrl } from "@/app/lib/definitions";


export default function SupportPage() {
    const [messages , setMessages]=useState<MessageSupportType[]>([])
  useEffect(()=>{
      try{
        Axios.get(`/admin/support/messages`).then(response =>{
          console.log("messages :",response)
          if(response.data.success){
            setMessages(response.data.status)
        }
      })}catch(error){
        console.log(error)
      }
    },[])

  return (
    <>
            <div className="outer-container-support mt-5">
                <div className="inner-container-support shadow">
                    <div className="support-box">
                        <div className="messages">

                            {messages.length>0 ? messages.map((e,i)=>{
                                return(
                                    <div className="d-flex" key={i}>
                                    <div >
                                        <Avatar  alt="Admin" src={e.sender_type === "App\\Models\\Student"?e.sender.image: ProfileUrl + e.sender.image} />
                                    </div>
                                        <div className="message bot">
                                            {e.message}   <span className="userName_support">  ---- "{e.sender.username}" ({e.sender_type === "App\\Models\\Student"?"Student":"Teacher"}) </span>
                                        </div>
                                    </div>
                                )
                            })
                        :
                        <div className="d-flex">
                            <div >
                                <Avatar alt="Admin" src={"http://localhost:3000/Admin.png"} />
                            </div>
                                <div className="message bot">
                                    Loading .....
                                </div>
                            </div>
                        
                        }

                            {/* <div className="d-flex">
                            <div >
                                <Avatar alt="Admin" src={image} />
                            </div>
                                <div className="message bot">
                                    pleas help me in math , and english   <span className="userName_support">  ---- "{userName}" ({Type}) </span>
                                </div>
                            </div> */}



                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
