"use client"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import "@/app/ui/Assets/Css/teacher/CoursePage.css"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Col, Row } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import Axios from '@/app/lib/axios';
import { useAuth } from '@/app/context/auth-context';
import IntegrationNotistack from '@/app/ui/Alert';
import { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { QuestionType } from '@/app/lib/definitions';

export default  function FormDialog({courseId ,refresh , onChange}:{courseId:string ,refresh:boolean , onChange :React.Dispatch<React.SetStateAction<boolean>>}) {
  const {id} = useAuth();
  const [open, setOpen] = useState(false);
  const [image , setImage] = React.useState<File | null> (null)
  const [file , setFile] = React.useState<File | null> (null)
  const [video , setVideo] = React.useState<File | null> (null)
  const [title , setTitle] = React.useState<string | null> (null)
  const [description , setDescription] = React.useState<string | null> (null)
  const [AttDescription , setAttDescription] = React.useState<string | null> (null)
  const [step , setStep] =useState<number | null> (0)
  const [isPending , setIsPending] =useState<boolean | null> (false);
  const [message , setMessage] =useState<string>("");
  const [error , setError] =useState<string>("");
  const [questions ,setQuestions] = useState<QuestionType[]>([{time_to_appear:"" , question:"",choices:[{choice:"",is_correct:0},{choice:"",is_correct:1}]}])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
    setStep(0);
  };


  const handleQuestionChange = (
    index: number,
    field: keyof QuestionType,
    value: string
  ) => {
    const updatedQuestions = [...questions];
  
    if (field === "time_to_appear" || field === "question") {
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
      const newQuestion: QuestionType = {
        time_to_appear: "",
        question: "",
        choices: [
          { choice: "", is_correct: 0 },
          { choice: "", is_correct: 1 },
        ],
      };
      setQuestions([...questions, newQuestion]);
    console.log(questions);
  };

  const handleAddVideo =async (event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      setIsPending(true)  
      setError("")
      setMessage("")
    try{
    const response = await Axios.post(`teacher/upload-video`,{title:title , description:description , image:image ,course_id : courseId ,teacher_id:id ,file : video ,extension :[{file:file , text : AttDescription}] , questions : questions}
      , {headers: {
        'Content-Type': 'multipart/form-data'
      }})
            console.log( "response Created :",response)
            setIsPending(false)
            if( response.data.success === true){
              setMessage(response.data.message)
              setOpen(false)
              onChange(!refresh)
              setStep(0)
              setTitle(null)
              setDescription(null)
              setImage(null)
              setVideo(null)
              setFile(null)
              setAttDescription(null)
              setQuestions([{time_to_appear:"" , question:"",choices:[{choice:"",is_correct:0},{choice:"",is_correct:1}]}])
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
        <button title="Add Video" type="button" className="button-add-lecture shadow " onClick={handleClickOpen}>
            <AddIcon className="add-lecture-icon"/>
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
                  <div className="outer-image-file-inputes">
                    <div className="app1">
                        <div className="parent1">
                            <div className="file-upload1">
                                <ImageIcon  className='file-upload-icon' />
                                <input title={image ?String(image.name):'thumbnail'} accept=" image/*" type="file" onChange={(e)=>setImage(e.target.files![0])} />
                            </div>
                        </div>
                    </div>  

                    <div className="app1">
                        <div className="parent1">
                            <div className="file-upload1">
                                <InsertDriveFileIcon className='file-upload-icon' />
                                <input title={file ?String(file.name):'attachment'} accept='application/pdf' type="file"  onChange={(e)=>setFile(e.target.files![0])}/>
                            </div>
                        </div>
                    </div> 
                  </div> 
                  <div className="app2">
                      <div className="parent1">
                          <div className="file-upload1">
                              <VideoCameraBackIcon className='file-upload-icon' />
                              <input title={video ?String(video.name):'image'} accept='video/mp4'  type="file" onChange={(e)=>setVideo(e.target.files![0])} />
                          </div>
                      </div>
                  </div> 
                  <label className='lable-create-course'>Attachment Description:</label>
                  <input title='course name' type="text" className='input-create-course'  value={AttDescription ?AttDescription:''}   onChange={(e)=>setAttDescription(e.target.value)} />

                  <label className='lable-create-course'>Video Title:</label>
                  <input title='course name' type="text" className='input-create-course' value={title ?title:''}   onChange={(e)=>setTitle(e.target.value)}   />

                  <label className='lable-create-course'>Description:</label>
                  <input title='description' type="text" className='input-create-course' value={description ?description:''}   onChange={(e)=>setDescription(e.target.value)}  />
                </>
            )}
            {step === 1 && (
                <>  
                <label className='lable-create-course'>Questions on the video:</label>
                  <div className="outer-container-quistions">
                    {questions.map((question,index)=>(
                        <Row key={index} className='mx-0 question-container'>
                          <Col md='12' className='outer-container-delete-question'>
                            <button title='delete question' className='delete-question-button' onClick={()=>handleDeleteQuestion(index)}>X</button>
                          </Col>
                          <Col xs="12" md="9">
                              <label className='lable-create-course'>Question:</label>
                              <input title='points to enroll' type="text"  className='input-create-course'value={questions[index].question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)}/>
                          </Col>
                          <Col xs="12" md="3">
                              <label className='lable-create-course'>Time To Appear:</label>
                              <input title='points to enroll' type="time"  step={"1"}  className='input-create-course' value={questions[index].time_to_appear} onChange={(e) => handleQuestionChange(index, "time_to_appear", e.target.value)}/>
                          </Col>
                          <Col xs="12" md="6">
                              <label className='lable-create-course'>The Wrong Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={questions[index].choices[0].choice} onChange={(e) =>handleChoiceChange(index, 0, e.target.value , 0)}/>
                          </Col><Col xs="12" md="6">
                              <label className='lable-create-course'>The Correct Choice:</label>
                              <input title='points to enroll' type="text"   className='input-create-course' value={questions[index].choices[1].choice} onChange={(e) =>handleChoiceChange(index, 1, e.target.value , 1)}/>
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
          {step === 0 ?
          <button type="submit" className='button-create-course'onClick={()=>{setStep(step+1)}}>Next</button>
          :
          <button type="button"  className='button-create-course' onClick={handleAddVideo}>
            {isPending ?"Loding..":"Create"}
          </button>
          }
        </DialogActions>
      </Dialog>
      {error !== "" ? <IntegrationNotistack variant="error"  message={error}/> : "" }
      {message !== "" ? <IntegrationNotistack variant="success"  message={message}/> : "" }
    </React.Fragment>
  );
}
