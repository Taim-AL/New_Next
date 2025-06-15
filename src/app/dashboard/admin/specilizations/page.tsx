"use client";

import Axios from "@/app/lib/axios";
import { OuterSpType } from "@/app/lib/definitions";
import AddSpecilizationAdmin from "@/app/ui/Admin/AddSpAdmin";
import Pagination from "@/app/ui/Teacher/Pagination";
import SpecilizationCard from "@/app/ui/Teacher/SpecilizationCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";


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
          <Col lg='4' md='6'xs='12' key={i} className="mb-3">
              <SpecilizationCard  id={e.id} src={String(e.image)} href={`specilizations/${e.id}`} com={e.is_completed} title={e.title} />
          </Col>
          )
      })}</> :""}
      {totalPages && <Pagination  totalPages={totalPages}/>}
      
    </Row>

    <AddSpecilizationAdmin refresh={refresh} onChange={setRefresh}/>
  </>
  )
}
