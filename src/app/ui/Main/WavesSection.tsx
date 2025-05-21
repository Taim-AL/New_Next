"use client";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css';
import { Navigation, Pagination, Mousewheel, Keyboard , Autoplay} from 'swiper/modules';
import Wave from "react-wavify";
import "@/app/ui/Assets/Css/Main/Waves.css"
export default function Waves(){

    const DataSblide=[
        {
            id:0,
            title:"Welcome to CAMPESS Acadimy",
            about:"We are an educational platform that provides many services , Our goalis to facilitate the educational process and make it more time and effort saving for both the professor and the student"
        },
        {
            id:1,
            title:"Some of our services",
            about:"We provide the ability to publish courses recorded by the professor in video form , and the professor can publish tests for his students , communicate with them through comments , and follow their progress , and upload files attached to each lecture ."
        },
        {
            id:2,
            title:"We work for the convenience of the teacher",
            about:"The teacher can follow the statistics of his own courses in terms of views, profits, and other details, and follow and respond to students’ comments"
        },
    ]

    return(
        <>
        <div className="outer-container-swiper">
            <div className='continar-swiper'>
                <Swiper
                    loop={true}
                    cssMode={true}
                    navigation={true}
                    mousewheel={true}
                    keyboard={true} 
                    pagination={false}
                    zoom={true}
                    autoplay={{
                        delay:10000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
                    className="mySwiper"
                    style={{padding:"40px 0px"}}
                >
                    {DataSblide.map((e,i)=>{
                        return(
                            <SwiperSlide key={i}>
                                <div className='testimonial'>
                                    <h2 className='title'>
                                        {e.title}
                                    </h2>
                                    <div className='continar-ditailes'>
                                        <p className=' text-center ditailes'  >
                                            <i className='bx bxs-quote-alt-left quote-icon'></i>{e.about}
                                            <i className='bx bxs-quote-alt-right quote-icon'></i>
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                
                </Swiper>  
    
            </div>
        </div>

        <div>
            <Wave  fill={'rgb(136,138,255)'} paused={false} options={{height:70 , amplitude:50 , speed:0.15 , points:4,}}/>          
            <Wave fill={'rgba(136, 138, 255, 0.673)'} paused={false} options={{height:70 , amplitude:35 , speed:0.20 , points:4,}} className='wave-1'/>
            <Wave fill={'rgba(136, 138, 255, 0.500)'} paused={false} options={{height:70 , amplitude:40 , speed:0.25 , points:4,}} className='wave-1'/>
        </div>
        
        </>
    )
}