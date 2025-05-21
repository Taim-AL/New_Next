"use client";

import Axios from "@/app/lib/axios";
import Pagination from "@/app/ui/Teacher/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function TeachersPage() {
  const searchParams = useSearchParams();
      const currentPage = Number(searchParams.get('page')) || 1;
      const [totalPages , setTotalPages] = useState<number | null>(null);
    
  useEffect(()=>{
      try{
        Axios.get(`/admin/get-teachers`,{params:{per_page:10 , page_number:currentPage }}).then(response =>{
          console.log("teachers :",response)
          if(response.data.success){
            setTotalPages(response.data.meta.last_page);
          }
      })}catch(error){
        console.log(error)
      }
    },[currentPage])

  return (
    <>
      <h1 className="z-3">
        teachers page Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eius omnis sunt corporis rem obcaecati ea molestiae animi illo molestias, iusto aliquam fugiat odit laboriosam, officiis totam nisi. Quasi, delectus?
      </h1>
    {totalPages && <Pagination  totalPages={totalPages}/>}
    </>
  )
}
