"use client";
import Axios from "@/app/lib/axios";
import { BaseUrl, ProfileUrl, QuestionVideoResponse, ThumbnailUrl, VideoResponse, VideoResponseStudent, VideoUrl } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/app/ui/Assets/Css/teacher/VideoPage.css"
import "@/app/ui/Assets/Css/student/VideoPage.css"
import "@/app/ui/Assets/Css/teacher/CoursePage2.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";
import { Skeleton, Stack } from "@mui/material";
import { Col, Row } from "react-bootstrap";

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
    const [selectedLang, setSelectedLang] = useState("en"); // اللغة الافتراضية
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [scripts , setScripts] = useState<{language: string ; script_path : string} []| null>(null)
    const currentQuestionRef = useRef<QuestionVideoResponse | null>(null);
    const answeredTimesRef = useRef<number[]>([]);
    const audioSrc =` ${ProfileUrl}aud.mp3`;
    const audioSrc2 = `${ProfileUrl}aud2.mp3`;
    const subtitleSrc = `${ProfileUrl}sub.vtt`;
    const [subtitleUrl, setSubtitleUrl] = useState<string | null>(null);
    const [audios , setAudios] = useState<{src : string ; lang :string}[]>([]);
    const [audioSrc3 , setAudioSrc] = useState<string | null>(null);
    const [RealAudioSrc , setRealAudioSrc] = useState<string | null>(null);
    const [showContinue, setShowContinue] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);


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
      if (!currentQuestion || selectedAnswer) return; // منع التكرار

      setSelectedAnswer(answer);

      const selectedChoice = currentQuestion.choices.find(
        (c) => c.choice === answer
      );

      if (selectedChoice?.is_correct === 1) {
        setIsCorrect(true);
        setShowContinue(true); // نعرض زر "متابعة"
      } else {
        setIsCorrect(false);
        setShowContinue(true);
      }
    };


    const handleContinue = () => {
      if(currentQuestion){
        setAnsweredTimes((prev) => [
        ...prev,
        timeStringToSeconds(currentQuestion.time_to_appear),
      ]);
      }
      
      setCurrentQuestion(null);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowContinue(false);
      videoRef.current?.play();
      audioRef.current?.play();
    };
      


  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
  
    if (!video || !audio) return;
  
    // اختر الملف حسب اللغة
    if (audioSrc3) {
      audio.src = String(audioSrc3);
    } else {
      audio.src = String(RealAudioSrc);
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
  }, [selectedLang , audioSrc3]);
  
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
                  setScripts(response.data.data.scripts);
                  setRealAudioSrc(response.data.data.audios[0].path)

                  const parseLangFromUrl = (url: string): string | null => {
                    const match = url.match(/_([a-z]{2})\.mp3$/);
                    return match ? match[1] : null;
                  };

                  const parsedAudios = response.data.data.audios.map((url : {created_at: string ; id: number; path: string}) => {
                    const lang = parseLangFromUrl(url.path);
                    return lang ? { src: url.path, lang } : null;
                  }).filter(Boolean) as { src: string; lang: string }[];

                  setAudios(parsedAudios);  
                }
              })}catch(error){
            console.log(error)
            }
        },[])

    // useEffect(()=>{
    //       try{
    //           Axios.get(`teacher/get-video-audio/${videoId}`).then(response =>{
    //               if(response.data.success === true){
    //                 const parseLangFromUrl = (url: string): string | null => {
    //                 const match = url.match(/_([a-z]{2})\.mp3$/);
    //                 return match ? match[1] : null;
    //               };

    //               const parsedAudios = response.data.meta.audios.map((url : {created_at: string ; id: number; path: string}) => {
    //                 const lang = parseLangFromUrl(url.path);
    //                 return lang ? { src: url, lang } : null;
    //               }).filter(Boolean) as { src: string; lang: string }[];

    //               setAudios(parsedAudios);

    //                 console.log("الدوبلاج :",response)
    //                 console.log("الدوبلاج 2:",audios)
    //               }
    //             })}catch(error){
    //           console.log(error)
    //           }
    //       },[])


        useEffect(()=>{
          console.log("الدوبلاج 2:",audioSrc3)
          console.log("الدوبلاج :",audios)
          if(audios.length>0){
            audios.map((e)=>{
              if(selectedLang === e.lang){
                setAudioSrc(e.src)
              }
            })
          }
          },[audios , selectedLang])


        useEffect(() => {
        async function fetchSubtitle() {
          try {
            const res = await Axios.get(`teacher/get-subtitles/${videoId}/${selectedLang}`);
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
      }, [selectedLang]);



    function timeStringToSeconds(timeString: string): number {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }

    

  return (
    <>
    {responseVideo  ?
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
<audio ref={audioRef} src={audioSrc3 ? audioSrc3 : String(RealAudioSrc)} />
      <div className="d-flex justify-content-center align-items-center w-100 ">
      <select title="lang" className="custom-select" onChange={(e) => setSelectedLang(e.target.value)} value={selectedLang}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
            <option value="fr">French</option>
        </select>
      </div>

      <div style={{padding:"5rem"}}>
        <Row className="mx-0">
          {scripts ?
          scripts.map((e,i)=>{
        return(
          <Col lg="6" md="12" key={i} className="p-2 d-flex align-items-stretch  mt-3">
            <div className="scripts_container shadow">
            <h5>{e.language === "ar" ?"النص العربي ":e.language === "en" || e.language === "English" ? "the English text" : "le texte français"}</h5>
            <p>{e.script_path}</p>
            </div>
          </Col>
        )
          })
          :""}
          
        </Row>
      </div>

      {currentQuestion && (
  <div className="question-overlay">
    <div className="question-box">
      <h2 className="question-text">{currentQuestion.question}</h2>
      <div className="choices-container">
        {currentQuestion.choices.map((opt, index) => {
          const isSelected = selectedAnswer === opt.choice;
          const correct = opt.is_correct === 1;

          let buttonClass = "choice-button";
          if (selectedAnswer) {
            if (correct) buttonClass += " correct";
            else if (isSelected && !correct) buttonClass += " wrong";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(opt.choice)}
              disabled={!!selectedAnswer} // تعطيل بعد الاختيار
              className={buttonClass}
            >
              {opt.choice}
            </button>
          );
        })}

        {showContinue && (
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      )}
      </div>
    </div>
  </div>
)}
        <Link href={`/dashboard/teacher/course/${courseId}`} className="go_back_button_video_st">
                  <ArrowForwardIosIcon className="go_back_icon" />
                </Link>
    </div>  
    
    
    
    </>
    :
    <div className="outer-container-sp">
      <div className="d-flex justify-content-center align-items-center w-100 mt-3">
        <div className='outer-container-show-video '>
          <div className="outer-videio-component">
              <div className="outer-card shadow">
              <Stack spacing={1} className=" p-2 h-100">
                  <Skeleton variant="rounded"  height={300} width={750}  sx={{ bgcolor: '#f2f6fd' }}/>
              {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
                  
              </Stack>
              </div>
      </div>
      </div>
      </div>
      </div>
    
    }
    </>
  );
}