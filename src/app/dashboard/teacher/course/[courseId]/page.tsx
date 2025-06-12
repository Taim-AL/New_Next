"use client"
import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import Image from "next/image";
import ContentCard from "@/app/ui/Teacher/ContentCard";
import FormDialog from "@/app/ui/Teacher/AddVideoForm";
import { Col, Row } from "react-bootstrap";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddAttachment from "@/app/ui/Teacher/AddAttachment";
import AddQuize from "@/app/ui/Teacher/AddQuize";
import Axios from "@/app/lib/axios";
import { useEffect, useState } from "react";
import IntegrationNotistack from "@/app/ui/Alert";
import { useParams } from "next/navigation";
import { AttachmentType, InnerCourseType, VideoOrQuiz } from "@/app/lib/definitions";
import Link from "next/link";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AttachmentCard from "@/app/ui/Teacher/AttachmentCard";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import UpdateCourse from "@/app/ui/Teacher/UpdateCourse";


export default  function  CoursePage() {
  // const courseId : string =  (params.courseId);
  const params = useParams();
  const courseId = params.courseId as string;
  const [refresh , setRefresh] = useState<boolean>(false);
  const [aquirements , setAquirements] = useState<string [] | null>(null)
  const [requirements , setRequirements] = useState<string [] | null>(null)
  const [attachments , setAttachments] = useState<AttachmentType [] | null>(null)
  const [category , setCategory] = useState<string | null>(null)
  const [content , setContent] = useState<VideoOrQuiz []| null>(null)
  const [courseInfo , setCourseInfo] = useState<InnerCourseType | null>(null)
  const [image , setImage] = useState<string | null>(null)
  const [isPending , setIsPending] =useState<boolean | null> (false);
  const [message , setMessage] =useState<string>("");
  const [error , setError] =useState<string>("");
  const handlePublishCourse =async (event : React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault()
      setIsPending(true)  
      setError("")
      setMessage("")
    try{
    const response = await Axios.get(`teacher/publish-course/${courseId}`)
            console.log( "response Created :",response)
            setIsPending(false)
            if( response.data.success === true){
              setMessage(response.data.message)
              setRefresh(!refresh)
            }else{
              setError(response.data.message)
            }
  
        }catch(e : any){
          console.log(e)
          setIsPending(false)
          setError(e.data.message)
        }
  }

  useEffect(()=>{
      try{
          Axios.get(`/teacher/course-details/${courseId}`).then(response =>{
              console.log("Course Details :",response)
              if(response.data.success === true){
                setAquirements(response.data.data.aquirements)
                setRequirements(response.data.data.requirements)
                setCategory(response.data.data.category)
                setAttachments(response.data.data.attachments)
                setContent(response.data.data.videosAndQuiz)
                setCourseInfo(response.data.data.course)
                setImage(response.data.data.course.image)
              }
          })}catch(error){
          console.log(error)
          }
      },[refresh])

  return (
    <>
        <Row className="outer-container-course mx-0">
            <Col lg="6" md="12"  xs="12" className="p-2">
              <div className="inner-container-course shadow">
                {image ?<Image alt="image" className='inner-course-image'width={100} height={15} priority={true} src={image} />:""}
                {/* <button title='edit-sp' className="edit-button" >
                    <AutoFixHighIcon className="edit-icon" />
                </button> */}
                {courseInfo ? courseInfo.status !==2 ?<UpdateCourse courseid={courseId} refresh={refresh} onChange={setRefresh}/>:"":""}
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
                          lock={false}
                          id={e.id}
                          imageUrl={e.type === "video" && e.image ? e.image : null}/>
                          )
                          console.log(i,e);                        
                        })}

                      </>:""}
                      
                    {courseInfo ? courseInfo.status !==2 ?  <FormDialog courseId={courseId} refresh={refresh} onChange={setRefresh}/> :"":""}
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
                {courseInfo ? courseInfo.status !==2 ?<Row className="mx-0 course_info_container mt-2">
                    
                    <Col md="6" xs="6">
                      <AddAttachment courseId={courseId} refresh={refresh} onChange={setRefresh}/>
                    </Col>
                    <Col md="6" xs="6">
                      <AddQuize courseId={courseId} refresh={refresh} onChange={setRefresh}/>
                    </Col>
                    <Col md="12" xs="12">
                      {courseInfo ? courseInfo.status === 0 ?<button title="Publish Course" type="button" className="button-add-lecture shadow " onClick={handlePublishCourse}>
                      {isPending ?"Loding..":"Publish Course"}
                      </button> :"" : ""}
                    </Col>
                </Row> :"" :""}
                    
                <Link href={`/dashboard/teacher`} className="go_back_button">
                  <ArrowForwardIosIcon className="go_back_icon" />
                </Link>

                <Row className="mx-0 course_info_container mt-2 pt-3">
                {attachments? 
                  <>
                  {attachments.map((e,i)=>{
                      return(
                        <AttachmentCard key={i} file_path={e.file_path} text={e.text} type={true}/>
                      )
                  })}
                  </>:""}
                </Row>


              </div>
            </Col>
            {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
            {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
            
        </Row>
        
    </>
  );
}