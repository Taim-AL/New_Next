"use client";
import Axios from "@/app/lib/axios";
import { ProfileUrl, UserType } from "@/app/lib/definitions";
import "@/app/ui/Assets/Css/teacher/Profile.css"
import UpdateProfile from "@/app/ui/Teacher/UpdateProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Skeleton, Stack } from "@mui/material";

export default function ProfilePage() {
  
  const [user, setUser] = useState<UserType | null>(null);
  const [refresh , setRefresh] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
      setHasMounted(true);
    }, []);


  useEffect(()=>{
          const getProfile = async()=>{
              await Axios.get(`/teacher/profile`).then(response =>{
                  const res=response.data
                  if(res.success){
                      setUser(res.data);
                  }
              })
                
          }
       
          getProfile();
        },[refresh])

  return (
    <>
    {user ? <div className="profile-page">
      <div className="profile-card">
      {hasMounted &&
      <Image
          src={ user.image ?String(ProfileUrl+user.image):""}
          width={150}
          height={150}
          alt="Profile"
          className="profile-image"
        />}
        <h2 className="profile-username">{user.username}</h2>
        <p className="profile-email">{user.email}</p>
        <div className="profile-info">
          <div><span >Gender :</span> {user.gender===1 ? "Male" : "Female"}</div>
          <div><span >Age :</span> {user.age} Year</div>
          <div><span >Specilization :</span> {user.specialization}</div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <UpdateProfile url="teacher/update-profile" refresh={refresh} onChange={setRefresh}/>
        </div>
      </div>
    </div> :
    
    
    <div className="profile-page">
      <div className="profile-card">
        <Stack spacing={1} className=" p-2 h-100">
          <div className="d-flex justify-content-center" >
            <Skeleton variant="circular" width={100}  height={100}  sx={{ bgcolor: '#f2f6fd' }}/>
          </div>
            <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </Stack>
      </div>
    </div>
    
    }
    <Link href={`/dashboard/teacher`} className="go_back_button">
      <ArrowForwardIosIcon className="go_back_icon" />
    </Link>
    </>
  );
}
