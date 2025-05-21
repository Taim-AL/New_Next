"use client"
import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import image from "@/app/ui/Assets/Css/2.avif";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import clsx from 'clsx'
import QuizIcon from '@mui/icons-material/Quiz';
import { usePathname } from "next/navigation";
import { BaseUrl } from "@/app/lib/definitions";

export default function ContentCard({type , title ,description , lock , id , imageUrl} : {imageUrl:StaticImageData | null  ,type : string , lock : boolean , id:number ,title:string ,description:string }){
    const path = usePathname();
    return(
        <>
        {type === 'video'?
        <div className={clsx(
            "outer-content-card shadow ",
            {"outer-content-card-lock shadow " : lock ===true},
        )}>
            { imageUrl ?<Image alt="lecture" className="image-lecture" width={100} height={100} src={ imageUrl ?BaseUrl +imageUrl:""}/>  :""}
            <div className="name-des-container">
                <h2 className="name-lecture">
                    {title}
                </h2>
                <p className="des-lecture">
                    {description}
                </p>
                <div className="container-link-content-card">
                { lock ? 
                ""
                :
                <Link href={`${path}/Video/${id}`} className="link-content-card">
                    <ArrowForwardIosIcon className="icon-arrow" />
                </Link> 
                }
                </div>
            </div>
        </div>
        :   
        <div className={clsx(
            "outer-content-card shadow ",
            {"outer-content-card-lock shadow " : lock ===true},
        )}>
            <div className="inner1-quiz-card">
                <div className="container-quiz-icon">
                    <QuizIcon className="quiz-icon"/>
                </div>
            </div>
            <div className="inner2-quiz-card">
                <h2 className="name-lecture">{title}</h2>
                { lock ?
                ""
                :<Link href={`${path}/Quize/${id}`} className="">
                    <ArrowForwardIosIcon className="icon-arrow" />
                </Link> 
                }
            </div>
        </div>
    }
        </>
    )
}