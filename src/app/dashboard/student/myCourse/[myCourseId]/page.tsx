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
import HTMLContent from "@/app/ui/Student/Counter";
import { Avatar } from "@mui/material";
import { useAuth } from "@/app/context/auth-context";

export default  function  CoursePage() {
    const params = useParams();
    const courseId = params.myCourseId as string;
    const [refresh , setRefresh] = useState<boolean>(false);
    const [courseInfo , setCourseInfo] = useState<InnerCourseType | null>(null)
    const [category , setCategory] = useState<string | null>(null)
    const [progress , setProgress] = useState<number | null>(null)
    const [requirements , setRequirements] = useState<string [] | null>(null)
    const [aquirements , setAquirements] = useState<string [] | null>(null)
    const [attachments , setAttachments] = useState<AttachmentType [] | null>(null)
    const [content , setContent] = useState<VideoOrQuiz []| null>(null)
    const [isPending , setIsPending] =useState<number | null> (null);
    const [message , setMessage] =useState<string>("");
    const [error , setError] =useState<string>("");
    const {userName} = useAuth();
          const [mounted, setMounted] = useState(false);
        
            useEffect(() => {
              setMounted(true);
            }, []);
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


    useEffect(()=>{
      try{
          Axios.get(`/student/get-percentage-for-course/${courseId}`).then(response =>{
              console.log("Course Progress :",response)
              if(response.data.success === true){
                setProgress(response.data.data)
              }
          })}catch(error){
          console.log(error)
          }
      },[])

    return(
        <>
        <div className="outer-container-course2">
                  <Link href={`/dashboard/teacher`} className="go_back_button">
                    <ArrowForwardIosIcon className="go_back_icon" />
                  </Link>
                  <Row className="mx-0 pt-4 pb-4 h-100">
                    <Col lg="6" md="12" xs="12" className="d-flex align-items-stretch flex-column">
                      {/* <img alt="AIU" className="AIU_logo" src={"http://127.0.0.1:3000/AIU.png"}/> */}
                      <h2 className="course2_title_h2"> {courseInfo ? courseInfo.name :""}</h2> 
                      <p>This course belongs to the category <span className="category_span">{category ? category:""}</span></p>
                      {mounted ?<div className="d-flex align-items-center"><Avatar className="instructor_avatar" alt={String(userName)} /><p className="mt-3">Instructor : <span className="category_span">{userName}</span></p></div> : ""}
                      <div style={{marginLeft:"3rem"}}><h2 className="course2_info_title ">Your Progress  </h2>{progress ?<HTMLContent myCount={progress}/>:""}</div>
                    </Col>
                    <Col lg="6" md="12" xs="12">
                        {courseInfo?.image ?<Image alt="image" className='course2_image'width={100} height={15} priority={true} src={courseInfo?.image} />:""} 
                    </Col>
                  </Row>
                </div>
                <div className="outer_container_course_info">
                    <Row className="mx-0 inner_container_course_info shadow">
                      <Col lg="4" md="12" xs="12" className="d-flex justify-content-lg-start">
                          <div><h2 className="course2_info_title">{content?.length} Content</h2>
                          <p className="course2_info_description">Gain insight into a topic and learn the fundamentals.</p></div>
                      </Col>
                      <Col lg="4" md="12" xs="12" className="text-lg-center">
                        <h2 className="course2_info_title">{courseInfo ? courseInfo.level === 0? "Beginner level" :courseInfo.level === 1 ?"Intermediate level": "Advanced level" :""}</h2>
                      </Col>
                      <Col lg="4" md="12" xs="12" className="d-flex justify-content-lg-end"> 
                          <div ><h2 className="course2_info_title">Flexible schedule</h2>
                          <p className="course2_info_description">Learn at your own pace</p>
                          </div>
                      </Col>
                    </Row>
                </div>
                
                <div className="description_skills_outer_container">
                  <h2 className="course2_info_title">The Course description </h2>
                  <p className="mx-lg-3">{courseInfo ? courseInfo.description :""}</p>
                  <div className="mt-3">
                    <h2 className="course2_info_title">Requairments </h2>
                    {requirements? 
                      <>
                      {requirements.map((e,i)=>{
                          return(
                            <span className="skils_component_2" key={i}>{e} #</span>
                          )
                      })}
                      </>:""}
                  </div>
                  <div className="mt-3">
                    <h2 className="course2_info_title">Skills you'll gain </h2>
                    {aquirements? 
                      <>
                      {aquirements.map((e,i)=>{
                          return(
                            <span className="skils_component_2" key={i}>{e} #</span>
                          )
                      })}
                      </>:""}
                  </div>
                
        
                </div>
                <div className="description_skills_outer_container">
                  <Row className="mx-0">
                    <Col lg="8" md="12"> 
                      <div className="content_inner_container">
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
                                course_id ={String(courseId)}
                                refresh={refresh} onChange={setRefresh} 
                                />
                                )                      
                              })}
        
                            </>:""}
                        
                      </div>
                    </Col>
                    <Col lg="4" md="12">
                      <div className="content_inner_container">
                          {attachments? 
                            <>
                            {attachments.map((e,i)=>{
                                return(
                                  <AttachmentCard key={i} file_path={e.file_path} text={e.text} type={true}/>
                                )
                            })}
                            </>:""}
                      </div>
                    </Col>
                  </Row>
                </div>
        
                {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
                {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }











            
        </>
    )
}