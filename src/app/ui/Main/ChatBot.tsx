import Image from "next/image";
import logo from "@/app/ui/Assets/Css/happy face bot.png";
import logo1 from "@/app/ui/Assets/Css/sleep face bot.png";
import Chat from "./Chat";
import "@/app/ui/Assets/Css/Main/ChatBot.css"
import { Col, Row } from "react-bootstrap";

export default function ChatBot(){
    return(
        <>
            <Row className="mx-0">
                <Col lg="6" md="12">
                    <div className="outer-container-chatbot">
                        <div className="inner-container-chatbot shadow">
                            <Chat/>
                        </div>
                    </div>
                </Col>
                <Col lg="6" md="12">
                    <div className="chatbot_info_outer">
                        <div className="chatbot_info_inner mt-md-5">
                            <h3 className="dec_info_title2 ">
                                ✨ Get Personalized Course Recommendations Instantly
                            </h3>
                            <p className="dec_info_p">
                                Meet your AI learning advisor! Our smart chatbot is here to guide you toward the perfect courses and specializations tailored to your goals and skills. <br />
                                Log in to start your personalized journey — your future is just one message away.
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