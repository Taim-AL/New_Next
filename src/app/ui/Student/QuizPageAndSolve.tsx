"use client"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/student/QuizPage.css"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Col, Row } from 'react-bootstrap';
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import { useState } from 'react';
import { QuestionType2, QuestionType3, SolveQuizType } from '@/app/lib/definitions';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';
import HTMLContent from './Counter';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default  function QuizPageAndSolve({courseId ,quizId,refresh , onChange}:{quizId:string ,courseId:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [from , setFrom] = React.useState<number | null> (null)
  const [to , setTo] = React.useState<number | null> (null)
  const [step , setStep] =useState<number | null> (0)
  const [isAuto , setIsAuto] =useState<boolean | null> (true);
  const [isFinal , setIsFinal] =useState<boolean | null> (false);
  const [isPending , setIsPending] =useState<boolean | null> (false);
  const [difficulty , setDifficulty] =useState<string>("");
  const [message , setMessage] =useState<string>("");
  const [language , setLanguage] =useState<string>("");
  const [title , setTitle] =useState<string>("");
  const [error , setError] =useState<string>("");
  const router = useRouter();
  const [questions ,setQuestions] = useState<QuestionType3[]>([])
  const [solve , setSolve] = useState<SolveQuizType[]>([])
  const [resulte , setResulte] = useState({correct_answers :null ,score_percentage:null , total_questions:null})
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
    // router.push(`/dashboard/student/myCourse/${courseId}`)
    setStep(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen1(false);
    router.push(`/dashboard/student/myCourse/${courseId}`)
  };


  const handleFinishQuiz =async (event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      setIsPending(true)
      setError("")
      setMessage("")
    try{
    const response = await Axios.post(`student/solve-quiz`,{quiz_id:quizId , answers: solve})
            console.log( "response Solve :",response)
            setIsPending(false)
            if( response.data.success === true){
              setMessage(response.data.message)
              setResulte({
                correct_answers:response.data.data.correct_answers,
                score_percentage:response.data.data.score_percentage,
                total_questions:response.data.data.total_questions
              })
              setOpen(false);
              setOpen1(true);
              setStep(0);
            }else{
              setError(response.data.message)
            }
  
        }catch(e : any){
          console.log(e)
          setIsPending(false)
          setError(e.data.message)
        }
      }
      


      React.useEffect(()=>{
        async function markQuizDone() {
        try{
        if(resulte.score_percentage){
          if(resulte.score_percentage >= 70){
           const response = await Axios.post(`student/mark-content-as-done`,{},{params:{id:quizId , type:"quiz"}})
           if( response.data.success === true){
                setMessage(response.data.message)

              }else{
                setError(response.data.message)
              }
        }}
        }catch(error){
            console.log(error)
            }
          }
          markQuizDone();
        },[resulte.score_percentage])


const handleLeaveQuiz =async (event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      setIsPending(true)
      setOpen1(true);
      router.push(`/dashboard/student/myCourse/${courseId}`)
      setStep(0);
      onChange(!refresh)
      setFrom(null)
      setTo(null)
      setTitle("")
      setQuestions([])
      setSolve([])
      setIsFinal(false)
      setIsAuto(true)
      }


      React.useEffect(()=>{
        try{
            Axios.get(`/student/get-quiz/${quizId}`).then(response =>{
                console.log("Exam :", response)
                if(response.data.success === true){
                    setQuestions(response.data.data.questions);
                    setFrom(response.data.data.from_video)
                    setTo(response.data.data.to_video)
                    setTitle(response.data.data.title)
                    setIsFinal(response.data.data.is_final === 0 ? false : true)
                    setIsAuto(response.data.data.is_auto_generated === 0 ? false : true)
                }
                })}catch(error){
            console.log(error)
            }
        },[])


        const handleGenerateQuiz =async (event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      setIsPending(true)
      setError("")
      setMessage("")
    try{
    const response = await Axios.post(`/student/generate-quiz/${quizId}`,{difficulty:difficulty , language:language})
            console.log( "difficulty  :",difficulty)
            console.log( "Language  :",language)
            console.log( "generate quiz  :",response)
            if(response.data.success === true){
            setIsPending(false)
            setQuestions(response.data.data.questions);
            setMessage(response.data.message)
            setStep(2)
          }else{
            setIsPending(false)
            setError(response.data.message)
            
          }
  
        }catch(e : any){
          console.log(e)
          setIsPending(false)
          setError(e.data.message)
        }
      }

        React.useEffect(()=>{
          setSolve(new Array<SolveQuizType>(questions.length))
          const updatedSolve = [...solve];         
          questions.map((e,i )=>{updatedSolve[i] = {choice_id : e.choices[0].id ,question_id :e.choices[0].question_id};})
          setSolve(updatedSolve);
        },[questions])

        React.useEffect(()=>{
          console.log("solve :" , solve)
        },[solve])

      const handleChoiceChange = (choiceId: number , questionId: number , index : number) => {
        const updatedSolve = [...solve];
        updatedSolve[index].choice_id = choiceId;
        updatedSolve[index].question_id = questionId;
        setSolve(updatedSolve);
        };
  
  return (
    <>
    {from ?
    <React.Fragment>
      <button title="take Quiz" type="button" className="quiz_update_button " onClick={handleClickOpen}>
          <ArrowForwardIosIcon className="icon_arrow" /> 
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            component: 'form',
          },
        }}
      >
        <DialogContent>
            

            {step === 0 &&(
                    <>
                    <Row className='mx-0'>
                        <Col lg="12" md="12" className='quiz_info'>
                            <label className='quiz_lable'>Quize Title : {title}</label>
                            {isAuto && isAuto === true ? <label className='quiz_lable'>This Quiz generated by AI</label>:<label className='quiz_lable'>This Quiz generated by the Teacher</label>}
                            <label className='quiz_lable'>This Quiz For Videos From {from} to {to}</label>
                            {isFinal && isFinal === true? <label className='quiz_lable'>This Quiz is Final</label>:<label className='quiz_lable'>This Quiz isn't Final</label>}
                        </Col>
                    </Row>
                    </>
            )}
            {step === 1 && isAuto &&(
                <>  
                <Row className='mx-0'>
                        <Col lg="12" md="12" className='quiz_info'>
                            <label className='quiz_lable'>Quize difficulty :</label>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={difficulty}
                                // control={<Radio />}
                                >
                                    <div className="level-container">
                                        <FormControlLabel required value={"easy"} onChange={e => setDifficulty("easy")}  control={<Radio />} label="Easy" />
                                        <FormControlLabel required value={"medium"} onChange={e => setDifficulty("medium")}  control={<Radio />} label="Medium" />
                                        <FormControlLabel required value={"hard"} onChange={e => setDifficulty("hard")}  control={<Radio />} label="Hard" />
                                    </div>
                            </RadioGroup>
                            <label className='quiz_lable'>Quize Language :</label>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={language}
                                // control={<Radio />}
                                >
                                    <div className="level-container">
                                        <FormControlLabel required value={"ar"} onChange={e => setLanguage("ar")}  control={<Radio />} label="عربية" />
                                        <FormControlLabel required value={"en"} onChange={e => setLanguage("en")}  control={<Radio />} label="English" />
                                        <FormControlLabel required value={"fr"} onChange={e => setLanguage("fr")}  control={<Radio />} label="French" />
                                    </div>
                            </RadioGroup>
                        </Col>
                    </Row>
                </>
                    )}


{step === 1 && !isAuto   && (
                <>  
                <label className='quiz_lable'>Questions :</label>
                  <div className="outer-container-quistions">
                    {questions.map((question,index)=>(
                        <Row key={index} className='mx-0 quiz_info'>
                          <Col xs="12" md="12">
                              <label className='quiz_lable'>Question {index+1}:</label>
                            <label className='quiz_lable'>{question.text}</label>
                            <label className='quiz_lable'>Choices :</label>

                          </Col>
                          <Col xs="12" md="12">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={solve[index]?.choice_id ?? ""}
                                >
                                    <Row className="level-container mx-0">
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[0].id} onChange={e =>handleChoiceChange(question.choices[0].id , question.choices[0].question_id , index)}  control={<Radio />} label={`A : ${question.choices[0].choice}`} />
                                      </Col>
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[1].id} onChange={e =>handleChoiceChange(question.choices[1].id , question.choices[0].question_id , index)}  control={<Radio />} label={`B : ${question.choices[1].choice}`} />
                                      </Col>
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[2].id} onChange={e =>handleChoiceChange(question.choices[2].id , question.choices[0].question_id , index)}  control={<Radio />} label={`C : ${question.choices[2].choice}`} />
                                      </Col>
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[3].id} onChange={e =>handleChoiceChange(question.choices[3].id , question.choices[0].question_id , index)}  control={<Radio />} label={`D : ${question.choices[3].choice}`} />
                                      </Col>
                                    </Row>
                            </RadioGroup>
                          </Col>
                        </Row>
                    ))}
                    
                  </div>  
                </>
            )}


            {(step === 1 && !isAuto) || (step ===2 && isAuto  && questions && solve[0] ) && (
                <>  
                <label className='quiz_lable'>Questions :</label>
                  <div className="outer-container-quistions">
                    {questions.map((question,index)=>(
                        <Row key={index} className='mx-0 quiz_info'>
                          <Col xs="12" md="12">
                              <label className='quiz_lable'>Question {index+1}:</label>
                            <label className='quiz_lable'>{question.text}</label>
                            <label className='quiz_lable'>Choices :</label>

                          </Col>
                          <Col xs="12" md="12">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={solve[index]?.choice_id ?? ""}
                                >
                                    <Row className="level-container mx-0">
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[0].id} onChange={e =>handleChoiceChange(question.choices[0].id , question.choices[0].question_id , index)}  control={<Radio />} label={`A : ${question.choices[0].choice}`} />
                                      </Col>
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[1].id} onChange={e =>handleChoiceChange(question.choices[1].id , question.choices[0].question_id , index)}  control={<Radio />} label={`B : ${question.choices[1].choice}`} />
                                      </Col>
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[2].id} onChange={e =>handleChoiceChange(question.choices[2].id , question.choices[0].question_id , index)}  control={<Radio />} label={`C : ${question.choices[2].choice}`} />
                                      </Col>
                                      <Col md="12" lg="6">
                                        <FormControlLabel required value={question.choices[3].id} onChange={e =>handleChoiceChange(question.choices[3].id , question.choices[0].question_id , index)}  control={<Radio />} label={`D : ${question.choices[3].choice}`} />
                                      </Col>
                                    </Row>
                            </RadioGroup>
                          </Col>
                        </Row>
                    ))}
                    
                  </div>  
                </>
            )}

            

        </DialogContent>
        <DialogActions>
            {step === 1 && (
            <button  className='cancel-create-course' onClick={()=>{setStep(step-1)}}>Prev</button>
            )}
            
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          {step === 0  ?
          <button type="button" className='button-create-course'onClick={()=>{setStep(step+1)}}>Next</button>
          :(step === 1 && !isAuto) || (step === 2 && isAuto)?
          <button type="button"  className='button-create-course' onClick={handleFinishQuiz} >
            {isPending ?"Loding..":"Finish"}
          </button>:""
          }
          {step === 1 && isAuto &&(
            <button type="button"  className='button-create-course' onClick={handleGenerateQuiz}>{isPending ?"Loding..":"Generate"}</button>
            )}
        </DialogActions>
        
      </Dialog>

      {resulte.score_percentage !== null ?<Dialog
        open={open1}
        onClose={handleClose1}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            component: 'form',
          },
        }}
      >
        <DialogContent>
          <Row className='mx-0'>
              <Col lg="12" md="12" className='quiz_info'>
                  <label className='quiz_lable'>Your degree :</label>
                  <div className='d-flex justify-content-center'>
                    <HTMLContent myCount={resulte.score_percentage}/>
                  </div>
                  <label className='quiz_lable'>Total Questions is : {resulte.total_questions} </label>
                  <label className='quiz_lable'>Number of correct answers : {resulte.correct_answers} </label>
              </Col>
          </Row>
           
        </DialogContent>
        <DialogActions>
          <div className='w-100 d-flex justify-content-center'>
            <button type="button"  className='button-create-course' onClick={handleLeaveQuiz} >
              Finish
            </button>
          </div>
        </DialogActions>
        
      </Dialog>:""
      }

      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
    :
    "...."
    }
    </>
  );
}