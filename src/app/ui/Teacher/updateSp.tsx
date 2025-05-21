import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/teacher/Courses.css"
import CustomizedHook from './AutoCompleate';
import { OptionType } from '@/app/lib/definitions';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default function UpdateSpecilization({id ,refresh , onChange}:{id:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = React.useState(false);
  const [title , setTitle] = React.useState<string | null> (null)
  const [courses, setCourses] = React.useState<OptionType[]>([]);
  const [selectedCourses, setSelectedCourses] = React.useState<OptionType[]>([]);
  const [image , setImage] = React.useState<File | null> (null)
  const [isCompleted , setIsCompleted] = React.useState<number | null> (0);
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");
  
  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
  };

  React.useEffect(()=>{
      const getCoursesTitle = async()=>{
        try{
          const response = await Axios.get('teacher/courses-title-id')
            const res = response.data;
            console.log( "Courses Title :",response)
            if(res.success === true){
               setCourses(res.data);
            }
        
        }catch(e){
          console.log(e)
        }
      }
      getCoursesTitle();
    },[])


    const handleUpdateSp =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
        let courseId:number[] = [];
        selectedCourses.map((item)=>{
          courseId.push(Number(item.id));
        })
      try{
        console.log("Is Compleated : " , isCompleted)
      const response = await Axios.post(`teacher/update-specialization/${id}`,{title:title , image:image , is_completed:isCompleted , courses:courseId }
        , {headers: {
          'Content-Type': 'multipart/form-data'
        }})
              console.log( "response Sp Created :",response)
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                setTitle(null)
                setSelectedCourses([])
                setImage(null)
                setIsCompleted(null)
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
      <div className="add-course-container">
        <button title='edit-sp' className="edit-button" onClick={handleClickOpen}>
            <AutoFixHighIcon className="edit-icon" />
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
            <div className="app2">
                <div className="parent1">
                    <div className="file-upload1">
                        <AddCircleOutlineRoundedIcon className='file-upload-icon' />
                        <input title={image ?String(image.name):'image'}  type="file" required onChange={(e)=>setImage(e.target.files![0])} />
                    </div>
                </div>
            </div>  
            <label className='lable-create-course mb-3 mt-2'>Specilization Title :</label>
            <input title='course name' type="text" className='input-create-course' value={title ?title:''}  required onChange={(e)=>setTitle(e.target.value)}/>
            
            <label className='lable-create-course'>Is Completed:</label>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={isCompleted}
                >
                    <div className="level-container">
                        <FormControlLabel required value={1} onChange={e => setIsCompleted(1)}  control={<Radio />} label="Yes" />
                        <FormControlLabel required value={0} onChange={e => setIsCompleted(0)}  control={<Radio />} label="No" />
                    </div>
            </RadioGroup>

            <label className='lable-create-course'>Courses :</label>
            <CustomizedHook value={selectedCourses} onChange={setSelectedCourses} options={courses} title='Courses' />
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button"  className='button-create-course' onClick={handleUpdateSp} >
            {isPending ?"Loding..":"Update"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
