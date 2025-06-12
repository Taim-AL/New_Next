import "@/app/ui/Assets/Css/admin/CategoriesOrSkils.css"
import { Col, Row, Spinner } from "react-bootstrap"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IntegrationNotistack from "../Alert";
import { useState } from "react";
import Axios from "@/app/lib/axios";
import UpdateCategory from "./EditCategory";
import { OptionType } from "@/app/lib/definitions";
import UpdateSkill from "./UpdateSkill";

export default function CategoriesOrSkilsCard( {allCat, id,type ,title , borderColor,refresh1,refresh2 , onChange1 , onChange2 } :{id:number ; allCat:OptionType[] ; type : string ;title:string ; borderColor:string ,refresh1:boolean , onChange1 :React.Dispatch<React.SetStateAction<boolean>> ,refresh2:boolean , onChange2 :React.Dispatch<React.SetStateAction<boolean>>}){
  const [isPending , setIsPending] = useState<boolean | null> (false);
    const [message , setMessage] = useState<string>("");
    const [error , setError] =useState<string>("");   
  
  const handleDelete =async (event: React.MouseEvent<HTMLButtonElement>)=>{
             event.preventDefault();
             setIsPending(true)
             setError("")
             setMessage("")
           try{
             // console.log("Is Compleated : " , isCompleted)
            const response = await Axios.delete(`admin/${type}/${id}`)
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                if(type === "categories"){
                  onChange1(!refresh1)
                }else{
                  onChange2(!refresh2)
                }
              }else{
                setError(response.data.message)
              }
         
               }catch(e : any){
                 console.log(e)
                 setIsPending(false)
                 setError(e.data.message)
               }
             }
    return(
        <>
        
        <div className="out_cat_skill_card d-flex align-items-stretch shadow" style={{ border: `2px solid ${borderColor}` }}>
            <Row className="mx-0 d-flex align-items-center">
                <Col lg="12" className="container-des">
                    <h2 className="h2-course">{title}</h2>
                </Col>
                
                <Col lg="12" md="12" className="container-btn  d-flex align-items-center justify-content-end">
                    {type === "categories" ? <UpdateCategory id={id} categoryName={title} refresh={refresh1} onChange={onChange1}/>:
                    <UpdateSkill allCat={allCat} id={id} categoryName={title} refresh={refresh2} onChange={onChange2}/>
                    }
                    <button   title="delete" className="update_delete_skill_btn" onClick={handleDelete}>
                        {isPending ?<Spinner animation="grow" variant="dark" />:<DeleteIcon  className="update_delete_skill_icon"/>}
                    </button>
                </Col>
            </Row>
        </div>
        {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
        {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
        </>
    )
}