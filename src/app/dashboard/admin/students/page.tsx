"use client";

import Axios from "@/app/lib/axios";
import { StudentInfoCard } from "@/app/lib/definitions";
import StudentCard from "@/app/ui/Admin/StudentCard";
import Pagination from "@/app/ui/Teacher/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddUser from "@/app/ui/Admin/AddUser";


export default function StudentPage() {
    const searchParams = useSearchParams();
    const [refresh , setRefresh] = useState<boolean>(false);
    const currentPage = Number(searchParams.get('page')) || 1;
    const [totalPages , setTotalPages] = useState<number | null>(null);
    const [students , setStudents] = useState<StudentInfoCard[] >([]);
  
useEffect(()=>{
    try{
      Axios.get(`/admin/get-students`).then(response =>{
        console.log("students :",response)
        if(response.data.success){
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
                    <StudentCard type="students" studentInfo={e} refresh={refresh} onChange={setRefresh}/>
                </Col>
            )
        })}
        <Col  lg="6" md="12" className=" d-flex align-items-center mt-2">
          <AddUser type="students" refresh={refresh} onChange={setRefresh}/> 
        </Col>  
      </Row>
    {/* {totalPages && <Pagination  totalPages={totalPages}/>}
    <div className="d-flex justify-content-center mt-5" >
    <Pagination  totalPages={4}/>
    </div> */}

    </>
  )
}
