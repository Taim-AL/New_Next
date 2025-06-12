import "@/app/ui/Assets/Css/Main/Waves.css"
import Link from "next/link"
import { Col, Row } from "react-bootstrap"
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import Support from "./Support";

export default function Footer(){
    return(
        <>
            <Row className="mx-0 outer-footer">
                <Col md="4" lg="4" xs='6' className="footer-part">
                    <p className="title-footer"><span className="span-footer">©</span>Campess.com</p>
                </Col> 
                <Col md="4" lg="4" xs='6' className="footer-part">
                    
                </Col>
                <Col md="4" lg="4" xs='12' className="footer-part">
                    <Link href="/" className="center-footer-link">
                        <XIcon/>
                    </Link>
                    <Link href="/" className="center-footer-link">
                        <WhatsAppIcon/>
                    </Link>
                    <Link href="/" className="center-footer-link">
                        <InstagramIcon/>
                    </Link>
                </Col>
            </Row>
        </>
    )
}