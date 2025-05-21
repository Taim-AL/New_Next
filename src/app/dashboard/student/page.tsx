"use client";
import Footer from "@/app/ui/Main/Footer";
import Courses from "@/app/ui/Student/Courses";
import NavbarSt from "@/app/ui/Student/NavbarStudent";
import ChatBot from "@/app/ui/Teacher/ChatBot";
import Wave from "react-wavify";

export default function StudentPage() {
  

  return (
    <>
      <NavbarSt/> 
      <Courses/>
      <ChatBot/>
      <div>
          <Wave  fill={'rgb(136,138,255)'} paused={false} options={{height:70 , amplitude:50 , speed:0.15 , points:4,}}/>          
          <Wave fill={'rgba(136, 138, 255, 0.673)'} paused={false} options={{height:70 , amplitude:35 , speed:0.20 , points:4,}} className='wave-1'/>
          <Wave fill={'rgba(136, 138, 255, 0.500)'} paused={false} options={{height:70 , amplitude:40 , speed:0.25 , points:4,}} className='wave-1'/>
      </div>
      <Footer/>
      
    </>
  )
}
