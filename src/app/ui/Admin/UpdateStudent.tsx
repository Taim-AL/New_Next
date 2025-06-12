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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Col, Row } from 'react-bootstrap';

export default function UpdateStudentInfo({type, St , refresh , onChange}:{type:string,St : StudentInfoCard ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = React.useState(false);
  const [fullName , setFullName] = React.useState<string>(St.full_name);
  const [userName , setUserName] = React.useState<string>(St.username);
  const [email , setEmail] = React.useState<string>(St.email);
  const [ specialization, setSpecialization] = React.useState<string>(St.specialization);
  const [age , setAge] = React.useState<number>(St.age);
  const [gender , setGender] = React.useState<number>(St.gender);
  const [points , setPoints] = React.useState<number>(St.points);
  const [image , setImage] = React.useState<File | null> (null)
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  const [message , setMessage] = React.useState<string>("");
  const [error , setError] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setImage(null)
    setOpen(false)
  };

    const handleUpdateInfo =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      const response = await Axios.post(`admin/${type}/${St.id}`,{ full_name:fullName ,email:email ,username:userName , age:age ,image:image ,gender:gender ,points:points ,specialization:specialization}
        , {headers: {
          'Content-Type': 'multipart/form-data'
        }})
              console.log( "response Edit student info :",response)
              setIsPending(false)
              if( response.data.success === true){
                setMessage(response.data.message)
                // setImage(null)
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
      <div  className="student_info">
            <button title='Show' className="student_info_button" onClick={handleClickOpen}>
                <VisibilityIcon  />
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
            <label className='lable_updata_student mb-3 mt-2'>Full Name :</label>
            <input title='Full name' type="text" className='input_updata_student' value={fullName}   onChange={(e)=>setFullName(e.target.value)}/>
            
            <label className='lable_updata_student mb-3 mt-2'>User Name :</label>
            <input title='User Name' type="text" className='input_updata_student' value={userName}   onChange={(e)=>setUserName(e.target.value)}/>

            <label className='lable_updata_student mb-3 mt-2'>Email :</label>
            <input title='Email' type="email" className='input_updata_student' value={email}   onChange={(e)=>setEmail(e.target.value)}/>

            <Row className='mx-0'>
                <Col lg="6" md="12" className=''>
                    <div className="app2 mt-5">
                        <div className="parent1">
                            <div className="file-upload1">
                                <AddCircleOutlineRoundedIcon className='file-upload-icon' />
                                <input title={userName ? `${userName} Image` :""} accept=" image/*"  type="file"  onChange={(e)=>setImage(e.target.files![0])} />
                            </div>
                        </div>
                    </div>      
                </Col>
                <Col lg="6" md="12">
                  {type === "students" ?
                    <><label className='lable_updata_student mb-3 mt-2'>Points :</label>
                    <input title='points' type="text" className='input_updata_student' value={points}   onChange={(e)=>setPoints(Number(e.target.value))}/></>
                    :
                    <><label className='lable_updata_student mb-3 mt-2'>Specialization :</label>
                    <input title='specialization' type="text" className='input_updata_student' value={specialization}   onChange={(e)=>setSpecialization(e.target.value)}/></>
                  }

                    <label className='lable_updata_student mb-3 mt-2'>Age :</label>
                    <input title='age' type="text" className='input_updata_student' value={age}   onChange={(e)=>setAge(Number(e.target.value))}/>
                </Col>
            </Row>
            
            <label className='lable_updata_student'>Gender :</label>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={gender}
                >
                    <div className="level-container">
                        <FormControlLabel required value={1} onChange={e => setGender(1)}  control={<Radio />} label="Male" />
                        <FormControlLabel required value={0} onChange={e => setGender(0)}  control={<Radio />} label="Female" />
                    </div>
            </RadioGroup>

            </>
        </DialogContent>
        <DialogActions className='mb-2'>
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          <button type="button"  className='button-create-course' onClick={handleUpdateInfo} >
            {isPending ?"Loding..":"Edit"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
