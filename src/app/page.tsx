"use client"
import ChatBot from "./ui/Main/ChatBot";
import Footer from "./ui/Main/Footer";
import OuterNav from "./ui/Main/OuterNav";
import Waves from "./ui/Main/WavesSection";

export default function Home() {
  return (
    <>
      <OuterNav/>
      <ChatBot/>
      <Waves/>
      <Footer/>
    </>
    
  );
}
