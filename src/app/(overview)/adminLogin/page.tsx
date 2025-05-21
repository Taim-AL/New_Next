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


function page() {
    const router = useRouter();
    const { setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error , setError] = useState<string>("");
    const [message , setMessage] = useState<string>("");
    const [isPending, setPending] = useState(false);


    const handelLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setPending(true);
        setError("")
        setMessage("")
        try {
                await Axios.post('/admin/login',
                    { email: email, password: password },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).then(response => {
                    console.log(response)
                    if (response.data.success === true) {
                        const accessToken = response?.data?.data?.token;
                        localStorage.setItem('id' , response?.data?.data?.id);
                        localStorage.setItem('role' , String(3));
                        localStorage.setItem('token' , accessToken);
                        localStorage.setItem('image' , response?.data?.data?.image );
                        localStorage.setItem('points' , response?.data?.data?.points );
                        setUser({
                            id:response?.data?.data?.id,
                            fullName:response?.data?.data?.full_name,
                            userName: response?.data?.data?.username,
                            email: response?.data?.data?.email,
                            token:accessToken,
                            role: 3 ,
                            points : response?.data?.data?.points,
                          });
                        setPending(false);
                        setEmail("");
                        setPassword("");
                        router.push('/dashboard/admin/students');
                    } else {
                        setPending(false);
                        setError(response.data.message)
                    }
                })
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
                                type="email"
                                value={email}
                                autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
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
                            <button>{isPending ?<Spinner animation="grow" variant="light" />:"Login"}</button>
                        </form>
                        {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
                        {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
                    </div>
                </div>
                <Link href={`/login`} className="admin-login">
                    <ArrowForwardIosIcon className="go_back_icon" />
                </Link>
        </>
    );
}

export default page;