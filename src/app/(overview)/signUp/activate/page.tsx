'use client'

import React, { useEffect, useState} from 'react';
import { useAuth } from '@/app/context/auth-context';
import "@/app/(overview)/auth.css"
import Axios from '@/app/lib/axios';
import SchoolIcon from '@mui/icons-material/School';
import IntegrationNotistack from '@/app/ui/Alert';
import { useRouter } from 'next/navigation';
import { Spinner } from 'react-bootstrap';



export default function SignUp() {

    const {user} = useAuth();
    const router = useRouter()
    const [activeCode , setActiveCode] = useState("");
    const [error , setError] = useState<string>("");
    const [message , setMessage] = useState<string>("");
    const [isPending , setPending] = useState(false);


    useEffect(() => {
        if (!user?.id) {
        router.push("/signUp");
        }
    });

    const handleActivate = async (event : React.FormEvent)=>{
        setPending(true);
        setError("")
        setMessage("")
        event.preventDefault();
        try{
            
            if(user?.role === 1){
                await Axios.post('/teacher/activate' ,{ activation_code:activeCode , id:user.id}
                    , {headers: {
                        'Content-Type': 'application/json'
                      }}
                    ).then(response =>{
                        const res = response.data;
                        if(res.success){
                            setPending(false);
                            setActiveCode("");
                            setMessage(res.message);
                            router.push("/login")
                        }else{
                            setPending(false);
                            setError(response.data.message)
                        }
                    })
            }else{
                await Axios.post('/student/activate' ,{ activation_code:activeCode , id:user?.id }
                    , {headers: {
                        'Content-Type': 'application/json'
                      }}
                    ).then(response =>{
                        const res = response.data;
                        if(res.success){
                            setPending(false);
                            setActiveCode("");
                            setMessage(res.message);
                            router.push("/login")
                        }else{
                            setPending(false);
                            setError(response.data.message)
                        }
                    })
            }
            
        }catch(e){
            setPending(false);
            setError("Something went wrong")
        }
    }


    const handleResendCode = async ()=>{
        setPending(true);
        try{
            
            if(user?.role === 1){
                await Axios.post('/teacher/resend' ,{ id:user.id , email:user.email }
                    , {headers: {
                        'Content-Type': 'application/json'
                      }}
                    ).then(response =>{
                        const res = response.data;
                        if(res.success){
                            setPending(false);
                            setMessage(res.message)
                        }else{
                            setPending(false);
                            setError(response.data.message)
                        }
                    })
            }else{
                await Axios.post('/student/resend' ,{id: user?.id, email:user?.email }
                    , {headers: {
                        'Content-Type': 'application/json'
                      }}
                    ).then(response =>{
                        const res = response.data;
                        if(res.success){
                            setPending(false);
                            setMessage(res.message);
                        }else{
                            setPending(false);
                            setError(response.data.message)
                        }
                    })
            }
            
        }catch(e){
            setPending(false);
            setError("Something went wrong")
        }
    }

    return ( 
        <>
        <div className="body">
            
            <div className="background"></div>
                <div className="card">
                    <SchoolIcon className='logo' />
                    <h2>Activate your account</h2>    
                    <form className='form' onSubmit={handleActivate}>
                    <input 
                        type="text"  
                        placeholder='Active Code'
                        value={activeCode}
                        onChange={(e)=> setActiveCode(e.target.value)}
                        required
                        autoComplete= ''
                        className='input-1'
                        />
                        
                        <button disabled ={!activeCode }>{isPending ? <Spinner animation="grow" variant="light" /> : "Activate"}</button>
                    </form>
                    {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
                    {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
                    <footer>
                        
                        resend the active code
                        <button className='resend-btn' onClick={handleResendCode}>   resend</button>
                    </footer>
                </div>
            </div>  
            
        </>
     );
}
