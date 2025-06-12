import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/Main/Waves.css"
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import { useAuth } from '@/app/context/auth-context';

export default function Support() {
  const [open, setOpen] = React.useState(false);
  const [title , setTitle] = React.useState<string>("")
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");
  const{role} = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false)
    setTitle("")
  };

    const handleSendMessage =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      if(role === "1"){const response = await Axios.post(`teacher/support/send`,{message:title})
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setTitle("")
                setOpen(false)
              }else{
                setError(response.data.message)
              }}

        if(role === "2"){const response = await Axios.post(`student/support/send`,{message:title})
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setTitle("")
                setOpen(false)
              }else{
                setError(response.data.message)
              }}
    
          }catch(e : any){
            console.log(e)
            setIsPending(false)
            setError(e.data.message)
          }
        }

  return (
    
    <React.Fragment>
        <div className="add-course-container">
            <button title="Support" className="center-footer-link" onClick={handleClickOpen}>
                Support
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
            <label className='lable-create-course mb-3 mt-2'>Write a letter to admin :</label>
            <input title='Message' type="text" className='input-create-course' value={title ?title:''}  required onChange={(e)=>setTitle(e.target.value)}/>
            </>
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button" disabled={!title}  className='button-create-course' onClick={handleSendMessage} >
            {isPending ?"Loding..":"Send"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
