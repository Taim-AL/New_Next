import "@/app/ui/Assets/Css/Main/ChatBot.css"
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";

export default function Chat(){
    return(
        <>
            <div className="chat-box">
                <div className="messages">
                    <div className="message bot">Hi User , How I can Help</div>
                    <div className="message user">pleas help me in math , and english  </div>
                    <div className="message bot">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ipsum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate doloribus nihil sit similique quo velit, officiis nulla asperiores est.</div>
                    <div className="message user">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum iusto nihil possimus iste distinctio nesciunt, aspernatur, laboriosam, veniam porro earum dignissimos adipisci dolorem! Fugit beatae adipisci nemo reiciendis, ipsam architecto?</div>
                    <div className="message bot">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, minima.</div>
                </div>
                <div className="input-area">
                    <input 
                        placeholder="Your quistion here..." 
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