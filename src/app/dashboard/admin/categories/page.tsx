"use client";

import Axios from "@/app/lib/axios";
import { OptionType } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "@/app/ui/Assets/Css/admin/Courses.css"
import { useSearchParams } from "next/navigation";
import Pagination2 from "@/app/ui/Student/Pagination";
import CategoriesOrSkilsCard from "@/app/ui/Admin/SkillCategoryCard";
import AddCategory from "@/app/ui/Admin/AddCategory";
import AddSkill from "@/app/ui/Admin/AddSkill";
import { Skeleton, Stack } from "@mui/material";

export default function CategoriesPage() {
  const [categories , setCategories] = useState<OptionType[] | null>(null);
  const [allCategories , setAllCategories] = useState<OptionType[] >([]);
  const [skills , setSkills] = useState<OptionType[] | null>(null);
  const searchParams = useSearchParams();
  const currentPage1 = Number(searchParams.get('page1')) || 1;
  const currentPage2 = Number(searchParams.get('page2')) || 1;
  const [totalPages1 , setTotalPages1] = useState<number | null>(null);  
  const [totalPages2 , setTotalPages2] = useState<number | null>(null);
  const colors = ["#e74c3c", "#27ae60", "#2980b9", "#f39c12"];
  const [refresh1 , setRefresh1] = useState<boolean>(false);
  const [refresh2 , setRefresh2] = useState<boolean>(false);

useEffect(() => {
  try{
          Axios.get(`/admin/categories`, {params :{page:currentPage1}}).then(response =>{
            console.log("categories :",response)
            if(response.data.success){
              setTotalPages1(response.data.meta.last_page); 
              setCategories(response.data.data)
              }
        })}catch(error){
          console.log(error)
        }
  }, [currentPage1 , refresh1]);


useEffect(() => {
  try{
          Axios.get(`/admin/get-all-category`).then(response =>{
            // console.log("categories :",response)
            if(response.data.success){
              setAllCategories(response.data.data)
              }
        })}catch(error){
          console.log(error)
        }
  }, [currentPage1 , refresh1]);


  useEffect(() => {
  try{
          Axios.get(`/admin/skills`, {params :{page:currentPage2}}).then(response =>{
            console.log("skills :",response)
            if(response.data.success){
              setTotalPages2(response.data.meta.last_page); 
              setSkills(response.data.data)
              }
        })}catch(error){
          console.log(error)
        }
  }, [currentPage2 , refresh2]);

  return (
    <>
      <h1 className="z-3 title_ready_courses ">
       All categories on the platform :
      </h1>

      <Row className="mx-0 ">
        {   categories ?
            categories?.length !== 0 ?
              <>
                {categories.map((e,i)=>{
                    return(
                    <Col lg='3' md='4'xs='6' key={i} className="course-card-container mt-3">
                      <CategoriesOrSkilsCard allCat={allCategories} refresh1={refresh1} refresh2={refresh2} onChange1={setRefresh1} onChange2={setRefresh2} key={i} id={e.id} title={e.title} type="categories" borderColor={colors[i % colors.length]}/> 
                    </Col>
                    )
                })} 
              </>:"length" :
                [...Array(10)].map((_, i) => (
                <Col  lg='3' md='4'xs='6' key={i} className="course-card-container mt-3">
                  <div className="out_cat_skill_card d-flex align-items-stretch shadow" style={{ border: `2px solid ${colors[i % colors.length]}` }}>
                    <Stack spacing={1} className=" p-2 h-100">
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Stack>      
                  </div>
                </Col>))
        }
        <Col lg='3' md='4'xs='12'  className="d-flex justify-content-center ">
          <AddCategory refresh={refresh1} onChange={setRefresh1}/> 
        </Col>
        <Col  md='12'xs='12' className="w-100 d-flex justify-content-center mt-3">
            {totalPages1 ?
            <Pagination2  totalPages={totalPages1} attr="page1"/>
            :""}
        </Col>
      </Row>

      <h1 className="z-3 title_ready_courses ">
       All Skills on the platform :
      </h1>

      <Row className="mx-0 ">
        {   skills ?
            skills?.length !== 0 ?
              <>
                {skills.map((e,i)=>{
                    return(
                    <Col lg='3' md='4'xs='6' key={i} className="course-card-container mt-3">
                      <CategoriesOrSkilsCard allCat={allCategories}  refresh1={refresh1} refresh2={refresh2} onChange1={setRefresh1} onChange2={setRefresh2} id={e.id} title={e.title} type="skills" borderColor={colors[i % colors.length]}/> 
                    </Col>
                    )
                })} 
              </>:"length" :
                [...Array(10)].map((_, i) => (
                <Col  lg='3' md='4'xs='6' key={i} className="course-card-container mt-3">
                  <div className="out_cat_skill_card d-flex align-items-stretch shadow" style={{ border: `2px solid ${colors[i % colors.length]}` }}>
                    <Stack spacing={1} className=" p-2 h-100">
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Stack>      
                  </div>
                </Col>))

        }
        <Col lg='3' md='4'xs='12'  className="d-flex justify-content-center ">
          <AddSkill allCat={allCategories}  refresh={refresh2} onChange={setRefresh2}/> 
        </Col>
        <Col  md='12'xs='12' className="w-100 d-flex justify-content-center mt-3 mb-5">
            {totalPages2 ?
            <Pagination2  totalPages={totalPages2} attr="page2"/>
            :""}
        </Col>
      </Row>
    </>
  )
}
