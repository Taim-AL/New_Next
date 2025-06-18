"use client";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css';
import { Navigation, Pagination, Mousewheel, Keyboard , Autoplay} from 'swiper/modules';
import Wave from "react-wavify";
import "@/app/ui/Assets/Css/Main/Waves.css"
import { Col, Row } from "react-bootstrap";
import React from "react";
import Axios from "@/app/lib/axios";
import { OuterCourseType } from "@/app/lib/definitions";
import CourseCard from "../Teacher/CourseCard";
import "@/app/ui/Assets/Css/student/Navbar.css"
import { Skeleton, Stack } from "@mui/material";
import Image from "next/image";
export default function Waves(){
  const [mostcourses , setMostCourses] = React.useState<OuterCourseType[] | null>(null);
  const [freecourses , setfreeCourses] = React.useState<OuterCourseType[] | null>(null);
  const [isPending1 , setIsPending1] = React.useState<boolean>(true);
  const [isPending2 , setIsPending2] = React.useState<boolean>(true);

    const DataSblide=[
        {
            id:0,
            title:"Welcome to Gen_Scan Acadimy",
            about:"We are an educational platform that provides many services , Our goalis to facilitate the educational process and make it more time and effort saving for both the professor and the student"
        },
        {
            id:1,
            title:"Some of our services",
            about:"We provide the ability to publish courses recorded by the professor in video form , and the professor can publish tests for his students , communicate with them through comments , and follow their progress , and upload files attached to each lecture ."
        },
        {
            id:2,
            title:"We work for the convenience of the teacher",
            about:"The teacher can follow the statistics of his own courses in terms of views, profits, and other details, and follow and respond to students’ comments"
        },
    ]

    React.useEffect(()=>{
        setIsPending1(true)
        try{
          Axios.get(`/courses/top-enrolled`).then(response =>{
            console.log("most Courses :",response)
            if(response.data.success){
              setMostCourses(response.data.data)
              setIsPending1(false)
            }
        })
        
      }catch(error){
          console.log(error)
        }
      },[])

      React.useEffect(()=>{
        setIsPending2(true)
        try{
          Axios.get(`/courses/free`).then(response =>{
            console.log("free Courses:",response)
            if(response.data.success){
              setfreeCourses(response.data.data)
              setIsPending2(false)
            }
        })
        
      }catch(error){
          console.log(error)
        }
      },[])

    return(
        <>
        <div className=" dec_info_out">
        <Row className="mx-0 dec_info_out1" >
            <Col lg="6" md="12">
            <div className="d-flex justify-content-lg-start align-items-center flex-column">
                <h1 className="dec_info_title">
                    Achieve your career goals with Gen_Scan Academy!
                </h1>
                <h3 className="dec_info_title2 ">
                    1_ Points System :
                </h3>
                <p className="dec_info_p">
                    The platform rewards students with redeemable points for completing courses, solving challenges, and engaging with content, which can be used to unlock premium courses or specializations. This gamified approach motivates continuous learning while giving teachers control to assign point values to different activities.
                </p>
                <h3 className="dec_info_title2 ">
                    2_ Chatbot Assistant :
                </h3>
                <p className="dec_info_p">
                    The AI-powered chatbot provides instant academic support by answering questions, summarizing course content, and recommending personalized learning paths to students. It enhances engagement through interactive guidance while reducing teachers' repetitive queries workload.
                </p>

            </div>
            </Col>
            <Col lg="6" md="12">
            <div className="d-flex justify-content-center">
            <img alt="Gen_Scan" className="dec_info_img"  src={"http://localhost:3000/home2.png"}/>
            </div>
            </Col>
        </Row>


        <Row className="mx-0 dec_info_out1 mt-5" >
            <Col lg="6" md="12">
            <div className="d-flex justify-content-center">
            <img alt="Gen_Scan" className="dec_info_img"  src={"http://localhost:3000/home3.png"}/>
            </div>
            </Col>
            <Col lg="6" md="12">
            <div className="d-flex justify-content-lg-start align-items-center flex-column">
                <h1 className="dec_info_title">
                    Achieve your career goals with Gen_Scan Academy!
                </h1>
                <h3 className="dec_info_title2 ">
                    3_ Dubbed audio system :
                </h3>
                <p className="dec_info_p">
                    The platform offers multi-language dubbed audio for course videos, allowing learners to select their preferred spoken language for enhanced comprehension. This accessibility feature breaks language barriers while maintaining the original educational content's integrity.
                </p>
                <h3 className="dec_info_title2 ">
                    4_ Subtitle & Translation System Feature:
                </h3>
                <p className="dec_info_p">
                    The platform provides real-time, multi-language subtitles with AI-powered translation, allowing learners to follow course content in their native language while preserving the original context. This feature ensures accessibility for global audiences while supporting better knowledge retention through dual-language display options.
                </p>

            </div>
            </Col>
            
        </Row>


        <Row className="mx-0 dec_info_out">
            <Col lg="12">
                <h3>
                    Most Populer Courses :
                </h3>
            </Col>

            {mostcourses ? <>{mostcourses.map((e,i)=>{
                // if(e.status === 0){
                return(
                <Col lg='3' md='6'xs='12' key={i} >
                    <CourseCard id={e.id} type={0} href={`/login`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                </Col>
                )
            })}</> : isPending1 ?
            [...Array(4)].map((_, i) => (
            <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                <div className="outer-card shadow">
                <Stack spacing={1} className=" p-2 h-100">
                    <Skeleton variant="rounded"  height={70}  sx={{ bgcolor: '#f2f6fd' }}/>
                {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </Stack>
                </div>
            </Col>))
            
           :
           <Col lg="12" >
            <div className="empty_free_courses">
                <h3>
                    _ There are no populer courses right now, but more are coming soon! :)
                </h3>
            </div>
            </Col>
           }
        </Row>

        <Row className="mx-0 dec_info_out">
            <Col lg="12">
                <h3>
                    Free Courses :
                </h3>
            </Col>

            {freecourses ? <>{freecourses.map((e,i)=>{
                // if(e.status === 0){
                return(
                <Col lg='3' md='6'xs='12' key={i} >
                    <CourseCard id={e.id} type={0} href={`/login`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                </Col>
                )
            })}</> : isPending2 ?
            [...Array(4)].map((_, i) => (
            <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                <div className="outer-card shadow">
                <Stack spacing={1} className=" p-2 h-100">
                    <Skeleton variant="rounded"  height={70}  sx={{ bgcolor: '#f2f6fd' }}/>
                {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </Stack>
                </div>
            </Col>))
            
           :
           <Col lg="12" >
            <div className="empty_free_courses">
                <h3>
                    _ There are no Free courses right now, but more are coming soon! :)
                </h3>
            </div>
            </Col>
           }
        </Row>
        </div>
        <div className="outer-container-swiper">
            <div className='continar-swiper'>
                <Swiper
                    loop={true}
                    cssMode={true}
                    navigation={true}
                    mousewheel={true}
                    keyboard={true} 
                    pagination={false}
                    zoom={true}
                    autoplay={{
                        delay:10000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
                    className="mySwiper"
                    style={{padding:"40px 0px"}}
                >
                    {DataSblide.map((e,i)=>{
                        return(
                            <SwiperSlide key={i}>
                                <div className='testimonial'>
                                    <h2 className='title'>
                                        {e.title}
                                    </h2>
                                    <div className='continar-ditailes'>
                                        <p className=' text-center ditailes'  >
                                            <i className='bx bxs-quote-alt-left quote-icon'></i>{e.about}
                                            <i className='bx bxs-quote-alt-right quote-icon'></i>
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                
                </Swiper>  
    
            </div>
        </div>

        <div>
            <Wave  fill={'#7aaddc'} paused={false} options={{height:70 , amplitude:50 , speed:0.15 , points:4,}}/>          
            <Wave fill={'#3a6a98'} paused={false} options={{height:70 , amplitude:35 , speed:0.20 , points:4,}} className='wave-1'/>
            <Wave fill={'#1F4E79'} paused={false} options={{height:70 , amplitude:40 , speed:0.25 , points:4,}} className='wave-1'/>
        </div>
        
        </>
    )
}