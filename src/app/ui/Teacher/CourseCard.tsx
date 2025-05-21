import "@/app/ui/Assets/Css/teacher/Courses.css"
import Image, { StaticImageData } from "next/image"
import { Col, Row } from "react-bootstrap"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import { BaseUrl } from "@/app/lib/definitions";
export default function CourseCard( { type,src , alt,title,about ,href } :{type:number;src:StaticImageData ; alt : string ;title:string ;about:string ;href:string }){
    return(
        <>
        
        <div className="outer-card shadow">
            <Image className="course-image" width={100} height={15} src={ src && type ?BaseUrl+src:src} alt={alt}/>
            <Row className="mx-0">
                <Col md="10" className="container-des">
                    <h2 className="h2-course">{title}</h2>
                    <p className="p-course">{about}</p>
                </Col>
                
                <Col md="2" className="container-btn">
                    <Link  title="course" className="go-to-course" href={href}>
                        <ArrowForwardIosIcon  className="go-to-course-icon"/>
                    </Link>
                </Col>
            </Row>
        </div>
        
        </>
    )
}