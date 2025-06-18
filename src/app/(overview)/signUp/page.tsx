'use client'

import React, { useState , useRef  , useEffect} from 'react';
import { useAuth } from '@/app/context/auth-context';
import "@/app/(overview)/auth.css"
import Axios from '@/app/lib/axios';
import SchoolIcon from '@mui/icons-material/School';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IntegrationNotistack from '@/app/ui/Alert';
import { Col, Row, Spinner } from 'react-bootstrap';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function SignUp() {

    const  {user ,setUser }  = useAuth();
    const router = useRouter();
    const [fullName , setFullName] = useState("");
    const [userName , setUserName] = useState("");
    const [image , setImage] = useState<File | null> (null)
    const [age , setAge] = useState ("")
    const [gender , setGender] = useState<String | null> (null)
    const [specialization , setSpecialization] = useState ("")
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [isTeacher , setIsTeacher] = useState(false);
    const [error , setError] = useState<string>("");
    const [message , setMessage] = useState<string>("");
    const [isPending , setPending] = useState(false);

    const handeleRegister = async (event : React.FormEvent)=>{
        setPending(true);
        setError("")
        setMessage("")
        event.preventDefault();
        try{
            
            if(isTeacher){
                await Axios.post('/teacher/sign-up' ,{ full_name:fullName , email:email , password:password , username:userName , gender:gender , age:age , specialization:specialization , image:image}
                    , {headers: {
                        'Content-Type': 'multipart/form-data'
                      }}
                    ).then(response =>{
                        const res = response.data;
                        if(response.data.success){
                            setUser({
                                id:res.data.id,
                                fullName: res.data.full_name,
                                userName: res.data.username,
                                token:null,
                                email: res.data.email,
                                role: 1,
                                points:null
                              });
                              
                            setPending(false);
                            setUserName("");
                            setEmail("");
                            setPassword("");
                            setFullName("");
                            setMessage(res.message)
                            router.push('/signUp/activate')
                        }else{
                            setPending(false);
                            setError(response.data.message)
                        }
                    })
            }else{
                await Axios.post('/student/sign-up' ,{ full_name:fullName , email:email , password:password , username:userName , gender:gender , age:age , specialization:specialization , image:image}
                    , {headers: {
                        'Content-Type': 'multipart/form-data'
                      }}
                    ).then(response =>{
                        const res = response.data.data;
                        if(response.data.success){
                            setUser({
                                id:res.id,
                                fullName: res.full_name,
                                userName: res.username,
                                token:null,
                                email: res.email,
                                role: 2,
                                points:res.points
                              });
                              
                            setPending(false);
                            setUserName("");
                            setEmail("");
                            setPassword("");
                            setFullName("");
                            setMessage(res.message)
                            router.push('/signUp/activate')
                        }else{
                            setPending(false);
                            setError(response.data.message)
                        }
                    })
            }
            
        }catch(e : any){
            setPending(false);
            setError(e.data.message)
        }
    }


    return ( 
        <>
        <div className="body">
            
            <div className="background"></div>
                <div className="card">
                    <SchoolIcon className='logo' />
                    <h2>Welcome</h2>    
                    <form className='form' onSubmit={handeleRegister}>
                         
                    <input 
                        type="text"  
                        placeholder='Full Name'
                        value={fullName}
                        onChange={(e)=> setFullName(e.target.value)}
                        required
                        autoComplete= ''
                        className='input-1'
                        />
                        <input 
                        type="text"  
                        placeholder='UserName'
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                        className='input-1'
                        required
                        />
                        <input 
                        type="text"  
                        placeholder='Email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className='input-1'
                        />
                        <input 
                        type="password"  
                        placeholder='Password'
                        autoComplete= ''
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        className='input-1'
                        />
                        <Row className='mx-0'>
                            <Col md='6' xs ='12'>
                                <div className="app1">
                                    <div className="parent1">
                                        <div className="file-upload1">
                                            <AddCircleOutlineRoundedIcon className='file-upload-icon' />
                                            <input title={image ?String(image.name):'image'} type="file" accept="image/*" required onChange={(e)=>{setImage(e.target.files![0])}} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md='6' xs ='12'>
                                <input 
                                    type="text"  
                                    placeholder='Specialization'
                                    autoComplete= ''
                                    value={specialization}
                                    onChange={(e)=> setSpecialization(e.target.value)}
                                    required
                                    className='input-1 mb-3'
                                />
                                <input 
                                    type="number"  
                                    placeholder='Age'
                                    autoComplete= ''
                                    value={age}
                                    onChange={(e)=> setAge(e.target.value)}
                                    required
                                    className='input-1'
                                />
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    >
                                        <div >
                                            <FormControlLabel required value="1" onChange={() => setGender("1")}  control={<Radio />} label="male" />
                                            <FormControlLabel required value="0" onChange={() => setGender("0")}  control={<Radio />} label="female" />
                                        </div>
                                </RadioGroup>
                            </Col>
                        </Row>
                            
                        <div className="container-trust-device">
                            <input
                                title="Teacher"
                                type="checkbox"
                                id='pesist'
                                className='trust-button'
                                onClick={() => setIsTeacher(!isTeacher)}
                            />
                            <label htmlFor="" className='label-trust-device'>
                                Are You Teacher
                            </label>
                        </div>
                        <button disabled ={!fullName || !userName || !email || !password || !image || !age || !specialization || !gender}>{isPending ? <Spinner animation="grow" variant="light" /> : "Sing Up"}</button>
                    </form>
                    {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
                    {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
                    <footer>
                        
                        You Already Have an Account ? LogIn
                        <Link style={{color:"rgb(245, 144, 122)"}} href={"/login"}>   here</Link>
                    </footer>
                </div>
            </div>
            
        </>
     );
}
