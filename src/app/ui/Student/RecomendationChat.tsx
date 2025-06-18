import Image from "next/image";
import logo from "@/app/ui/Assets/Css/happy face bot.png";
import "@/app/ui/Assets/Css/student/Recomendation.css"
import InnerChatRecomendation from "./RecomendationInnerChat";
import "@/app/ui/Assets/Css/Main/ChatBot.css"
import { Col, Row } from "react-bootstrap";

export default function RecomendationSystem(){
    return(
        <>
            

            <Row className="mx-0" >
                <Col lg="6" md="12">
                    <div className="outer_container_recomendation">
                <div className="inner_container_recomendation shadow">
                    <InnerChatRecomendation/>
                </div>
            </div>
                </Col>
                <Col lg="6" md="12">
                    <div className="chatbot_info_outer">
                        <div className="chatbot_info_inner mt-md-5">
                            <h3 className="dec_info_title2 ">
                                🎓 Your AI Learning Companion Is Here
                            </h3>
                            <p className="dec_info_p">
                                Looking for your next step? Ask your personal AI advisor for expert course suggestions based on your goals, interests, and skills. <br />
                                Start chatting now — and let GenScan guide your path to professional success.
                            </p>
                        </div>

                    </div>
                </Col>
                
            </Row>
            <div className="chatbot-logo-container ">
                {/* <Image src={logo1} alt="sleep bot" className="chatbot-logo1 shadow"/> */}
                <Image src={logo} alt="happy bot" className="chatbot-logo1 shadow"/>
            </div>
        </>
    )
}