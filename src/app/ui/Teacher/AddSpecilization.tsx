import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import "@/app/ui/Assets/Css/teacher/Courses.css"
import CustomizedHook from './AutoCompleate';
import { OptionType } from '@/app/lib/definitions';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Axios from '@/app/lib/axios';
import { useAuth } from '@/app/context/auth-context';
import IntegrationNotistack from '@/app/ui/Alert';

export default function AddSpecilization({refresh , onChange}:{refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const {id} = useAuth();
  const [open, setOpen] = React.useState(false);
  const [title , setTitle] = React.useState<string | null> (null)
  const [courses, setCourses] = React.useState<OptionType[]>([]);
  const [selectedCourses, setSelectedCourses] = React.useState<OptionType[]>([]);
  const [image , setImage] = React.useState<File | null> (null)
  const [isCompleted , setIsCompleted] = React.useState<number | null> (0);
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");
  // const data =[
  //   {id : 1 , title:"Lorem ipsum dolor sit."},
  //   {id : 2 , title:"Lorem ipsum dolor sit."},
  //   {id : 3 , title:"Lorem ipsum dolor sit."},
  //   {id : 4 , title:"Lorem ipsum dolor sit."},
  //   {id : 5 , title:"Lorem ipsum dolor sit."},
  //   {id : 6 , title:"Lorem ipsum dolor sit."},
  //   {id : 7 , title:"Lorem ipsum dolor sit."},
  // ]
  const handleClickOpen = () => {
    setOpen(true);
    // setCourses(data);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
    onChange(!refresh)
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


    const handleAddSpecilization =async (event: React.MouseEvent<HTMLButtonElement>)=>{
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
      const response = await Axios.post(`teacher/create-specialization`,{title:title , image:image , is_completed:isCompleted , courses:courseId }
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
        <button title="add course" className="add-course-btn" onClick={handleClickOpen}>
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
          <button type="button"  className='button-create-course' onClick={handleAddSpecilization} >
            {isPending ?"Loding..":"Create"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
