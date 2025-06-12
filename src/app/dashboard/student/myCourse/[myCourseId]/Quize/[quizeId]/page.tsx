"use client";

import "@/app/ui/Assets/Css/teacher/QuizePage.css"
import QuizPageAndSolve from "@/app/ui/Student/QuizPageAndSolve";
import { useParams } from "next/navigation";
import {  useState } from "react";
import {  Row } from "react-bootstrap"


export default function QuizePage() {
    const params = useParams();
    const quizId = params.quizeId as string;
    const courseId = params.myCourseId as string;
    const[refresh , setRefresh] = useState<boolean>(false);

    return(
        <>
            <Row className="outer-container-quiz mx-0">
                <QuizPageAndSolve courseId={courseId} quizId={quizId} refresh={refresh} onChange={setRefresh} />
            </Row>
        </>
    )
}