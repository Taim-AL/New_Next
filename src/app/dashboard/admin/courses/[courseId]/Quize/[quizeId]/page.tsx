"use client";

import ShowQuizForAdmin from "@/app/ui/Admin/ShowQuiz";
import "@/app/ui/Assets/Css/teacher/QuizePage.css"
import { useParams } from "next/navigation";
import {  useState } from "react";
import {  Row } from "react-bootstrap"


export default function QuizePage() {
    const params = useParams();
    const quizId = params.quizeId as string;
    const courseId = params.courseId as string;

    return(
        <>
            <Row className="outer-container-quiz mx-0">
                <ShowQuizForAdmin courseId={courseId} quizId={quizId} />
            </Row>
        </>
    )
}