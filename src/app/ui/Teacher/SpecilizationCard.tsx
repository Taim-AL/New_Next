import "@/app/ui/Assets/Css/teacher/Courses.css"
import FolderIcon from '@mui/icons-material/Folder';
import Link from "next/link";
import VerifiedIcon from '@mui/icons-material/Verified';
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Axios from "@/app/lib/axios";

export default function SpecilizationCard ( {id, title,href ,com , src } :{ src:string ; id:number ;title:string  ;href:string ;com:number}){
    const [categories , setCategories] = useState<{title:string ; id : number}[]>([]);
        const [req , setReq] = useState<{title:string ; id : number}[]>([]);
    
        useEffect(()=>{
                try{
                    Axios.get(`/get-spec-data/${id}`).then(response =>{
                      console.log("get-spec-data :",response)
                      if(response.data.success){
                        // console.log(response.data.meta.last_page)   
                        // setTotalPagesSaved(response.data.meta.last_page);
                        setCategories(response.data.data.categories)
                        setReq(response.data.data.skills)
                      }
                  })}catch(error){
                    console.log(error)
                  }
            },[id])
    
    return(
        <>
        
        <Link  title="Specilization " className="go-to-course" href={href}>
            <div className="outer-card shadow">
            <Image className="course-image" width={100} height={15} src={ src} alt={title}/>
            <Row className="mx-0">
                <Col md="10" className="container-des">
                    <h2 className="h2-course">{title} {com === 1 ?<VerifiedIcon/>:""}</h2>
                    {categories? <div className="d-flex">
                        <p className="p-course"><span className="h2-course">Categories : </span>
                         {categories.map((e,i)=>{
                            return(
                                <span key={i}>{e.title} {req.length-1===i ? " ." : ", "}</span>
                            )
                        })}
                         </p>
                    </div> :""}
                    {req ?<div className="d-flex">
                        <p className="p-course"><span className="h2-course">Skills you'le gain : </span> 
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


        {/* <div className="w-100">
            <Link className="sp_link" href={href}>
                <FolderIcon className="sp_icon" />
            </Link>
            <h2 className="sp_title">
                {title}  {com === 1 ?<VerifiedIcon/>:""}
            </h2>
        </div>
         */}
        </>
    )
}