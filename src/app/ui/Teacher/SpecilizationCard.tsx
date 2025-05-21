import "@/app/ui/Assets/Css/teacher/Courses.css"
import FolderIcon from '@mui/icons-material/Folder';
import Link from "next/link";
import VerifiedIcon from '@mui/icons-material/Verified';

export default function SpecilizationCard ( {title,href ,com} :{title:string  ;href:string ;com:number}){
    return(
        <>
        
        <div className="w-100">
            <Link className="sp_link" href={href}>
                <FolderIcon className="sp_icon" />
            </Link>
            <h2 className="sp_title">
                {title}  {com === 1 ?<VerifiedIcon/>:""}
            </h2>
        </div>
        
        </>
    )
}