"use client";

import Axios from "@/app/lib/axios";
import { OuterSpType } from "@/app/lib/definitions";
import AddSpecilizationAdmin from "@/app/ui/Admin/AddSpAdmin";
import Pagination from "@/app/ui/Teacher/Pagination";
import SpecilizationCard from "@/app/ui/Teacher/SpecilizationCard";
import { Skeleton, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "@/app/ui/Assets/Css/admin/Courses.css"


export default function SpPage() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [totalPages , setTotalPages] = useState<number | null>(null);
  const [Sps , setSps] = useState<OuterSpType[] | null>(null);
  const [refresh , setRefresh] = useState<boolean>(false);

  useEffect(()=>{
        try{
          Axios.get(`/admin/get-specializations`,{params:{per_page:10 , page_number:currentPage }}).then(response =>{
            console.log("Sp :",response)
            if(response.data.success){
              setTotalPages(response.data.meta.last_page);
              setSps(response.data.data)
            }
        })}catch(error){
          console.log(error)
        }
      },[refresh]) 

  return (
    <>
      <h1 className="z-3 title_ready_courses ">
        all Specializations in the platform :
      </h1>
      <Row className="mx-0">
      {Sps ? <>{Sps.map((e,i)=>{
          return(
          <Col lg='4' md='6'xs='12' key={i} className="mb-5">
              <SpecilizationCard  id={e.id} src={String(e.image)} href={`specilizations/${e.id}`} com={e.is_completed} title={e.title} />
          </Col>
          )
      })}</> :
      [...Array(8)].map((_, i) => (
            <Col lg='4' md='6'xs='12' key={i} className="course-card-container mb-5">
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
      {totalPages && <Pagination  totalPages={totalPages}/>}
      
    </Row>

    <AddSpecilizationAdmin refresh={refresh} onChange={setRefresh}/>
  </>
  )
}
