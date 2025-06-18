import "@/app/ui/Assets/Css/Main/ChatBot.css"
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";

export default function Chat(){
    return(
        <>
            <div className="chat-box">
                <div className="messages">
                    <div className="message bot">Hello and welcome. I am an intelligent course recommendation system designed to help you find educational programs that align with your interests and the skills you aim to develop.</div>
                    <div className="message bot">How I can Help :)</div>
                </div>
                <div className="input-area">
                    <input 
                        placeholder="Your interest ...." 
                        className='input-search'
                    />
                    <Link href={"/login"} className="send_chat_button" title="send">
                        <SendIcon className="send-icon"/>
                    </Link>  
                </div>
            </div>
        </>
    )
}