"use client";

import Axios from "@/app/lib/axios";
import { StudentInfoCard } from "@/app/lib/definitions";
import AddUser from "@/app/ui/Admin/AddUser";
import StudentCard from "@/app/ui/Admin/StudentCard";
import Pagination from "@/app/ui/Teacher/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";


export default function TeachersPage() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [totalPages , setTotalPages] = useState<number | null>(null);
  const [refresh , setRefresh] = useState<boolean>(false);
  const [students , setStudents] = useState<StudentInfoCard[] >([]);
    
  useEffect(()=>{
      try{
        Axios.get(`/admin/get-teachers`,{params:{per_page:10 , page_number:currentPage }}).then(response =>{
          console.log("teachers :",response)
          if(response.data.success){
            setTotalPages(response.data.meta.last_page);
            setStudents(response.data.data);
          }
      })}catch(error){
        console.log(error)
      }
    },[refresh])

  return (
    <>
      <Row className="mx-0">
        
        {students.map((e,i)=>{
            return(
                <Col  lg="6" md="12" key={i} className="mt-4">
                    <StudentCard type={"teachers"} studentInfo={e} refresh={refresh} onChange={setRefresh}/>
                </Col>
            )
        })}
        <Col  lg="6" md="12" className=" d-flex align-items-center mt-2">
          <AddUser type={"teachers"} refresh={refresh} onChange={setRefresh}/> 
        </Col>  
      </Row>
    {totalPages && <Pagination  totalPages={totalPages}/>}
    {/* <div className="d-flex justify-content-center mt-5" >
    <Pagination  totalPages={4}/>
    </div> */}
    </>
  )
}
