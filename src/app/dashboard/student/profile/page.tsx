"use client";
import Axios from "@/app/lib/axios";
import {  UserType } from "@/app/lib/definitions";
import "@/app/ui/Assets/Css/teacher/Profile.css"
import UpdateProfile from "@/app/ui/Teacher/UpdateProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ProfilePage() {
  
  const [user, setUser] = useState<UserType | null>(null);
  const [refresh , setRefresh] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
      setHasMounted(true);
    }, []);


  useEffect(()=>{
          const getProfile = async()=>{
              await Axios.get(`/student/profile`).then(response =>{
                  const res=response.data
                  console.log("profile :" , response)
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
          src={ user.image ?String(user.image):""}
          width={150}
          height={150}
          alt="Profile"
          className="profile-image"
        />}
        <h2 className="profile-username">{user.username}</h2>
        <p className="profile-email">{user.email}</p>
        <div className="profile-info">
          <div><span >Is Active : </span> {user.admin_activation ? "Yes" : "No"}</div>
          <div><span >Gender :</span> {user.gender===1 ? "Male" : "Female"}</div>
          <div><span >Age :</span> {user.age} Year</div>
          <div><span >Points :</span> {user.points}</div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <UpdateProfile url="student/profile/update" refresh={refresh} onChange={setRefresh}/>
        </div>
      </div>
    </div> :""}
    <Link href={`/dashboard/student`} className="go_back_button">
      <ArrowForwardIosIcon className="go_back_icon" />
    </Link>
    </>
  );
}
