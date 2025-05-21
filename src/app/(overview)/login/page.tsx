'use client';

import React, { useState } from 'react';
import "@/app/(overview)/auth.css"
import SchoolIcon from '@mui/icons-material/School';
import Axios from '@/app/lib/axios';
import { useAuth } from '@/app/context/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Spinner } from 'react-bootstrap';
import IntegrationNotistack from '@/app/ui/Alert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Login() {
    const router = useRouter();
    const { setUser } = useAuth();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error , setError] = useState<string>("");
    const [message , setMessage] = useState<string>("");
    const [isTeacher , setIsTeacher] = useState(false);
    const [isPending, setPending] = useState(false);


    const handelLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setPending(true);
        setError("")
        setMessage("")
        try {
            if(isTeacher){
                await Axios.post('/teacher/login',
                    { username: userName, password: password },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).then(response => {
                    console.log( "response login :",response)
                    if (response.data.success === true) {
                        setMessage(response.data.message)
                        const accessToken = response.data.data.token;
                        localStorage.setItem('token' , accessToken);
                        localStorage.setItem('id' , response?.data?.data?.id);
                        localStorage.setItem('role' , String(1));
                        localStorage.setItem('image' , response?.data?.data?.image );
                        setUser({
                            id:response?.data?.data?.id,
                            fullName:response?.data?.data?.full_name,
                            userName: response?.data?.data?.username,
                            email: response?.data?.data?.email,
                            token:accessToken,
                            role: 1,
                            points : null,
                          });
                        setPending(false);
                        setUserName("");
                        setPassword("");
                        setError("");
                        setMessage("")
                        router.push('/dashboard/teacher');
                    } else {
                        setPending(false);
                        setError(response.data.message)
                    }
                })
            }else{
                await Axios.post('/student/login',
                    { username: userName, password: password },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).then(response => {
                    console.log(response)
                    if (response.data.success === true) {
                        const accessToken = response?.data?.data?.token;
                        localStorage.setItem('id' , response?.data?.data?.id);
                        localStorage.setItem('role' , String(2));
                        localStorage.setItem('token' , accessToken);
                        localStorage.setItem('image' , response?.data?.data?.image );
                        localStorage.setItem('points' , response?.data?.data?.points );
                        setUser({
                            id:response?.data?.data?.id,
                            fullName:response?.data?.data?.full_name,
                            userName: response?.data?.data?.username,
                            email: response?.data?.data?.email,
                            token:accessToken,
                            role: 2 ,
                            points : response?.data?.data?.points,
                          });
                        setPending(false);
                        setUserName("");
                        setPassword("");
                        router.push('/dashboard/student');
                    } else {
                        setPending(false);
                        setError(response.data.message)
                    }
                })
            }
            

        } catch (e) {
            setPending(false);
            setError("Something went wrong")
            console.log(e)
        }
}

    return (
        <>
                <div className="body">
                    <div className="background"></div>
                    <div className="card">
                        <SchoolIcon className='logo' />
                        <h2>Welcome Back</h2>
                        <form className='form' onSubmit={handelLogin}>
                            <input
                                type="text"
                                value={userName}
                                autoComplete='off'
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder='User Name'
                                className='input-1'
                                required />

                            <input
                                type="password"
                                value={password}
                                autoComplete='off'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='input-1'
                                required />
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
                            <button disabled={!userName|| !password}>{isPending ?<Spinner animation="grow" variant="light" />:"Login"}</button>
                        </form>
                        {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
                        {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
                        <footer>
                            Create New Accounte ?
                            <Link style={{ color: "rgb(245, 144, 122)" }} href={"/signUp"}>   here</Link>
                        </footer>
                    </div>
                </div>
                <Link href={`/adminLogin`} className="admin-login">
                    {/* <ArrowForwardIosIcon className="go_back_icon" /> */}
                    Admin
                </Link>
        </>
    );
}

export default Login;