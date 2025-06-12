import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/teacher/Courses.css"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';

export default function UpdateProfile({refresh , onChange , url}:{ url : string,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = React.useState(false);
  const [userName , setUserName] = React.useState<string | null> (null)
  const [fullName , setFullName] = React.useState<string | null> (null)
  const [email , setEmail] = React.useState<string | null> (null)
  const [specialization , setSpecialization] = React.useState<string | null> (null)
  const [image , setImage] = React.useState<File | null> (null)
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
    // setCourses(data);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
  };

    const handleUpdateProfile =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        console.log("update profile : ",image)
        setError("")
        setMessage("")
      try{
      const response = await Axios.post(`${url}`,{full_name:fullName , image:image , email:email , specialization:specialization,username:userName }
        , {headers: {
          'Content-Type': 'multipart/form-data'
        }})
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setFullName(null)
                setEmail(null)
                setImage(null)
                setSpecialization(null)
                setUserName(null)
                setOpen(false)
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
      <button
          onClick={handleClickOpen}
          className="edit-button"
        >
        Edit Information  
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
            <div className="app2">
                <div className="parent1">
                    <div className="file-upload1">
                        <AddCircleOutlineRoundedIcon className='file-upload-icon' />
                        <input title={image ?String(image.name):'Profile Image'}  type="file"  onChange={(e)=>setImage(e.target.files![0])} />
                    </div>
                </div>
            </div>  
            <label className='lable-create-course mb-3 mt-2'>UserName :</label>
            <input title='UserName' type="text" className='input-create-course' value={userName ?userName:''}   onChange={(e)=>setUserName(e.target.value)}/>
            
            <label className='lable-create-course mb-3 mt-2'>Full Name :</label>
            <input title='Full Name' type="text" className='input-create-course' value={fullName ?fullName:''}   onChange={(e)=>setFullName(e.target.value)}/>

            <label className='lable-create-course mb-3 mt-2'>Email :</label>
            <input title='Email' type="email" className='input-create-course' value={email ?email:''}   onChange={(e)=>setEmail(e.target.value)}/>

            <label className='lable-create-course mb-3 mt-2'>Specialization :</label>
            <input title='Specialization' type="text" className='input-create-course' value={specialization ?specialization:''}   onChange={(e)=>setSpecialization(e.target.value)}/>
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button"  className='button-create-course' onClick={handleUpdateProfile} >
            {isPending ?"Loding..":"Update"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
