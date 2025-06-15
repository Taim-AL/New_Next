"use client"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import "@/app/ui/Assets/Css/teacher/CoursePage2.css"
import "@/app/ui/Assets/Css/student/QuizPage.css"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Col, Row } from 'react-bootstrap';
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import { useState } from 'react';
import { QuestionType2 } from '@/app/lib/definitions';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default  function QuizPageAndUpdate({courseId ,quizId,refresh , onChange}:{quizId:string ,courseId:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = useState(false);
  const [from , setFrom] = React.useState<number | null> (null)
  const [to , setTo] = React.useState<number | null> (null)
  const [step , setStep] =useState<number | null> (0)
  const [isAuto , setIsAuto] =useState<boolean | null> (true);
  const [isFinal , setIsFinal] =useState<boolean | null> (false);
  const [is_auto_generated , setis_auto_generated] =useState<number> (0);
  const [isPending , setIsPending] =useState<boolean | null> (false);
  const [message , setMessage] =useState<string>("");
  const [title , setTitle] =useState<string>("");
  const [error , setError] =useState<string>("");
  const router = useRouter();
  const [questions ,setQuestions] = useState<QuestionType2[]>([{text:"" ,choices:[{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:1}]}])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
    router.push(`/dashboard/teacher/course/${courseId}`)
    setStep(0);
  };


  const handleQuestionChange = (
    index: number,
    field: keyof QuestionType2,
    value: string
  ) => {
    const updatedQuestions = [...questions];
  
    if (field === "text" ) {
      updatedQuestions[index][field] = value;
      setQuestions(updatedQuestions);
    } else {
      console.warn(`Field '${field}' is not a string field.`);
    }
  };
  

  const handleChoiceChange = (questionIndex: number, choiceIndex: number, value: string , is_correct:number) => {
    const updatedQuestions = [...questions];
    const updatedChoices = [...updatedQuestions[questionIndex].choices];
  
    updatedChoices[choiceIndex] = {
      ...updatedChoices[choiceIndex],
      ["is_correct"]:  Number(is_correct), 
      ["choice"]: value
    };
  
    updatedQuestions[questionIndex].choices = updatedChoices;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index: number , event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1); // نحذف العنصر من المصفوفة
    setQuestions(updatedQuestions);
  };
  
  
  const handleAddQuestion = () => {
      const newQuestion: QuestionType2 = {
        text: "",
        choices: [
          { choice: "", is_correct: 0 },
          { choice: "", is_correct: 0 },
          { choice: "", is_correct: 0 },
          { choice: "", is_correct: 1 },
        ],
      };
      setQuestions([...questions, newQuestion]);
    console.log(questions);
  };


  const handleUpdateQuize =async (event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      setIsPending(true)
      setError("")
      setMessage("")
    try{
    const response = await Axios.put(`teacher/update-quiz/${quizId}`,{title:title , from_video:from , to_video:to , course_id:courseId , is_final:isFinal , is_auto_generated:isAuto ,questions:questions})
            console.log( "response Update :",response)
            setIsPending(false)
            if( response.data.success === true){
              setMessage(response.data.message)
              setOpen(false);
              router.push(`/dashboard/teacher/course/${courseId}`)
              setStep(0);
              onChange(!refresh)
              setFrom(null)
              setTo(null)
              setStep(0)
              setTitle("")
              setQuestions([{text:"" ,choices:[{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:1}]}])
              setIsFinal(false)
              setIsAuto(true)
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
        try{
            Axios.get(`/teacher/get-quiz`,{params:{course_id:courseId, quiz_id: quizId}}).then(response =>{
                console.log("Exam :", response)
                if(response.data.success === true){
                    setQuestions(response.data.data.questions);
                    setFrom(response.data.data.from_video)
                    setTo(response.data.data.to_video)
                    setTitle(response.data.data.title)
                    setIsFinal(response.data.data.is_final === 0 ? false : true)
                    setis_auto_generated(response.data.data.is_auto_generated )
                }
                })}catch(error){
            console.log(error)
            }
        },[])
  
  return (
    <>
    
    <React.Fragment>
        <button title="Add Quize" type="button" className="quiz_update_button " onClick={handleClickOpen}>
            <ArrowForwardIosIcon className="icon_arrow" />
        </button>
    {from ?
    <>                            
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
            

            {step === 0  &&  is_auto_generated === 0 &&(
                    <>
                    <Row className='mx-0'>
                        <Col lg="12">
                            <label className='lable-create-course'>Quize Title :</label>
                            <input title='Quize Title' type="text" className='input-create-course' value={title}  onChange={e => setTitle(e.target.value)}/>
                        </Col>
                        <Col lg="6" md="12">
                            <label className='lable-create-course'>From Video :</label>
                            <input title='From Video' type="number" className='input-create-course' value={from ? from :""}  onChange={e => setFrom(Number(e.target.value))}/>
                        </Col>
                        <Col lg="6" md="12">
                            <label className='lable-create-course'>To Video :</label>
                            <input title='From Video' type="number" className='input-create-course' value={to ? to :""}  onChange={e => setTo(Number(e.target.value))}/>
                        </Col>
                        <Col lg="12" md="12">
                            <label className='lable-create-course'>Is It Final Quize :</label>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={isFinal}
                                // control={<Radio />}
                                >
                                    <div className="level-container">
                                        <FormControlLabel required value={true} onChange={e => setIsFinal(true)}  control={<Radio />} label="Yes" />
                                        <FormControlLabel required value={false} onChange={e => setIsFinal(false)}  control={<Radio />} label="No" />
                                    </div>
                            </RadioGroup>
                        </Col>
                    </Row>
                    </>
            )}
            {step === 0 && is_auto_generated === 1 && (
              <>
                <Row className='mx-0'>
                    <Col lg="12" md="12" className='quiz_info'>
                        <label className='quiz_lable'>Quize Title : {title}</label><br/>
                        <label className='quiz_lable'>This Quiz generated by AI</label><br/>
                        <label className='quiz_lable'>This Quiz For Videos From {from} to {to}</label><br/>
                        {isFinal && isFinal === true? <label className='quiz_lable'>This Quiz is Final</label>:<label className='quiz_lable'>This Quiz isn't Final</label>}
                    </Col>
                </Row>
                </>
            )}
            {step === 1 && (
                <>  
                <label className='lable-create-course'>Questions on the video:</label>
                  <div className="outer-container-quistions">
                    {questions.map((question,index)=>(
                        <Row key={index} className='mx-0 question-container'>
                          <Col md='12' className='outer-container-delete-question'>
                            <button title='delete question' className='delete-question-button' onClick={(e)=>handleDeleteQuestion(index,e)}>X</button>
                          </Col>
                          <Col xs="12" md="12">
                              <label className='lable-create-course'>Question:</label>
                              <input title='points to enroll' type="text"  className='input-create-course'value={question.text} onChange={(e) => handleQuestionChange(index, "text", e.target.value)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>First Wrong Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={question.choices[0].choice} onChange={(e) =>handleChoiceChange(index, 0, e.target.value , 0)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>Second Wrong Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={question.choices[1].choice} onChange={(e) =>handleChoiceChange(index, 1, e.target.value , 0)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>Third Wrong Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={question.choices[2].choice} onChange={(e) =>handleChoiceChange(index, 2, e.target.value , 0)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>The Correct Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={question.choices[3].choice} onChange={(e) =>handleChoiceChange(index, 3, e.target.value , 1)}/>
                          </Col>
                        </Row>
                    ))}
                    <div className='w-100 d-flex justify-content-center mt-2'>
                      <button type="button" className='button-create-course' onClick={handleAddQuestion}>Add Question</button>
                    </div>
                  </div>  
                </>
            )}

            

        </DialogContent>
        <DialogActions>
            {step === 1 && (
            <button  className='cancel-create-course' onClick={()=>{setStep(step-1)}}>Prev</button>
            )}
          <button onClick={handleClose}  className='cancel-create-course'>Cancel</button>
          {step === 0  && is_auto_generated === 0  ?
          <button type="button" className='button-create-course'onClick={()=>{setStep(step+1)}}>Next</button>
          :step === 1?
          <button type="button"  className='button-create-course' onClick={handleUpdateQuize} >
            {isPending ?"Loding..":"Update Quiz"}
          </button>:""
          }
        </DialogActions>
        
      </Dialog>
      </>:""}
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
    
    </>
  );
}