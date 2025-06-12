import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/teacher/Courses.css"
import CustomizedHook from './AutoCompleate';
import { OptionType } from '@/app/lib/definitions';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Col, Row } from 'react-bootstrap';
import CustomizedHook1 from './AutoCompleate1';
import Axios from '@/app/lib/axios';
import { useAuth } from '@/app/context/auth-context';
import IntegrationNotistack from '@/app/ui/Alert';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default function UpdateCourse({courseid ,refresh , onChange}:{courseid:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const {id} = useAuth();
  const [open, setOpen] = React.useState(false);
  const [image , setImage] = React.useState<File | null> (null)
  const [name , setName] = React.useState<string | null> (null)
  const [description , setDescription] = React.useState<string | null> (null)
  const [level , setLevel] = React.useState<number | null> (null)
  const [pointsToEnroll , setPointsToEnroll] = React.useState<number | null> (null)
  const [pointsEarned , setPointsEarned] = React.useState<number | null> (null)
  const [step , setStep] = React.useState<number | null> (0)
  const [categorys, setCategorys] = React.useState<OptionType[]>([]);
  const [selectedCategorys, setSelectedCategorys] = React.useState<OptionType[]>([]);
  const [skills, setSkills] = React.useState<OptionType[]>([]);
  const [selectedRequirements, setSelectedRequirements] = React.useState<OptionType[]>([]);
  const [selectedAquirements, setSelectedAquirements] = React.useState<OptionType[]>([]);
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
    setStep(0);
  };

  React.useEffect(()=>{
    const getCategorys = async()=>{
      try{
        const response = await Axios.get('teacher/get-category')
          const res = response.data;
          console.log( "categorys :",response)
          if(res.success === true){
             setCategorys(res.data);
          }
      
      }catch(e){
        console.log(e)
      }
    }
    getCategorys();
  },[])

  React.useEffect(()=>{
    console.log("selected : ",selectedCategorys);
    const getSkills = async()=>{
      try{
        if(selectedCategorys.length > 0){
          const response = await Axios.get(`teacher/skills/${selectedCategorys[0].id}`)
          const res = response.data;
          console.log( "skills :",response)
          if(res.success === true){
             setSkills(res.data);
          }
        
        }
      
      }catch(e){
        console.log(e)
      }
    }
    getSkills();
  },[selectedCategorys[0]])

  const handleUpdateCourse =async (event: React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    setIsPending(true)
    setError("")
    setMessage("")
    let reqIds:number[] = [];
    let aquIds:number[]= [];
    selectedRequirements.map((item)=>{
        reqIds.push(Number(item.id));
    })
    selectedAquirements.map((item)=>{
      aquIds.push(Number(item.id));
  })
  try{
  const response = await Axios.post(`teacher/update-course/${courseid}`,{name:name , description:description , image:image , level:level ,teacher_id:id, point_to_enroll:pointsToEnroll , skills:reqIds,aquirements:aquIds, category_id:selectedCategorys[0].id , points_earned:pointsEarned}
    , {headers: {
      'Content-Type': 'multipart/form-data'
    }})
          console.log( "response Created :",response)
          setIsPending(false)
          
          if( response.data.success === true){
            setMessage(response.data.message)
            setOpen(false)
            onChange(!refresh)
            setName(null)
            setDescription(null)
            setLevel(null)
            setPointsToEnroll(0)
            setPointsEarned(0)
            setStep(0)
            // setCategorys([])
            setSelectedCategorys([])
            setSelectedRequirements([])
            setSelectedAquirements([])
            setSkills([])
            setImage(null)
          }else{
            setError(response.data.message)
          }

      }catch(e : any){
        console.log(e)
        setIsPending(false)
        // setError(e.data.message)
      }
    }

  return (
    
    <React.Fragment>
      <div className="add-course-container1">
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
        <DialogContent>
            

            {step === 0 && (
                <>
                    <div className="app2">
                        <div className="parent1">
                            <div className="file-upload1">
                                <AddCircleOutlineRoundedIcon className='file-upload-icon' />
                                <input title={image ?String(image.name):'image'}  type="file"  onChange={(e)=>setImage(e.target.files![0])} />
                            </div>
                        </div>
                    </div>  

                    
                    <label className='lable-create-course'>Course Name:</label>
                    <input title='course name' type="text" className='input-create-course' value={name ?name:''}   onChange={(e)=>setName(e.target.value)}/>

                    <label className='lable-create-course'>Category:</label>
                    <CustomizedHook1 value={selectedCategorys} onChange={setSelectedCategorys} options={categorys} title='Category' />


                    <label className='lable-create-course'>Description:</label>
                    <input title='description' type="text" className='input-create-course' value={description ?description:''}  onChange={(e)=>setDescription(e.target.value)}/>

                </>
            )}
            {step === 1 && (
                <>  
                    <label className='lable-create-course'>Level:</label>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        >
                            <div className="level-container">
                                <FormControlLabel  value="0" onChange={e => setLevel(0)}  control={<Radio />} label="Beginner" />
                                <FormControlLabel  value="1" onChange={e => setLevel(1)}  control={<Radio />} label="Intermediate" />
                                <FormControlLabel  value="2" onChange={e => setLevel(2)}  control={<Radio />} label="Advanced" />
                            </div>
                    </RadioGroup>

                    


                    <label className='lable-create-course'>Requirement:</label>
                    <CustomizedHook value={selectedRequirements} onChange={setSelectedRequirements} options={skills} title='Requirement' />

                
                    <label className='lable-create-course'>Aquirement:</label>
                    <CustomizedHook value={selectedAquirements} onChange={setSelectedAquirements} options={skills} title='Aquirement' />


                    <Row className='mx-0'>
                        <Col xs="12" md="6">
                            <label className='lable-create-course'>Points To Enroll:</label>
                            <input title='points to enroll' type="number" value={pointsToEnroll ?pointsToEnroll:''} className='input-create-course' onChange={(e)=>setPointsToEnroll(Number(e.target.value))}/>
                        </Col>
                        <Col xs="12" md="6">
                            <label className='lable-create-course'>Points To Earned:</label>
                            <input title='points to enroll' type="number" value={pointsEarned ?pointsEarned:''} className='input-create-course' onChange={(e)=>setPointsEarned(Number(e.target.value))}/>
                        </Col>
                    </Row>
                </>
            )}

            

        </DialogContent>
        <DialogActions>
            {step === 1 && (
            <button  className='cancel-create-course' onClick={()=>{setStep(step-1)}}>Prev</button>
            )}
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          {step === 0 ?
          <button type="submit" className='button-create-course'  onClick={()=>{setStep(step+1)}}>Next</button>
          :
          <button type="button" onClick={handleUpdateCourse} className='button-create-course' >
            {isPending ?"Loding..":"Update"}
          </button>
          }
        </DialogActions>
        {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      </Dialog>
      
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
      
    </React.Fragment>
  );
}
