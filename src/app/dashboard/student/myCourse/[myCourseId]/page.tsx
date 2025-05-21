"use client"
import Axios from "@/app/lib/axios";
import { AttachmentType, BaseUrl, InnerCourseType, VideoOrQuiz } from "@/app/lib/definitions";
import IntegrationNotistack from "@/app/ui/Alert";
import ContentCard from "@/app/ui/Teacher/ContentCard";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AttachmentCard from "@/app/ui/Teacher/AttachmentCard";

export default  function  CoursePage() {
    const params = useParams();
    const courseId = params.myCourseId as string;
    const [courseInfo , setCourseInfo] = useState<InnerCourseType | null>(null)
    const [category , setCategory] = useState<string | null>(null)
    const [requirements , setRequirements] = useState<string [] | null>(null)
    const [aquirements , setAquirements] = useState<string [] | null>(null)
    const [attachments , setAttachments] = useState<AttachmentType [] | null>(null)
    const [content , setContent] = useState<VideoOrQuiz []| null>(null)
    const [isPending , setIsPending] =useState<number | null> (null);
    const [message , setMessage] =useState<string>("");
    const [error , setError] =useState<string>("");
    useEffect(()=>{
      try{
          Axios.get(`/student/get-course/${courseId}`).then(response =>{
              console.log("Course Details :",response)
              if(response.data.success === true){
                setCourseInfo(response.data.data.course)
                setCategory(response.data.data.category)
                setRequirements(response.data.data.requirements)
                setAquirements(response.data.data.aquirements)
                setAttachments(response.data.data.attachments)
                setContent(response.data.data.videosAndQuiz)
                
              }
          })}catch(error){
          console.log(error)
          }
      },[])

    return(
        <>
            <Row className="outer-container-course mx-0">
                        <Col lg="6" md="12"  xs="12" className="p-2">
                          <div className="inner-container-course shadow">
                          {courseInfo?.image ?<Image alt="image" className='inner-course-image'width={100} height={15} priority={true} src={BaseUrl+courseInfo.image} />:""}
                            <div className="inner-course-content">
                                  
                                  {content ? 
                                  <>
                                  
                                    {content.map((e,i)=>{
                                      return(
                                        <ContentCard 
                                      key={i}
                                      type={e.type}
                                      title={e.title}
                                      description={e.description || ""}
                                      lock={Boolean(e.is_locked)}
                                      id={e.id}
                                      imageUrl={e.type === "video" && e.image ? e.image : null}/>
                                      )                  
                                    })}
            
                                  </>:""}
                            </div>
                          </div>
                        </Col>
                        <Col md="12" lg="6" xs="12" className="p-2">
                          <div className="inner-container-course shadow">
                            <Row className="mx-0 course_info_container mt-2">
                              <Col md='12' xs='12' >
                                <h2 className="text-center course_title_h2"><span >Title </span>: {courseInfo ? courseInfo.name :""}</h2>
                              </Col>
                              <Col md='12' xs='12'>
                                <h2 className="text-center course_title_h2"><span >Description </span>: {courseInfo ? courseInfo.description :""}</h2>
                              </Col>
                              <Col lg="6" md='12' xs='12'><h2 className="text-center course_title_h2"><span >Category </span>: {category ? category:""}</h2></Col>
                              <Col lg="6" md='12' xs='12'><h2 className="text-center course_title_h2"><span >Level </span>: {courseInfo ? courseInfo.level === 0? "Beginner" :courseInfo.level === 1 ?"Intermediate": "Advanced" :""}</h2></Col>
                              <Col lg="6" md='12' xs='12'><h2 className="text-center course_title_h2"><span >Point To Enroll </span>: {courseInfo ? courseInfo.point_to_enroll :""}<AutoAwesomeIcon className="points_icon"/></h2></Col>
                              <Col lg="6" md='12' xs='12'><h2 className="text-center course_title_h2"><span >Points Earned </span>: {courseInfo ? courseInfo.points_earned :""}<AutoAwesomeIcon className="points_icon"/></h2></Col>
                              <Col lg="12" md='12' xs='12'><h2 className="text-center course_title_h2"><span >Status </span>: {courseInfo ? courseInfo.status === 0? "In Progress" :courseInfo.status === 1 ?"Pennding": "Published" :""}</h2></Col>
                              <Col md='12' xs='12'>
                                <h2 className="text-center course_title_h2"><span >Requairments :</span></h2>
                                <div className="container_skills_component">
                                  {requirements? 
                                    <>
                                    {requirements.map((e,i)=>{
                                        return(
                                          <h2 className="skils_component" key={i}>{e} <span>#</span></h2>
                                        )
                                    })}
                                    </>:""}
                                </div>
                              </Col>
                              <Col md='12' xs='12'><h2 className="text-center course_title_h2"><span >Aquairments :</span></h2></Col>
                              <div className="container_skills_component">
                              {aquirements? 
                                    <>
                                    {aquirements.map((e,i)=>{
                                        return(
                                          <h2 className="skils_component" key={i}>{e} <span>#</span></h2>
                                        )
                                    })}
                                    </>:""}
                                </div>
                            </Row>
                            <Link href={`/dashboard/student`} className="go_back_button">
                              <ArrowForwardIosIcon className="go_back_icon" />
                            </Link>
            
                            <Row className="mx-0 course_info_container mt-2 pt-3">
                            {attachments? 
                              <>
                              {attachments.map((e,i)=>{
                                  return(
                                    <AttachmentCard key={i} file_path={e.file_path} text={e.text} type={false}/>
                                  )
                              })}
                              </>:""}
                            </Row>
            
            
                          </div>
                        </Col>
                    </Row>
        </>
    )
}