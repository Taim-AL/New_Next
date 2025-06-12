import "@/app/ui/Assets/Css/teacher/Courses.css"
import Image, { StaticImageData } from "next/image"
import { Col, Row } from "react-bootstrap"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import { BaseUrl } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Axios from "@/app/lib/axios";
export default function CourseCard( {id, type,src , alt,title,about ,href } :{id:number ; type:number;src:StaticImageData ; alt : string ;title:string ;about:string ;href:string }){
    const [category , setCategory] = useState<string>("");
    const [req , setReq] = useState<{title:string ; id : number}[]>([]);
    const [aqu , setAqu] = useState<{title:string ; id : number}[]>([]);

    useEffect(()=>{
            try{
                Axios.get(`/get-course-data/${id}`).then(response =>{
                  console.log("get-course-data :",response)
                  if(response.data.success){
                    // console.log(response.data.meta.last_page)   
                    // setTotalPagesSaved(response.data.meta.last_page);
                    setCategory(response.data.data.category.title)
                    setReq(response.data.data.skills)
                    setAqu(response.data.data.aquirements)
                  }
              })}catch(error){
                console.log(error)
              }
        },[id])
    
    return(
        <>
        <Link  title="course" className="go-to-course" href={href}>
        <div className="outer-card shadow">
            <Image className="course-image" width={100} height={15} src={ src && type ?BaseUrl+src:src} alt={alt}/>
            <Row className="mx-0">
                <Col md="10" className="container-des">
                    <h2 className="h2-course">{title}</h2>
                    <div className="d-flex">
                        <p className="p-course"><span className="h2-course">Description : </span> {about}</p>
                    </div>
                    {category? <div className="d-flex">
                        <p className="p-course"><span className="h2-course">Category : </span> {category}</p>
                    </div> :""}
                    {aqu ? <div className="d-flex">
                        <p className="p-course"><span className="h2-course">Skills you'le gain : </span> 
                        {aqu.map((e,i)=>{
                            return(
                                <span key={i}>{e.title} {req.length-1===i ? " ." : ", "}</span>
                            )
                        })}
                        </p>
                    </div> :""}
                    {req ?<div className="d-flex">
                        <p className="p-course"><span className="h2-course">Requirments : </span> 
                        {req.map((e,i)=>{
                            return(
                                <span key={i}>{e.title} {req.length-1===i ? " ." : ", "}</span>
                            )
                        })}
                        </p>
                    </div>:""}
                </Col>
                
                <Col md="2" className="container-btn">
                    
                        {/* <ArrowForwardIosIcon  className="go-to-course-icon"/>
                    </Link> */}
                </Col>
            </Row>
        </div>
        </Link>
        </>
    )
}