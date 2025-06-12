import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import "@/app/ui/Assets/Css/admin/Students.css"
import { ProfileUrl, StudentInfoCard } from "@/app/lib/definitions";
import UpdateStudentInfo from "./UpdateStudent";
import ResetPassword from "./ResetPassword";
import DeleteIcon from '@mui/icons-material/Delete';
import IntegrationNotistack from "../Alert";
import Axios from "@/app/lib/axios";
import { useState } from "react";

export default function StudentCard({ type,studentInfo , refresh , onChange}:{type : string ,studentInfo:StudentInfoCard , refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}){
    const [message , setMessage] = useState<string>("");
    const [error , setError] = useState<string>("");

    const handleDeleteAccount =async (event: React.MouseEvent<HTMLButtonElement>)=>{
            event.preventDefault();
            setError("")
            setMessage("")
          try{
          const response = await Axios.delete(`admin/${type}/${studentInfo.id}`)
                  console.log( "response delete Account :",response)
                  if( response.data.success === true){
                    setMessage(response.data.message)
                    onChange(!refresh)
                  }else{
                    setError(response.data.message)
                  }
        
              }catch(e : any){
                console.log(e)
                setError(e.data.message)
              }
            }
    
    return (
        <>
        <Row className="mx-0 user_card_out shadow">
            <div  className="student_info">
                <button title='Delete Account' className="student_info_button3"  onClick={handleDeleteAccount}>
                    <DeleteIcon  />
                </button>
            </div>
                <ResetPassword type={type} St={studentInfo}/>
                <UpdateStudentInfo type={type} St={studentInfo} refresh={refresh} onChange={onChange}/>
            <Col lg="3" md="12">
                <div className="d-flex justify-content-center align-items-center h-100" >
                    <Image
                        src={type === "students" ?studentInfo.image: ProfileUrl +studentInfo.image}
                        width={150}
                        height={150}
                        alt={studentInfo.username}
                        className="student-image"
                        priority
                    />
                </div>
            </Col>
            <Col lg="9" md="12" className="d-flex justify-content-start align-items-center">
                <div className="line"></div>
                <div className="user_card_in">
                    <Row className="mx-0">
                        <Col lg="8" md="12">
                            <p className="content_font_p">
                                <span className="content_font_span">User Name :</span>  {studentInfo.username}
                            </p>
                        </Col>
                    </Row>
                    <p className="content_font_p">
                        <span className="content_font_span">Email :</span> {studentInfo.email}
                    </p>
                </div>
            </Col>
        </Row>
        {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
        {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
        
        </>
    )
}