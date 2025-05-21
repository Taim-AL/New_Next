"use client"
import "@/app/ui/Assets/Css/teacher/SpecilizationPage.css"
import { Col, Row } from "react-bootstrap"
import Image from "next/image";
import CourseCard from "@/app/ui/Teacher/CourseCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Axios from "@/app/lib/axios";
import { BaseUrl, OuterCourseType } from "@/app/lib/definitions";
import VerifiedIcon from '@mui/icons-material/Verified';
import Link from "next/link";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import UpdateSpecilization from "@/app/ui/Teacher/updateSp";

export default function SpecilizationPage() {
    const params = useParams();
    const spId = params.specilizationId as string;
    const [refresh , setRefresh] = useState<boolean>(false);
    const [courses , setCourses] = useState<OuterCourseType[] | null>(null);
    const [imageUrl , setImageUrl] = useState<string | null>(null);
    const [spTitle , setSpTitle] = useState<string | null>(null);
    const [isCompleated , setIsCompleated] = useState<number | null>(null);
    
    useEffect(()=>{
        try{
            Axios.get(`/teacher/specialization-courses/${spId}`).then(response =>{
                console.log("Sp :",response)
                if(response.data.success){
                console.log(response.data)   
                setCourses(response.data.data.courses);
                setImageUrl(response.data.data.image);
                setSpTitle(response.data.data.title);
                setIsCompleated(response.data.data.is_completed);
                }
            })}catch(error){
            console.log(error)
            }
    },[refresh])

    return(
        <>
            <Row className="outer-container-sp mx-0">
                
                <Col lg="12" md="12"  xs="12" className="p-2 z-3">
                <Link href={`/dashboard/teacher`} className="go_back_button">
                    <ArrowForwardIosIcon className="go_back_icon" />
                </Link>
                </Col>
                <Col lg="2" md="12"  xs="12" className="p-2"></Col>
                <Col lg="8" md="12"  xs="12" className="p-2">
                    <div className="inner-container-sp shadow">
                    { imageUrl ?<Image alt="image" className='inner-sp-image'  width={100} height={100} src={ imageUrl ?BaseUrl+imageUrl:""}/>  :""}
                        <h2 className="sp_title">
                            {spTitle}  {isCompleated === 1 ?<VerifiedIcon/>:""}
                        </h2>
                        {/* <Link href={`/dashboard/teacher`} className="edit-button">
                            <AutoFixHighIcon className="edit-icon" />
                        </Link> */}
                        <UpdateSpecilization id={spId} refresh={refresh} onChange={setRefresh}/>
                        <Row className="courses_container_sp">
                            {courses ? <>
                            {courses.map((e,i)=>{
                                return(
                                <Col  md='6'xs='12' key={i} className="course-card-container">
                                    <CourseCard type={1} href={`/dashboard/teacher/course/${e.course_id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                </Col>
                                )
                            })}</>
                            :""}
                        </Row>
                    </div>
                </Col>
                <Col lg="2" md="12"  xs="12" ></Col>
            </Row>
            
        </>
    )
}