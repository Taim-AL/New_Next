import "@/app/ui/Assets/Css/teacher/Courses.css"
import Image, { StaticImageData } from "next/image"
import { Col, Row } from "react-bootstrap"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
export default function CourseCard( { id,src , alt,title,about  } :{id:number,src:StaticImageData ; alt : string ;title:string ;about:string ;href:string }){
     
    return( 
        <>
        
        <div className="outer-card d-flex align-items-stretch shadow mt-3">
            <Image className="course-image" width={100} height={15} src={ src} alt={alt}/>
            <Row className="mx-0">
                <Col md="10" className="container-des">
                    <h2 className="h2-course">{title}</h2>
                    <div className="d-flex">
                        <h2 className="h2-course">Description :</h2>
                        <p className="p-course">{about}</p>
                    </div>
                    
                </Col>
                
                <Col md="2" className="container-btn">
                    <Link  href={`courses/${id}`} title="course" className="go-to-course" >
                        <ArrowForwardIosIcon  className="go-to-course-icon"/>
                    </Link>
                </Col>
            </Row>
        </div>
        
        </>
    )
}