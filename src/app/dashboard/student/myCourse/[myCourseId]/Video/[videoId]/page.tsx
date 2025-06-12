"use client";
import Axios from "@/app/lib/axios";
import { BaseUrl, ProfileUrl, QuestionVideoResponse, QuestionVideoResponseStudent, ThumbnailUrl, VideoResponse, VideoResponseStudent, VideoUrl } from "@/app/lib/definitions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/app/ui/Assets/Css/student/VideoPage.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import IntegrationNotistack from "@/app/ui/Alert";
import ChatBot from "@/app/ui/Teacher/ChatBot";

export default function VideoPage() {
    const params = useParams();
    const videoId = params.videoId as string;
    const courseId = params.myCourseId as string;
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [responseVideo , setResponseVideo] = useState<VideoResponseStudent | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<QuestionVideoResponseStudent | null>(null);
    const [answeredTimes, setAnsweredTimes] = useState<number[]>([]);
    const [selectedLang, setSelectedLang] = useState("ar"); // اللغة الافتراضية
    const currentQuestionRef = useRef<QuestionVideoResponseStudent | null>(null);
    const answeredTimesRef = useRef<number[]>([]);
    const audioSrc =` ${ProfileUrl}aud.mp3`;
    const audioSrc2 = `${ProfileUrl}aud2.mp3`;
    const subtitleSrc = `/media/subs-${selectedLang}.vtt`;
    const [message , setMessage] =useState<string>("");
    const [error , setError] =useState<string>("");
    const router = useRouter();

    useEffect(() => {
      currentQuestionRef.current = currentQuestion;
      const video = videoRef.current;
      if (document.fullscreenElement && currentQuestionRef.current) {
        document.exitFullscreen();
        video?.pause();
        alert("يجب الإجابة على السؤال قبل متابعة الفيديو!");
      }
    }, [currentQuestion]);
    
    useEffect(() => {
      answeredTimesRef.current = answeredTimes;
    }, [answeredTimes]);
    


    useEffect(() => {
      if (!responseVideo) return;

      const video = videoRef.current;
      const audio = audioRef.current;

      if (!video || !audio) return;
    
      const handlePlay = () => audio.play();
      const handlePause = () => audio.pause();
      const handleSeek = () => {
        audio.currentTime = video.currentTime;
      };
    
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;
      
        if (!responseVideo) return;
      
        
      
        const alreadyAnswered = answeredTimesRef.current.some((t) => Math.abs(t - currentTime) < 1);
        const isShowingQuestion = !!currentQuestionRef.current;
      
        const question = responseVideo.questions.find((q) => {
          const appearTime = timeStringToSeconds(q.time_to_appear);
          return Math.abs(currentTime - appearTime) < 0.5;
        });
      
      
        if (!isShowingQuestion && question && !alreadyAnswered) {
          video.pause();
          audio.pause();
          setCurrentQuestion(question);
        }
      };
      
      
    
      // 🔒 نضيف المستمعين مرة واحدة فقط
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("seeking", handleSeek);
      video.addEventListener("timeupdate", handleTimeUpdate);
    
      // 🧼 تنظيف عند الخروج
      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("seeking", handleSeek);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [responseVideo]); // ✅ لاحظ: فقط عند أول تحميل
    
  
    const handleAnswer = (answer: string) => {
      if (!currentQuestion) return;
  
      if (answer === currentQuestion.choices[1].text) {
        setAnsweredTimes((prev) => [...prev, timeStringToSeconds(currentQuestion.time_to_appear)]);
        setCurrentQuestion(null);
        videoRef.current?.play();
        audioRef.current?.play();
      } else {
        alert("إجابة خاطئة! حاول مرة أخرى.");
      }
    };
      


  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
  
    if (!video || !audio) return;
  
    // اختر الملف حسب اللغة
    if (selectedLang === "ar") {
      audio.src = audioSrc;
    } else {
      audio.src = audioSrc2;
    }
  
    // إعادة تزامن الوقت بدون تشغيل مباشر
    // audio.load();
    audio.currentTime = 0;
    video.currentTime = 0;

  
    // ننتظر التحميل الكامل قبل التشغيل
    const handleCanPlay = () => {
      if (!video.paused) {
        audio.play().catch((err) => {
          console.error("خطأ في تشغيل الصوت بعد التحميل:", err);
        });
      }
    };
  
    // عند تحميل الصوت بشكل كافٍ للتشغيل
    audio.addEventListener("canplay", handleCanPlay);
  
    // تحميل الملف
    audio.load();
  
    // تنظيف الحدث عند انتهاء useEffect أو تغيير اللغة مرة ثانية
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [selectedLang]);
  
  useEffect(() => {
    const video = videoRef.current;
  
    const handleFullscreen = () => {
      if (document.fullscreenElement && currentQuestionRef.current) {
        document.exitFullscreen();
        video?.pause();
        alert("يجب الإجابة على السؤال قبل متابعة الفيديو!");
      }
    };
  
    document.addEventListener("fullscreenchange", handleFullscreen);
  
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, [currentQuestion]);
  
  const handleMarkAsWatched =async ()=>{
    try{
      const response = await Axios.post(`student/mark-content-as-done`,{},{params:{id:videoId , type:"video"}})
      console.log("mark-content-as-done :",response)
              if( response.data.success === true){
                setMessage(response.data.message)
                router.push(`/dashboard/student/myCourse/${courseId}`);
              }else{
                setError(response.data.message)
                router.push(`/dashboard/student/myCourse/${courseId}`);
              }
    
          }catch(e : any){
            console.log(e)
            // setIsPending(null)
            setError(e.data.message)
          }
  }

  useEffect(()=>{
        try{
            Axios.get(`student/watch-video/${videoId}`).then(response =>{
                if(response.data.success === true){
                  console.log(response)
                  setResponseVideo(response.data.data);
                  
                }
              })}catch(error){
            console.log(error)
            }
        },[])


    function timeStringToSeconds(timeString: string): number {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }

  return (
    <>
    {responseVideo?
    <>
    <div className="outer-container-video-st">
      <div className="d-flex justify-content-center align-items-center w-100 mt-3">
        <div className='outer-container-show-video '>
          <div className="outer-videio-component">
           <video 
           ref={videoRef} 
           src={`${BaseUrl}/uploads/${responseVideo.path}`}
           poster={`${responseVideo.image}`} 
           controls={!currentQuestion}  
           disablePictureInPicture     
           controlsList="nodownload"
           className="video_player"
           onEnded={handleMarkAsWatched}
           >
              <track
                key={selectedLang}
                label={selectedLang.toUpperCase()}
                kind="subtitles"
                srcLang={selectedLang}
                src={subtitleSrc}
              />
            </video>
          </div>
        </div>
      </div>
<audio ref={audioRef} src={selectedLang === "ar" ? audioSrc : audioSrc2} />
      <div className="d-flex justify-content-center align-items-center w-100 mt-3">
      <select title="lang" className="custom-select" onChange={(e) => setSelectedLang(e.target.value)} value={selectedLang}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
        </select>
      </div>

      {currentQuestion && (
        <div className="question-overlay">
        <div className="question-box">
          <h2 className="question-text">{currentQuestion.question_text}</h2>
          <div className="choices-container">
            {currentQuestion.choices.map((opt , index) => (
              <button
                title="option"
                key={index}
                onClick={() => handleAnswer(opt.text)}
                className="choice-button"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      )}
        <Link href={`/dashboard/student/myCourse/${courseId}`} className="go_back_button_video_st">
          <ArrowForwardIosIcon className="go_back_icon" />
        </Link>

        <ChatBot video_id={String(videoId)}/>
    </div>
    
    
    
    </>
    :"Loading...."}
    {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
    {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </>
  );
}