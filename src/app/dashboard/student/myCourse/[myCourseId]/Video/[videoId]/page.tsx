"use client";
import Axios from "@/app/lib/axios";
import { BaseUrl, ProfileUrl, QuestionVideoResponseStudent, ThumbnailUrl, VideoOrQuiz, VideoResponse, VideoResponseStudent, VideoUrl } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/app/ui/Assets/Css/student/VideoPage.css"
import "@/app/ui/Assets/Css/teacher/CoursePage2.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import IntegrationNotistack from "@/app/ui/Alert";
import ChatBot from "@/app/ui/Teacher/ChatBot";
import { setRef, Skeleton, Stack } from "@mui/material";
import styles from "./Sidebar.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LockIcon from '@mui/icons-material/Lock';
import QuizIcon from '@mui/icons-material/Quiz';
import { Col, Row } from "react-bootstrap";
import QuizPageAndSolve from "@/app/ui/Student/QuizPageAndSolve";

export default function VideoPage() {
    const params = useParams();
    const videoId = params.videoId as string;
    const courseId = params.myCourseId as string;
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [responseVideo , setResponseVideo] = useState<VideoResponseStudent | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<QuestionVideoResponseStudent | null>(null);
    const [courseContent , setCourseContent] = useState<VideoOrQuiz []| null>(null)
    const [scripts , setScripts] = useState<{language: string ; script_path : string} []| null>(null)
    const [answeredTimes, setAnsweredTimes] = useState<number[]>([]);
    const [selectedLang, setSelectedLang] = useState("en"); // اللغة الافتراضية
    const currentQuestionRef = useRef<QuestionVideoResponseStudent | null>(null);
    const answeredTimesRef = useRef<number[]>([]);
    const [audios , setAudios] = useState<{src : string ; lang :string}[]>([]);
    const [audioSrc3 , setAudioSrc] = useState<string | null>(null);
    const [RealAudioSrc , setRealAudioSrc] = useState<string | null>(null);
    const [message , setMessage] =useState<string>("");
    const [error , setError] =useState<string>("");
    const [subtitleUrl, setSubtitleUrl] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showContinue, setShowContinue] = useState(false);

    useEffect(() => {
      currentQuestionRef.current = currentQuestion;
      const video = videoRef.current;
      if (document.fullscreenElement && currentQuestionRef.current) {
        document.exitFullscreen();
        video?.pause();
        alert("Please answer the question before proceeding with the video");
      }
    }, [currentQuestion]);
    
    useEffect(() => {
      answeredTimesRef.current = answeredTimes;
    }, [answeredTimes]);
    

    useEffect(()=>{
          try{
              Axios.get(`/student/get-course/${courseId}`).then(response =>{
                  console.log("Course Details :",response)
                  if(response.data.success === true){
                    setCourseContent(response.data.data.videosAndQuiz)
                    
                  }
              })}catch(error){
              console.log(error)
              }
          },[refresh])


      useEffect(()=>{
      try{
          Axios.get(`/student/get-video-audio/${videoId}`).then(response =>{
              console.log("get-video-audio :",response)
              
          })}catch(error){
          console.log(error)
          }
      },[])

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
    
  
    // const handleAnswer = (answer: string) => {
    //   if (!currentQuestion) return;
  
    //   if (answer === currentQuestion.choices[1].text) {
    //     setAnsweredTimes((prev) => [...prev, timeStringToSeconds(currentQuestion.time_to_appear)]);
    //     setCurrentQuestion(null);
    //     videoRef.current?.play();
    //     audioRef.current?.play();
    //   } else {
    //     alert("That’s not the correct answer");
    //   }
    // };
      
    const handleAnswer = (answer: string) => {
      if (!currentQuestion || selectedAnswer) return; // منع التكرار

      setSelectedAnswer(answer);

      const selectedChoice = currentQuestion.choices.find(
        (c) => c.text === answer
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
  }, [selectedLang]);
  
  useEffect(() => {
    const video = videoRef.current;
  
    const handleFullscreen = () => {
      if (document.fullscreenElement && currentQuestionRef.current) {
        document.exitFullscreen();
        video?.pause();
        alert("Please answer the question before proceeding with the video");
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
                setRefresh(!refresh)
                setMessage(response.data.message)
                setOpen(true)
              }else{
                setRefresh(!refresh)
                setError(response.data.message)
                setOpen(true)

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


        // useEffect(() => {
        //         async function fetchSubtitle() {
        //           try {
        //             const res = await Axios.get(`student/get-subtitles/${videoId}/${selectedLang}`);
        //             console.log("subTitle Res :" , res.data)
        //             // if (!res.ok) throw new Error("فشل تحميل الترجمة");
        
        //             const blob =new Blob([res.data], { type: 'text/vtt' });
        //             const blobUrl = URL.createObjectURL(blob);
        //             setSubtitleUrl(blobUrl); // تخزن رابط blob مؤقت
        //             console.log(subtitleUrl)
        //           } catch (error) {
        //             console.error("خطأ في تحميل الترجمة:", error);
        //           }
        //         }
        
        //         fetchSubtitle();
        //       }, [selectedLang]);

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
                label={selectedLang}
              kind="subtitles"
              srcLang={selectedLang}
              src={subtitleUrl? subtitleUrl :"bla bla "}
                className="subtitles_container"
                default
              />
            </video>
          </div>
        </div>
      </div>
<audio ref={audioRef} src={audioSrc3 ? audioSrc3 : String(RealAudioSrc)}/>
      <div className="d-flex justify-content-center align-items-center w-100 mt-3">
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
      <h2 className="question-text">{currentQuestion.question_text}</h2>
      <div className="choices-container">
        {currentQuestion.choices.map((opt, index) => {
          const isSelected = selectedAnswer === opt.text;
          const correct = opt.is_correct === 1;

          let buttonClass = "choice-button";
          if (selectedAnswer) {
            if (correct) buttonClass += " correct";
            else if (isSelected && !correct) buttonClass += " wrong";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(opt.text)}
              disabled={!!selectedAnswer} // تعطيل بعد الاختيار
              className={buttonClass}
            >
              {opt.text}
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
        <Link href={`/dashboard/student/myCourse/${courseId}`} className="go_back_button_video_st">
          <ArrowForwardIosIcon className="go_back_icon" />
        </Link>

        <ChatBot video_id={String(videoId)}/>
    </div>
    
    

      {
        courseContent?
        <>
            <button
            className={styles.sideButton}
            onClick={() => setOpen(!open)}
          >
            🎬 
          </button>

          <div className={`${styles.sidebar_content} ${open ? styles.open : ""}`}>
            <div className={styles.header}>
              <h3>Upcoming Activities</h3>
              <button className={styles.close_chat_button} onClick={() => setOpen(false)}>✖</button>
            </div>
            <div className={styles.chatContent}>
                  <ul className={styles.list}>
                    {courseContent.map((item, index) => (
                      <li key={index} className={String(item.id) === videoId ? styles.item_active :styles.item}>
                        {
                          item.type === 'video'?
                          <>
                          <Accordion className="mb-3">
                            <AccordionSummary
                            expandIcon={<ArrowDownwardIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            <Typography component="span">
                                <SmartDisplayIcon className="contenet_icon"/>
                                {item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography className="d-flex justify-content-between">
                                    <span>{item.description}</span>
                                    {Boolean(item.is_locked) ?
                                        <LockIcon className="icon_arrow" />
                                    :
                                    <Link href={`/dashboard/student/myCourse/${courseId}/Video/${item.id}`} className="link_content_card">
                                        <ArrowForwardIosIcon className="icon_arrow" />
                                    </Link> }
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                          
                          </>
                          
                          :
                          
                          <>
                          <div className="quiz_card w-100">
                                <div className="d-flex justify-content-between w-100">
                                    <Typography component="span">
                                    <QuizIcon className="contenet_icon"/>
                                    {item.title}</Typography>
                                    {Boolean(item.is_locked) ?
                                        <LockIcon className="icon_arrow" />
                                    :
                                    <QuizPageAndSolve courseId={courseId} quizId={String(item.id)} refresh={refresh} onChange={setRefresh} /> }
                                </div>
                            </div>
                          
                          </>
                
                        }

                      </li>
                    ))}
                  </ul>
            </div>
          </div>
        </>
        :""
      }

    
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
    {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
    {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </>
  );
}