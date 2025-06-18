import { StaticImageData } from "next/image";
import { VariantType } from "notistack";

export type User = {
  id:number | null  ;
  fullName: string | null ;
  userName: string | null  ;
  email: string | null ;
  token: string | null ;
  role: number | null ;
  points : string | null;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  token: string | null;
  id: string | null;
  role: string | null;
  image : string | null;
  points : string | null;
  session : string | null;
  userName : string | null;
};

export type SnackBarType = {
    message:string ;
    variant: VariantType;
  };

  export type userInfo ={
    id:number | null;
    role:number | null;
  }


  export interface OptionType {
    id: number;
    title: string;
  }

  export type UserType = {
    admin_activation:number;
    age:number;
    email:string;
    full_name:string;
    gender:number;
    id: number;
    image:string;
    is_active:number;
    specialization:string;
    username:string;
    token:string;
    role: number;
    points : number;
  };

  export type choiceType={
      choice : string ;
      is_correct : number;
  }

  export type QuestionType = {
    time_to_appear : string;
    question  :string;
    choices : Array<choiceType>;
  }


  export type QuestionType2 = {
    text  :string;
    choices : Array<choiceType>;
  }

  export type choiceType2={
      choice : string ;
      id : number ;
      question_id :number 
  }

  export type QuestionType3 = {
    text  :string;
    choices : Array<choiceType2>;
  }
  

  export type   OuterCourseType = {
    category_id:number;
    course_id:number;
    image : StaticImageData;
    name: string;
    description : string;
    id : number;
    point_to_enroll : number;
    points_earned : number;
    status : number;
    teacher_id: number;
    updated_at: string;
    created_at: string;

  }

  export type InnerCourseType = {
    description: string
    image: string
    level: number
    name: string
    point_to_enroll: number
    points_earned: number
    status: number

  }

  

  export type OuterSpType = {
    is_completed: number
    image : StaticImageData;
    title: string;
    id : number;
    teacher_id: number;
    updated_at: string;
    created_at: string;

  }

  export type AttachmentType = {
    course_id: number;
  created_at: string;
  file_path: string;
  id: number;
  text: string;
  updated_at: string;
  }

  export type QuizeType = {
    from_video: number;
    is_final: number;
    title: string ;
    to_video: number;
    type: string;
  }

  export type VideoType = {
    description: string;
    id: number;
    image: StaticImageData
    path: string
    sequential_order: number
    title: string
    type: string
  }


  export type VideoOrQuiz = {
    id: number;
    title: string;
    description?: string;
    image?: StaticImageData;
    type: "video" | "quiz";
    path?: string;
    is_locked?: boolean ;
  };


  export type VideoResponse = {
  course_id: number
  created_at: string
  description:string
  disk: string
  id: number
  image: string
  original_name: string
  path:  string
  sequential_order: number
  teacher_id: number
  title: string
  updated_at:string
  questions: QuestionVideoResponse[]
  scripts:null
  audios:null
  };

  export type VideoResponseStudent = {
    id: number,
    title: string,
    description: string,
    path: string,
    image:string,
    sequential_order: number,
    questions: QuestionVideoResponseStudent[]
    };

  export type QuestionVideoResponse = {
    created_at: string
    id: number
    question: string
    time_to_appear: string
    updated_at:string
    video_id: number
    choices : ChoiseVideoResponse[]
    };

    export type ChoiseVideoResponse = {
      choice: string
      created_at: string
      id: number
      is_correct: number
      question_id: number
      updated_at:string
      };  


    export type QuestionVideoResponseStudent = {
      id: number
      question_text: string
      time_to_appear: string
      choices : ChoiseVideoResponseStudent[]
      };
  
      export type ChoiseVideoResponseStudent = {
        text: string
        id: number
        is_correct: number
        };  


    export type ExamResponse = {
      id: number
      from_video: number
      to_video: number
      title: string
      is_auto_generated: number
      is_final: number
      course_id: number
      questions:ExamQuestionResponse[]
      };  

    export type ExamQuestionResponse = {
      id: number
      text: string
      quize_id: 1    
      choices:ExamQuestionChoiseResponse[]
    };  

    export type ExamQuestionChoiseResponse = {
      id: number
      choice: string
      question_id: number
      is_correct: number
    };  

    export type NotificationType = {
      title : string 
      body : string
    };  


    export type SolveQuizType = {
      question_id : number 
      choice_id : number 
    };  


    export type AutoCompleateTeachersType = {
      id: number
      full_name: string
    };


  export type MessageSupportType = {
      id: number
      message: string
      sender_type : string
      sender:{
        username:string
        image : string
      }
    };

    export type ChatBotMessages = {
        message:string
        owner : number
      
    };
    
    export type RecomendationMessages = {
        message:string
        owner : number
        courses : {id:string ; name :string} [] | null
    };

export const ProfileUrl = "http://127.0.0.1:8000/teacher_image/";
export const ProfileStUrl = "http://127.0.0.1:8000/student_image/";
export const CourseUrl = "http://127.0.0.1:8000/course_image/";
export const VideoUrl = "http://127.0.0.1:8000/uploads/";
export const ThumbnailUrl = "http://127.0.0.1:8000/video_thumbnail/";
export const BaseUrl ="http://127.0.0.1:8000";