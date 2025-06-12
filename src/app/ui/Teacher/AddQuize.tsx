"use client"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Col, Row } from 'react-bootstrap';
import Axios from '@/app/lib/axios';
import IntegrationNotistack from '@/app/ui/Alert';
import { useState } from 'react';
import { QuestionType, QuestionType2 } from '@/app/lib/definitions';

export default  function FormDialog({courseId ,refresh , onChange}:{courseId:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = useState(false);
  const [from , setFrom] = React.useState<number | null> (null)
  const [to , setTo] = React.useState<number | null> (null)
  const [step , setStep] =useState<number | null> (0)
  const [isAuto , setIsAuto] =useState<boolean | null> (true);
  const [isFinal , setIsFinal] =useState<boolean | null> (false);
  const [isPending , setIsPending] =useState<boolean | null> (false);
  const [message , setMessage] =useState<string>("");
  const [title , setTitle] =useState<string>("");
  const [error , setError] =useState<string>("");
  const [questions ,setQuestions] = useState<QuestionType2[]>([{text:"" ,choices:[{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:1}]}])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
    setStep(0);
    setFrom(null)
    setTo(null)
    setTitle("")
    setQuestions([{text:"" ,choices:[{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:0},{choice:"",is_correct:1}]}])
    setIsFinal(false)
    setIsAuto(true)
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

  const handleDeleteQuestion = (index: number) => {
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


  const handleCreateQuize =async (event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      setIsPending(true)
      setError("")
      setMessage("")
    try{
    const response = await Axios.post(`teacher/add-quiz`,{title:title , from_video:from , to_video:to , course_id:courseId , is_final:isFinal , is_auto_generated:isAuto ,questions:questions})
            console.log( "response Created :",response)
            setIsPending(false)
            if( response.data.success === true){
              setMessage(response.data.message)
              setOpen(false)
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
  
  return (
    
    <React.Fragment>
        <button title="Add Quize" type="button" className="button-add-lecture shadow " onClick={handleClickOpen}>
            Add Quize
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
            

            {step === 0 && (
                <>
                  <label className='lable-create-course'>Is Auto Generate :</label>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={isAuto}
                        >
                            <div className="level-container">
                                <FormControlLabel required value={true} onChange={e => setIsAuto(true)}  control={<Radio />} label="Yes" />
                                <FormControlLabel required value={false} onChange={e => setIsAuto(false)}  control={<Radio />} label="No" />
                            </div>
                    </RadioGroup>
                  {/* {
                    isAuto ?"":
                    <> */}
                    <Row className='mx-0'>
                        <Col lg="12">
                            <label className='lable-create-course'>Quize Title :</label>
                            <input title='Quize Title' type="text" className='input-create-course' value={title}   onChange={e => setTitle(e.target.value)}/>
                        </Col>
                        <Col lg="6" md="12">
                            <label className='lable-create-course'>From Video :</label>
                            <input title='From Video' type="number" className='input-create-course' value={from ? from : ""}  onChange={e => setFrom(Number(e.target.value))}/>
                        </Col>
                        <Col lg="6" md="12">
                            <label className='lable-create-course'>To Video :</label>
                            <input title='From Video' type="number" className='input-create-course' value={to ? to : ""}  onChange={e => setTo(Number(e.target.value))}/>
                        </Col>
                        <Col lg="12" md="12">
                            <label className='lable-create-course'>Is It Final Quize :</label>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={isFinal}
                                >
                                    <div className="level-container">
                                        <FormControlLabel required value={true} onChange={e => setIsFinal(true)}  control={<Radio />} label="Yes" />
                                        <FormControlLabel required value={false} onChange={e => setIsFinal(false)}  control={<Radio />} label="No" />
                                    </div>
                            </RadioGroup>
                        </Col>
                    </Row>
                    {/* </>
                  } */}
                </>
            )}
            {step === 1 && !isAuto && (
                <>  
                <label className='lable-create-course'>Questions on the video:</label>
                <label className='lable-create-course'>One at least</label>
                  <div className="outer-container-quistions">
                    {questions.map((question,index)=>(
                        <Row key={index} className='mx-0 question-container'>
                          <Col md='12' className='outer-container-delete-question'>
                            {index !== 0 ? <button title='delete question' className='delete-question-button' onClick={()=>handleDeleteQuestion(index)}>X</button> :""}
                          </Col>
                          <Col xs="12" md="12">
                              <label className='lable-create-course'>Question:</label>
                              <input title='points to enroll' type="text"  className='input-create-course'value={questions[index].text} onChange={(e) => handleQuestionChange(index, "text", e.target.value)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>First Wrong Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={questions[index].choices[0].choice} onChange={(e) =>handleChoiceChange(index, 0, e.target.value , 0)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>Second Wrong Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={questions[index].choices[1].choice} onChange={(e) =>handleChoiceChange(index, 1, e.target.value , 0)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>Third Wrong Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={questions[index].choices[2].choice} onChange={(e) =>handleChoiceChange(index, 2, e.target.value , 0)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>The Correct Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={questions[index].choices[3].choice} onChange={(e) =>handleChoiceChange(index, 3, e.target.value , 1)}/>
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
          {step === 0 && !isAuto ?
          <button type="button" className='button-create-course'onClick={()=>{setStep(step+1)}}>Next</button>
          :(step === 0 && isAuto)||(step === 1)?
          <button type="button"  className='button-create-course' onClick={handleCreateQuize} >
            {isPending ?"Loding..":"Create"}
          </button>:""
          }
        </DialogActions>
        
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}