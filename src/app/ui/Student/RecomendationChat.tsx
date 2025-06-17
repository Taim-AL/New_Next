import Image from "next/image";
import logo from "@/app/ui/Assets/Css/happy face bot.png";
import "@/app/ui/Assets/Css/student/Recomendation.css"
import InnerChatRecomendation from "./RecomendationInnerChat";

export default function RecomendationSystem(){
    return(
        <>
            <div className="outer_container_recomendation">
                <div className="inner_container_recomendation shadow">
                    <InnerChatRecomendation/>
                </div>
            </div>
            <div className="chatbot-logo-container ">
                {/* <Image src={logo1} alt="sleep bot" className="chatbot-logo1 shadow"/> */}
                <Image src={logo} alt="happy bot" className="chatbot-logo1 shadow"/>
            </div>
        </>
    )
}