import "@/app/ui/Assets/Css/teacher/Courses.css"
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
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
    const [courses , setCourses] = useState<OuterCourseType[] | null>(null);
    const [Sps , setSps] = useState<OuterSpType[] | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    let currentPage = Number(searchParams.get('page')) || 1;
    const params = new URLSearchParams(searchParams.toString())
    useEffect(()=>{
        try{
            Axios.get(`/teacher/courses`,{params:{per_page:6 , page_number:currentPage}}).then(response =>{
              console.log("courses :",response)
              if(response.data.success){
                console.log(response.data.meta.last_page)   
                setTotalPages(response.data.meta.last_page);
                setCourses(response.data.data)
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
            <Row className="outer-container mx-0">
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
                        <BottomNavigationAction label="Created" value='created' icon={<EditDocumentIcon />} /> 
                        <BottomNavigationAction label="Specilization" value='specilization' icon={<AutoAwesomeMotionIcon />} /> 
                    </BottomNavigation>
                </Col>
                
                <Row className="mx-0">
                    {   courses ?
                        courses?.length !== 0 ?
                        <>
                        { value === "created" ?
                            <>
                                {courses.map((e,i)=>{
                                    if(e.status === 0){
                                    return(
                                    <Col lg='4' md='6'xs='12' key={i} className="course-card-container">
                                        <CourseCard type={1} href={`teacher/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                    </Col>
                                    )}
                                })}
                            </>
                            :value === "pennding"  ?
                                <>
                                {courses.map((e,i)=>{
                                    if(e.status === 1){
                                    return(
                                    <Col lg='4' md='6'xs='12' key={i} className="course-card-container">
                                        <CourseCard type={1} href={`teacher/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                    </Col>
                                    )}
                                })}
                            </>
                            :value === "pub"  ?
                            <>
                                {courses.map((e,i)=>{
                                    if(e.status === 2){
                                    return(
                                    <Col lg='4' md='6'xs='12' key={i} className="course-card-container">
                                        <CourseCard type={1} href={`teacher/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                                    </Col>
                                    )}
                                })}
                            </>:Sps ?<>
                        {Sps?.length !== 0 ?
                            <>
                            {
                            value === "specilization"  ?
                            <>
                            {Sps.map((e,i)=>{
                                    return(
                                    <Col lg='4' md='6'xs='12' key={i} className="course-card-container">
                                        <SpecilizationCard href={`teacher/specilization/${e.id}`} com={e.is_completed} title={e.title} />
                                    </Col>
                                    )
                                })}
                            </>:""
                            }
                            </>
                            :""}
                        </>:""
                        }
                        <Col md='12' className="d-flex justify-content-center align-items-center mt-4">
                            {totalPages ?
                            <Pagination  totalPages={totalPages}/>
                            :""}
                        </Col>
                        </>
                        :
                        <Col md='12' className="d-flex justify-content-center align-items-center ">
                            <SentimentVeryDissatisfiedIcon className="empty_courses"/>
                        </Col>
                        :
                        <Col md='12' className="d-flex justify-content-center align-items-center ">
                            {/* <Spinner animation="grow" variant="primary" style={{width:"7rem" , height:"7rem"}}/> */}
                            <h2 className="loding_h2">
                                Loding....
                            </h2>
                        </Col>
                    }

                    {
                
                value ==="specilization" ?<AddSpecilization refresh={refresh1} onChange={setRefresh1}/> : <FormDialog refresh={refresh} onChange={setRefresh}/>
                    }

                </Row>
            </Row>
            
        </>
    )
}