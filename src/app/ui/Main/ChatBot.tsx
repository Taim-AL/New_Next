import Image from "next/image";
import logo from "@/app/ui/Assets/Css/happy face bot.png";
import logo1 from "@/app/ui/Assets/Css/sleep face bot.png";
import Chat from "./Chat";
import "@/app/ui/Assets/Css/Main/ChatBot.css"

export default function ChatBot(){
    return(
        <>
            <div className="outer-container-chatbot">
                <div className="inner-container-chatbot shadow">
                    <Chat/>
                </div>
            </div>
            <div className="chatbot-logo-container ">
                {/* <Image src={logo1} alt="sleep bot" className="chatbot-logo1 shadow"/> */}
                <Image src={logo} alt="happy bot" className="chatbot-logo1 shadow"/>
            </div>
        </>
    )
}