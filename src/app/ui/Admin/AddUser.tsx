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
import AddIcon from '@mui/icons-material/Add';

export default function AddUser({type, refresh , onChange}:{type : string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = React.useState(false);
  const [fullName , setFullName] = React.useState<string>("");
  const [userName , setUserName] = React.useState<string>("");
  const [email , setEmail] = React.useState<string>("");
  const [specialization , setSpecialization] = React.useState<string>("");
  const [age , setAge] = React.useState<number>(0);
  const [gender , setGender] = React.useState<number>(0);
  const [points , setPoints] = React.useState<number>(0);
  const [password , setPassword] = React.useState<string>("")
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
    setFullName("")
    setUserName("")
    setEmail("")
    setAge(0)
    setGender(0)
    setPoints(0)
    setPassword("")
    setOpen(false)
  };

    const handleCreateUser =async (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setIsPending(true)
        setError("")
        setMessage("")
      try{
      const response = await Axios.post(`admin/${type}`,{password:password , full_name:fullName ,email:email ,username:userName , age:age ,image:image ,gender:gender ,points:points , specialization : specialization}
        , {headers: {
          'Content-Type': 'multipart/form-data'
        }})
              console.log( "response Add Student :",response)
              setIsPending(false)
                setMessage(response.data.message)
                setImage(null)
                setFullName("")
                setUserName("")
                setEmail("")
                setAge(0)
                setGender(0)
                setPoints(0)
                setSpecialization("")
                setPassword("")
                setOpen(false)
                onChange(!refresh)
          }catch(e : any){
            console.log(e)
            setIsPending(false)
            setError(e.data.message)
          }
        }

  return (
    
    <React.Fragment>
       <button title="Add student" type="button" className="add_user_button shadow "  onClick={handleClickOpen}>
            <AddIcon className="add_user_icon"/>
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
            <label className='lable_updata_student mb-3 mt-2'>Full Name :</label>
            <input title='Full name' type="text" className='input_updata_student' value={fullName}   onChange={(e)=>setFullName(e.target.value)}/>
            
            <label className='lable_updata_student mb-3 mt-2'>User Name :</label>
            <input title='User Name' type="text" className='input_updata_student' value={userName}   onChange={(e)=>setUserName(e.target.value)}/>

            <label className='lable_updata_student mb-3 mt-2'>Email :</label>
            <input title='Email' type="email" className='input_updata_student' value={email}   onChange={(e)=>setEmail(e.target.value)}/>

            <label className='lable_updata_student mb-3 mt-2'>Password :</label>
            <input title='password' type="password" className='input_updata_student' value={password}  required onChange={(e)=>setPassword(e.target.value)}/>
            
            <Row className='mx-0'>
                <Col lg="6" md="12" className=''>
                    <div className="app2 mt-5">
                        <div className="parent1">
                            <div className="file-upload1">
                                <AddCircleOutlineRoundedIcon className='file-upload-icon' />
                                <input title={userName ? `${userName} Image` :"profile image"} accept=" image/*"  type="file"  onChange={(e)=>setImage(e.target.files![0])} />
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
          <button type="button"  className='button-create-course' onClick={handleCreateUser} >
            {isPending ?"Loding..":"Create"}
          </button>
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
