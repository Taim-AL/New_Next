import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/admin/Students.css"
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import AddIcon from '@mui/icons-material/Add';

export default function AddCategory( {refresh , onChange}:{refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = React.useState(false);
  const [title , setTitle] = React.useState<string>("")
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false)
    setTitle("")
  };

    const handleAddCategory =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      const response = await Axios.post(`admin/categories` , {title : title})
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setTitle("")
                onChange(!refresh)
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
        <div className="add-course-container">
            <button title="Add Category" className="add-course-btn" onClick={handleClickOpen}>
                <AddIcon className="add-course-icon shadow"/>
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
            <label className='lable_updata_student mb-3 mt-2'>Category Name :</label>
            <input placeholder='Category Name' type="text" className='input_updata_student' value={title}  required onChange={(e)=>setTitle(e.target.value)}/>
            </>
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button"  className='button-create-course' onClick={handleAddCategory} >
            {isPending ?"Loding..":"Add"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
