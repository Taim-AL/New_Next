import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/admin/Students.css"
import {  StudentInfoCard } from '@/app/lib/definitions';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import { Col, Row } from 'react-bootstrap';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default function ResetPassword({type, St}:{type:string ,St : StudentInfoCard }) {
  const [open, setOpen] = React.useState(false);
  const [password , setPassword] = React.useState<string>("")
  const [confirmPassword , setConfirmPassword] = React.useState<string>("")
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false)
    setPassword("")
    setConfirmPassword("")
  };

    const handleUpdateInfo =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      const response = await Axios.post(`admin/${type}/${St.id}` , {password : password}
        , {headers: {
          'Content-Type': 'multipart/form-data'
        }})
              console.log( "response reset Password :",response)
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setPassword("")
                setConfirmPassword("")
                setOpen(false)
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
        <div  className="student_info">
            <button title='Reset Password' className="student_info_button2" onClick={handleClickOpen}>
                <AutoFixHighIcon  />
            </button>
        </div>
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
            <label className='lable_updata_student mb-3 mt-2'>New Password :</label>
            <input title='password' type="password" className='input_updata_student' value={password}  required onChange={(e)=>setPassword(e.target.value)}/>
            
            <label className='lable_updata_student mb-3 mt-2'>Confirm Password :</label>
            <input title='confirm password' type="password" className='input_updata_student' value={confirmPassword}  required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </>
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button" disabled={password !== confirmPassword}  className='button-create-course' onClick={handleUpdateInfo} >
            {isPending ?"Loding..":"Edit"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
