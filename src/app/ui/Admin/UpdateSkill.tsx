import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/teacher/Courses.css"
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import EditIcon from '@mui/icons-material/Edit';
import { OptionType } from '@/app/lib/definitions';
import CustomizedHook1 from '../Teacher/AutoCompleate1';

export default function UpdateSkill({allCat,id ,refresh , onChange , categoryName}:{allCat:OptionType[] ;categoryName:string ,id:number ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = React.useState(false);
  const [title , setTitle] = React.useState<string | null> (categoryName)
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");
  const [selectedCategorys, setSelectedCategorys] = React.useState<OptionType[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
  };

    const handleUpdateSkillName =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      if(selectedCategorys.length > 0){const response = await Axios.put(`admin/skills/${id}`,{},{params:{title:title,category_id:selectedCategorys[0].id} })
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setSelectedCategorys([])
                setOpen(false)
                onChange(!refresh)
              }else{
                setError(response.data.message)
              }}else{
                const response = await Axios.put(`admin/skills/${id}`,{},{params:{title:title} })
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setOpen(false)
                onChange(!refresh)
              }else{
                setError(response.data.message)
              }
              }
    
          }catch(e : any){
            console.log(e)
            setIsPending(false)
            setError(e.data.message)
          }
        }


  return (
    
    <React.Fragment>
      <button   title="edit" className="update_delete_skill_btn" onClick={handleClickOpen}>
          <EditIcon  className="update_delete_skill_icon" />
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

            <label className='lable-create-course mb-3 mt-2'>Skill Name :</label>
            <input title='Skill Name' type="text" className='input-create-course' value={title ?title:''}  required onChange={(e)=>setTitle(e.target.value)}/>

            <label className='lable-create-course mb-3 mt-2'>For Category :</label>
            <CustomizedHook1 value={selectedCategorys} onChange={setSelectedCategorys} options={allCat} title='Category' />
            
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button" disabled={selectedCategorys.length === 0} className='button-create-course' onClick={handleUpdateSkillName} >
            {isPending ?"Loding..":"Update"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
