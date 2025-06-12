"use client";

import Axios from "@/app/lib/axios";
import { BaseUrl, OuterCourseType } from "@/app/lib/definitions";
import CourseCard from "@/app/ui/Admin/CourseCard";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "@/app/ui/Assets/Css/admin/Courses.css"

export default function StudentPage() {
  const [courses , setCourses] = useState<OuterCourseType[] | null>(null);

  
  useEffect(() => {
  try{
          Axios.get(`/admin/get-ready-courses`).then(response =>{
            console.log("ready-courses :",response)
            if(response.data.success){
                setCourses(response.data.data)
              }
        })}catch(error){
          console.log(error)
        }
  }, []);

  useEffect(()=>{
             try{
                 Axios.get(`/admin/subscriptions`).then(response =>{
                     console.log("subscriptions :",response)
                  //    if(response.data.success === true){
                  //    }
                 })}catch(error){
                 console.log(error)
                 }
             },[])

  return (
    <>
      <h1 className="z-3 title_ready_courses ">
       Ready to publish courses :
      </h1>

      <Row className="mx-0 ">
        {   courses ?
            courses?.length !== 0 ?
              <>
                {courses.map((e,i)=>{
                    return(
                    <Col lg='4' md='6'xs='12' key={i} className="course-card-container">
                        <CourseCard id={e.id} href={`courses/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                    </Col>
                    )
                })} 
              </>:"length" :"Unkown"
        }
      </Row>
    </>
  )
}
