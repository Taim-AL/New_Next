"use client";

import Axios from "@/app/lib/axios";
import { BaseUrl, OuterCourseType } from "@/app/lib/definitions";
import CourseCard from "@/app/ui/Admin/CourseCard";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "@/app/ui/Assets/Css/admin/Courses.css"
import { Skeleton, Stack } from "@mui/material";

export default function StudentPage() {
  const [courses , setCourses] = useState<OuterCourseType[] | null>(null);

  
  useEffect(() => {
  try{
          Axios.get(`/admin/get-ready-courses`).then(response =>{
            if(response.data.success){
                setCourses(response.data.data)
              }
        })}catch(error){
        }
  }, []);

  useEffect(()=>{
             try{
                 Axios.get(`/admin/subscriptions`).then(response =>{
                  //    if(response.data.success === true){
                  //    }
                 })}catch(error){
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
                    <Col lg='4' md='6'xs='12' key={i} className="course-card-container mb-3">
                        <CourseCard id={e.id} href={`courses/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                    </Col>
                    )
                })} 
              </>:"length" :
              [...Array(8)].map((_, i) => (
                          <Col lg='4' md='6'xs='12' key={i} className="course-card-container mb-3">
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
        }
      </Row>
    </>
  )
}
