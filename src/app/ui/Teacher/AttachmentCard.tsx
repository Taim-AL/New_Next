import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import { Col, Row } from "react-bootstrap"
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BaseUrl } from "@/app/lib/definitions";

export default function AttachmentCard(attachment:{text : string , file_path: string , type : boolean}) {

    const handleDownloadFile = async({event} : { event :React.MouseEvent<HTMLButtonElement> })=>{
        event.preventDefault()
        // let url = window.URL.createObjectURL(BaseUrl +attachment.file_path);
        let a = document.createElement('a');
        a.href = BaseUrl +attachment.file_path;
        a.download=attachment.text;
        a.click();
      }

    return(
        <>
        <Col lg="12" >
            <Row className="mx-0 all_attachment ">
            <Col lg="4" xs="12" className="attachment_card mt-3">
                <div><DescriptionIcon className="file_icon"/></div>
                <div>
                    <button title="download file" className='file-upload-btn' onClick={(e)=>{handleDownloadFile({event : e})}}>
                    <VisibilityIcon  className="file_icon"/>
                    </button>
                    {attachment.type ?<DeleteOutlineIcon className="file_icon"/>:""}</div>
            </Col> 
            <Col lg="8" xs="12" className="attachment_description">
                <h6 className='file-name '>{attachment.text}</h6>
            </Col>
            </Row>
            <hr />
        </Col>
        
        </>
    )
}