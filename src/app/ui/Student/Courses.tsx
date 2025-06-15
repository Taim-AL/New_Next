import "@/app/ui/Assets/Css/student/CoursesStudent.css"
import { BottomNavigation, BottomNavigationAction, Skeleton, Stack } from "@mui/material";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PublicOffOutlinedIcon from '@mui/icons-material/PublicOffOutlined';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import Axios from "@/app/lib/axios";
import {  OuterCourseType } from "@/app/lib/definitions";
import CourseCard from "../Teacher/CourseCard";
import Pagination2 from "./Pagination";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


export default function Courses(){
    // const [totalPagesProg , setTotalPagesProg] = useState<number | null>(null);
    // const [totalPagesSaved , setTotalPagesSaved] = useState<number| null>(null);
    // const [totalPagesComp , setTotalPagesComp] = useState<number| null>(null);
    const [coursesProg , setCoursesProg] = useState<OuterCourseType[] | null>(null);
    const [coursesSaved , setCoursesSaved] = useState<OuterCourseType[] | null>(null);
    const [coursesComp , setCoursesComp] = useState<OuterCourseType[] | null>(null);
    const [value, setValue] = useState('progress');
    const router = useRouter();
    // const searchParams = useSearchParams();
    // let currentPage1 = Number(searchParams.get('page1')) || 1;
    // let currentPage2 = Number(searchParams.get('page2')) || 1;
    // let currentPage3 = Number(searchParams.get('page3')) || 1;
    // const params = new URLSearchParams(searchParams.toString())
    useEffect(()=>{
        try{
            Axios.get(`/student/courses-in-progerss`).then(response =>{
              console.log('courses-in-progress',response)
              if(response.data.success){
                console.log(response.data.meta.last_page)   
                // setTotalPagesProg(response.data.meta.last_page);
                setCoursesProg(response.data.data)
              }
          })}catch(error){
            console.log(error)
          }
    },[])


    useEffect(()=>{
        try{
            Axios.get(`/student/courses-completed`).then(response =>{
              console.log("courses-completed :",response)
              if(response.data.success){
                console.log(response.data.meta.last_page)   
                // setTotalPagesComp(response.data.meta.last_page);
                setCoursesComp(response.data.data)
              }
          })}catch(error){
            console.log(error)
          }
    },[])


    useEffect(()=>{
        try{
            Axios.get(`/student/courses-saved`).then(response =>{
              console.log("courses-saved :",response)
              if(response.data.success){
                console.log(response.data.meta.last_page)   
                // setTotalPagesSaved(response.data.meta.last_page);
                setCoursesSaved(response.data.data)
              }
          })}catch(error){
            console.log(error)
          }
    },[])
    // const updateUrl =()=>{
    //     const params = new URLSearchParams(searchParams);
    //     params.set('page',"1".toString());
    //     router.push(`/dashboard/student?${params}`);
    // }

  
    return(
        <>
            <Row className="BottomNavigationContainerOuter mx-0 mt-3">
                <Col lg='12' md='12' xs='12' className="BottomNavigationContainer">
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        className="shadow"
                        style={{borderRadius:"20px" , marginTop:"2rem", marginBottom:"1rem", width:"1200px" , display:"flex" , justifyContent:"space-around"}}
                        >
                        <BottomNavigationAction label="In Progress" value='progress' icon={<PublicOutlinedIcon />} />
                        <BottomNavigationAction label="Saved" value='saved' icon={<PublicOffOutlinedIcon />} /> 
                        <BottomNavigationAction label="Compleated" value='compleated' icon={<EditDocumentIcon />} /> 
                    </BottomNavigation>
                </Col>
                <Col lg='12' md='12' xs='12'>
                <Row className="mx-0">
                    {
                        coursesProg &&
                        coursesProg?.length !==0 && value === "progress"  ? 
                        <>
                            {coursesProg.map((e,i)=>{
                                return(
                                <Col lg='3' md='6'xs='12' key={i} className="course-card-container">
                                    <CourseCard type={0} id={e.id} href={`student/myCourse/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                </Col>
                                )
                            })}
                            {/* {totalPagesProg ?<Pagination2 attr="page1" totalPages={totalPagesProg}/>:""} */}
                        </>
                        :""
                    }

                    {
                        coursesSaved && coursesSaved?.length !==0 && value === "saved"  ? 
                        <>
                            {coursesSaved.map((e,i)=>{
                                return(
                                <Col lg='3' md='6'xs='12' key={i} >
                                    <CourseCard type={0} id={e.id} href={`student/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                </Col>
                                )
                            })}
                            
                        </>
                        :""
                    }

                    {
                        coursesComp && coursesComp?.length !==0 && value === "compleated"  ? 
                        <>
                            {coursesComp.map((e,i)=>{
                                return(
                                <Col lg='3' md='6'xs='12' key={i} >
                                    <CourseCard type={0} id={e.id} href={`student/myCourse/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                </Col>
                                )
                            })}
                            {/* {totalPagesComp ?<Pagination2 attr="page1" totalPages={totalPagesComp}/>:""} */}
                        </>
                        :""
                    }

                    {
                        !coursesProg && value === "progress" || !coursesSaved && value === "saved" || !coursesComp && value === "compleated" ? 
                        [...Array(6)].map((_, i) => (
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
                        </Col>
                        ))
                        : coursesComp?.length ===0 && value === "compleated" || coursesProg?.length ===0 && value === "progress" || coursesSaved?.length ===0 && value === "saved"?
                        <Col md='12' className="d-flex justify-content-center align-items-center ">
                            <SentimentVeryDissatisfiedIcon className="empty_courses"/>
                        </Col>
                        :""
                    }
                </Row>
                </Col>
                {/* <Col lg='12' md='12' xs='12'>
                {totalPagesProg ?<> {value ==="progress" ?<Pagination2 attr="page1" totalPages={totalPagesProg}/>:""}</>:""}
                {totalPagesSaved ?<> {value ==="saved" ?<Pagination2 attr="page2" totalPages={totalPagesSaved}/>:""}</>:""}
                {totalPagesComp ?<> {value ==="compleated" ?<Pagination2 attr="page3" totalPages={totalPagesComp}/>:""}</>:""}
                </Col> */}
                
            </Row>
            
        </>
    )
}