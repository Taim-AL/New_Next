"use client"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import { useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default  function AddAttachment({courseId ,refresh , onChange}:{courseId:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = useState(false);
  const [file , setFile] = React.useState<File | null> (null)
  const [description , setDescription] = React.useState<string | null> (null)
  const [isPending , setIsPending] =useState<boolean | null> (false);
  const [message , setMessage] =useState<string>("");
  const [error , setError] =useState<string>("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleAddAttachment =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      const response = await Axios.post(`teacher/add-course-attachmet`,{ course_id : courseId , attachments : [{text : description , file : file }]}
        , {headers: {
          'Content-Type': 'multipart/form-data'
        }}
      )
              console.log( "response Created :",response)
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setOpen(false)
                setDescription(null)
                setFile(null)
                onChange(!refresh)
              }else{
                setError(response.data.message)
              }
    
          }catch(e : any){
            console.log(e)
            setIsPending(false)
            setError(e.data.message)
          }
        }

  
  return (
    
    <React.Fragment>
        <button title="Add Attachment" type="button" className="button-add-lecture shadow " onClick={handleClickOpen}>
            Add Attachment
        </button>
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            slotProps={{
            paper: {
                component: 'form',
            },
            }}
        >
            <DialogContent>
                <div className="app2">
                    <div className="parent1">
                        <div className="file-upload1">
                            <InsertDriveFileIcon className='file-upload-icon' />
                            <input title={file ?String(file.name):'attachment'} accept=' application/pdf' type="file" onChange={(e)=>setFile(e.target.files![0])}  />
                        </div>
                    </div>
                </div> 
                <label className='lable-create-course'>Attachment Description:</label>
                <input title='course name' type="text" className='input-create-course'   onChange={(e)=> setDescription(e.target.value)}/>
            </DialogContent>
            <DialogActions>
            <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
            <button type="button"  className='button-create-course' onClick={handleAddAttachment} >
                {isPending ?"Loding..":"Create"}
            </button>
            </DialogActions>
        </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
