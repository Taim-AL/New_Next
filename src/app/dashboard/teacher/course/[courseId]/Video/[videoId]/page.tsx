"use client";
import Axios from "@/app/lib/axios";
import { BaseUrl, ProfileUrl, QuestionVideoResponse, ThumbnailUrl, VideoResponse, VideoResponseStudent, VideoUrl } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/app/ui/Assets/Css/teacher/VideoPage.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";

export default function VideoPage() {
    const params = useParams();
    // const token = useAuth();
    const videoId = params.videoId as string;
    const courseId = params.courseId as string;
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [responseVideo , setResponseVideo] = useState<VideoResponse | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<QuestionVideoResponse | null>(null);
    const [answeredTimes, setAnsweredTimes] = useState<number[]>([]);
    const [selectedLang, setSelectedLang] = useState("ar"); // اللغة الافتراضية
    const currentQuestionRef = useRef<QuestionVideoResponse | null>(null);
    const answeredTimesRef = useRef<number[]>([]);
    const audioSrc =` ${ProfileUrl}aud.mp3`;
    const audioSrc2 = `${ProfileUrl}aud2.mp3`;
    const subtitleSrc = `${ProfileUrl}sub.vtt`;
    const [subtitleUrl, setSubtitleUrl] = useState<string | null>(null);


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
  
      if (answer === currentQuestion.choices[1].choice) {
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
  


  useEffect(()=>{
        try{
            Axios.get(`teacher/course-video`,{params:{course_id: params.courseId, video_id: videoId}}).then(response =>{
                if(response.data.success === true){
                  console.log(response)
                  setResponseVideo(response.data.data);
                  
                }
              })}catch(error){
            console.log(error)
            }
        },[])


        useEffect(() => {
  async function fetchSubtitle() {
    try {
      const res = await Axios.get(`teacher/get-subtitles/${videoId}/ar`);
      console.log("subTitle Res :" , res.data)
      // if (!res.ok) throw new Error("فشل تحميل الترجمة");

      const blob =new Blob([res.data], { type: 'text/vtt' });
      const blobUrl = URL.createObjectURL(blob);
      setSubtitleUrl(blobUrl); // تخزن رابط blob مؤقت
      console.log(subtitleUrl)
    } catch (error) {
      console.error("خطأ في تحميل الترجمة:", error);
    }
  }

  fetchSubtitle();
}, []);



    function timeStringToSeconds(timeString: string): number {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }

    

  return (
    <>
    {responseVideo?
    <>
    <div className="outer-container-sp">
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
           >
              <track
                label="Arabic"
              kind="subtitles"
              srcLang="ar"
              src={subtitleUrl? subtitleUrl :"bla bla "}
                className="subtitles_container"
                default
              />
            </video>
          </div>
        </div>
      </div>
<audio ref={audioRef} src={selectedLang === "ar" ? audioSrc : audioSrc2} />
      <div className="d-flex justify-content-center align-items-center w-100 ">
      <select title="lang" className="custom-select" onChange={(e) => setSelectedLang(e.target.value)} value={selectedLang}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
        </select>
      </div>

      {currentQuestion && (
        <div className="question-overlay">
        <div className="question-box">
          <h2 className="question-text">{currentQuestion.question}</h2>
          <div className="choices-container">
            {currentQuestion.choices.map((opt,i) => (
              <button
                title="option"
                key={i}
                onClick={() => handleAnswer(opt.choice)}
                className="choice-button"
              >
                {opt.choice}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      )}
        <Link href={`/dashboard/teacher/course/${courseId}`} className="go_back_button">
          <ArrowForwardIosIcon className="go_back_icon" />
        </Link>
    </div>  
    
    
    
    </>
    :"Loading...."}
    </>
  );
}