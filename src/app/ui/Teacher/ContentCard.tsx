"use client"
import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import "@/app/ui/Assets/Css/teacher/CoursePage2.css"
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import clsx from 'clsx'
import QuizIcon from '@mui/icons-material/Quiz';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { usePathname } from "next/navigation";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LockIcon from '@mui/icons-material/Lock';
import QuizPageAndUpdate from "./QuizPageWithUpdate";

export default function ContentCard({type , title ,description , lock , id , course_id ,refresh , onChange} : {type : string , lock : boolean , id:number ,course_id:string ,title:string ,description:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}){
    const path = usePathname();
    return(
        <>

        {
          type === 'video'?
          <>
          <Accordion className="mb-3">
            <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            <Typography component="span">
                <SmartDisplayIcon className="contenet_icon"/>
                {title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className="d-flex justify-content-between">
                    <span>{description}</span>
                    {lock ?
                        <LockIcon className="icon_arrow" />
                    :
                    <Link href={`${path}/Video/${id}`} className="link_content_card">
                        <ArrowForwardIosIcon className="icon_arrow" />
                    </Link> }
            </Typography>
            </AccordionDetails>
        </Accordion>
          
          </>
          
          :
          
          <>
          <div className="quiz_card ">
                <div className="d-flex justify-content-between w-100">
                    <Typography component="span">
                    <QuizIcon className="contenet_icon"/>
                    {title}</Typography>
                    { lock ?
                    <LockIcon className="icon_arrow" />
                    :
                    <QuizPageAndUpdate courseId={course_id} quizId={String(id)} refresh={refresh} onChange={onChange} />
                    }
                </div>
            </div>
          
          </>

        }

        </>
    )
}