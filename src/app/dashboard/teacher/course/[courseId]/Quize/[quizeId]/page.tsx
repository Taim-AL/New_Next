"use client";
import Axios from "@/app/lib/axios";
import { ExamResponse } from "@/app/lib/definitions";
import "@/app/ui/Assets/Css/teacher/QuizePage.css"
import QuizPageAndUpdate from "@/app/ui/Teacher/QuizPageWithUpdate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap"


export default function QuizePage() {
    const params = useParams();
    const quizId = params.quizeId as string;
    const courseId = params.courseId as string;
    const[exam , setExam] = useState<ExamResponse | null>(null);
    const[refresh , setRefresh] = useState<boolean>(false);

    useEffect(()=>{
        try{
            Axios.get(`/teacher/get-quiz`,{params:{course_id:courseId, quiz_id: quizId}}).then(response =>{
                console.log("Exam :", response)
                if(response.data.success === true){
                    setExam(response.data.data[0]);
                    
                }
                })}catch(error){
            console.log(error)
            }
        },[])

    return(
        <>
            <Row className="outer-container-quiz mx-0">
                {/* <Col lg="2" md="12"  xs="12" className="p-2"></Col> */}
                {/* <Col lg="8" md="12"  xs="12" className="inner-container-quiz shadow p-2"> */}
                    <QuizPageAndUpdate courseId={courseId} quizId={quizId} refresh={refresh} onChange={setRefresh} />
                {/* </Col> */}
                {/* <Col lg="2" md="12"  xs="12" ></Col> */}
            </Row>
        </>
    )
}