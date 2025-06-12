import "@/app/ui/Assets/Css/teacher/Courses.css"
import { BottomNavigation, BottomNavigationAction, Skeleton, Stack } from "@mui/material";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PublicOffOutlinedIcon from '@mui/icons-material/PublicOffOutlined';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CourseCard from "./CourseCard";
import FormDialog from "./CreateCourse";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Axios from "@/app/lib/axios";
import SpecilizationCard from "./SpecilizationCard";
import AddSpecilization from "./AddSpecilization";
import { BaseUrl, OuterCourseType, OuterSpType } from "@/app/lib/definitions";


export default function Courses(){
    const [createCourse , setCreateCourse] = useState(false);
    const [refresh , setRefresh] = useState<boolean>(false);
    const [refresh1 , setRefresh1] = useState<boolean>(false);
    const [totalPages , setTotalPages] = useState<number | null>(null);
    const [coursesInPro , setCoursesInPro] = useState<OuterCourseType[] | null>(null);
    const [coursesPending , setCoursesPending] = useState<OuterCourseType[] | null>(null);
    const [coursesPublished , setCoursesPublished] = useState<OuterCourseType[] | null>(null);
    const [Sps , setSps] = useState<OuterSpType[] | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    let currentPage = Number(searchParams.get('page')) || 1;
    const params = new URLSearchParams(searchParams.toString())
    useEffect(()=>{
        try{
            Axios.get(`/teacher/courses/in-progress`).then(response =>{
              console.log("courses progress :",response)
              if(response.data.success){
                // console.log(response.data.meta.last_page)   
                // setTotalPages(response.data.meta.last_page);
                setCoursesInPro(response.data.data)
              }
          })}catch(error){
            console.log(error)
          }
    },[currentPage,refresh])

    useEffect(()=>{
        try{
            Axios.get(`/teacher/courses/pending`).then(response =>{
              console.log("courses pending :",response)
              if(response.data.success){
                // console.log(response.data.meta.last_page)   
                // setTotalPages(response.data.meta.last_page);
                setCoursesPending(response.data.data)
              }
          })}catch(error){
            console.log(error)
          }
    },[currentPage,refresh])

    useEffect(()=>{
        try{
            Axios.get(`/teacher/courses/published`).then(response =>{
              console.log("courses published :",response)
              if(response.data.success){
                // console.log(response.data.meta.last_page)   
                // setTotalPages(response.data.meta.last_page);
                setCoursesPublished(response.data.data)
              }
          })}catch(error){
            console.log(error)
          }
    },[currentPage,refresh])
    useEffect(()=>{
        try{
            Axios.get(`/teacher/specializations`,{params:{per_page:6 , page_number:currentPage}}).then(response =>{
              console.log("Sp :",response)
              if(response.data.success){
                console.log(response.data.meta.last_page)   
                setTotalPages(response.data.meta.last_page);
                setSps(response.data.data)
              }
          })}catch(error){
            console.log(error)
          }
    },[currentPage,refresh1])

    const updateUrl =()=>{
        const params = new URLSearchParams(searchParams);
        params.set('page',"1".toString());
        router.push(`/dashboard/teacher?${params}`);
    }

  const [value, setValue] = useState('created');
    return(
        <>
            <Row className="outer-container mx-0 mt-3">
                <Col lg='12' md='12' xs='12'className="inner-container" >
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            updateUrl();
                            setValue(newValue);
                        }}
                        className="shadow"
                        style={{borderRadius:"20px" , marginTop:"2rem", marginBottom:"1rem", width:"1200px" , display:"flex" , justifyContent:"space-around"}}
                        >
                        <BottomNavigationAction label="Published" value='pub' icon={<PublicOutlinedIcon />} />
                        <BottomNavigationAction label="Pennding" value='pennding' icon={<PublicOffOutlinedIcon />} /> 
                        <BottomNavigationAction label="In Progress" value='created' icon={<EditDocumentIcon />} /> 
                        <BottomNavigationAction label="Specilization" value='specilization' icon={<AutoAwesomeMotionIcon />} /> 
                    </BottomNavigation>
                </Col>
                
                <Row className="mx-0">
                    {
                        coursesInPro &&
                        coursesInPro?.length !==0 && value === "created"  ? 
                        <>
                            {coursesInPro.map((e,i)=>{
                                return(
                                <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                                    <CourseCard id={e.id} type={0} href={`teacher/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                </Col>
                                )
                            })}
                        </>
                        :""
                    }

                    {
                        coursesPending && coursesPending?.length !==0 && value === "pennding"  ? 
                        <>
                            {coursesPending.map((e,i)=>{
                                return(
                                <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                                    <CourseCard id={e.id} type={0} href={`teacher/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                </Col>
                                )
                            })}
                            
                        </>
                        :""
                    }

                    {
                        coursesPublished && coursesPublished?.length !==0 && value === "pub"  ? 
                        <>
                            {coursesPublished.map((e,i)=>{
                                return(
                                <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                                    <CourseCard id={e.id} type={0} href={`teacher/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                </Col>
                                )
                            })}
                        </>
                        :""
                    }

                    {
                        Sps && Sps?.length !==0 && value === "specilization"  ? 
                        <>
                            {Sps.map((e,i)=>{
                                return(
                                <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                                    <SpecilizationCard id={e.id} src={String(e.image)}  href={`teacher/specilization/${e.id}`} com={e.is_completed} title={e.title} />
                                </Col>
                                )
                            })}
                            {totalPages ? <div className="w-100 d-flex justify-content-center"><Pagination  totalPages={totalPages}/> </div>:""}
                        </>
                        :""
                    }

                    {
                        !coursesInPro && value === "created" || !coursesPending && value === "pennding" || !coursesPublished && value === "pub" || !Sps && value === "specilization"? 
                        // <Col md='12' className="d-flex justify-content-center align-items-center ">
                        //     <h2 className="loding_h2">
                        //         Loding....
                        //     </h2>
                        // </Col>

                        [...Array(6)].map((_, i) => (
                        <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                            <Stack spacing={1} className="shadow p-2 h-100">
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
                        </Col>
                        ))
                        : coursesInPro?.length ===0 && value === "created" || coursesPending?.length ===0 && value === "pennding" || coursesPublished?.length ===0 && value === "pub" || Sps?.length ===0 && value === "specilization"?
                        <Col md='12' className="d-flex justify-content-center align-items-center ">
                            <SentimentVeryDissatisfiedIcon className="empty_courses"/>
                        </Col>
                        :""
                    }


                    {    
                    value ==="specilization" ?<AddSpecilization refresh={refresh1} onChange={setRefresh1}/> : <FormDialog refresh={refresh} onChange={setRefresh}/>
                    }

                </Row>
            </Row>
            
        </>
    )
}