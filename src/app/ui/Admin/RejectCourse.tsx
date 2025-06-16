import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/admin/Students.css"
import {  StudentInfoCard } from '@/app/lib/definitions';
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import { useRouter } from 'next/navigation';

export default function RejectCourse({id}:{id:string }) {
  const [open, setOpen] = React.useState(false);
  const [reason , setReason] = React.useState<string>("")
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false)
    setReason("")
  };

    const handleRejectCourse =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      const response = await Axios.post(`admin/courses/${id}/reject`, {}, {params:{reason:reason}})
              console.log( "response reject course  :",response)
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setReason("")
                setOpen(false)
                router.push("/dashboard/admin/courses")
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
        <button title="Reject Course" type="button" className="button_add_video" onClick={handleClickOpen}>
            Reject Course
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
        
        <DialogContent className='mb-5'>
            <>
            <label className='lable_updata_student mb-3 mt-2'>The reason :</label>
            <input title='reason' type="text" className='input_updata_student' value={reason}   onChange={(e)=>setReason(e.target.value)}/>
            </>
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button" disabled={!reason}  className='button-create-course' onClick={handleRejectCourse} >
            {isPending ?"Loding..":"Reject"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
