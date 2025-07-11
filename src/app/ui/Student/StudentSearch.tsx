import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SearchIcon from '@mui/icons-material/Search';
import "@/app/ui/Assets/Css/student/Navbar.css"
import { DialogContent, FormControlLabel, Radio, RadioGroup, Skeleton, Stack } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import Axios from '@/app/lib/axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { OuterCourseType, OuterSpType } from '@/app/lib/definitions';
import CourseCard from '../Teacher/CourseCard';
import SpecilizationCard from '../Teacher/SpecilizationCard';
import Pagination from '../Teacher/Pagination';
import Search from '../Main/SearchComponent';
import { useDebouncedCallback } from 'use-debounce';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default  function SearchSt() {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const [level , setLevel] =React.useState<number | null>(null)
  const [maxEnroll , setMaxEnroll] =React.useState<number | null>(null)
  const [minEnroll , setMinEnroll] =React.useState<number | null>(null)
  const [maxEarned , setMaxEarned] =React.useState<number | null>(null)
  const [minEarned , setMinEarned] =React.useState<number | null>(null)
  const [isCompleted , setIsCompleted] =React.useState<number | null>(null)
  const [totalPages , setTotalPages] = React.useState<number | null>(null);
  const [courses , setCourses] = React.useState<OuterCourseType[] | null>(null);
  const [Sps , setSps] = React.useState<OuterSpType[] | null>(null);
  const [isPending , setIsPending] = React.useState<boolean | null> (false);
  
  const query = params.get('query')|| '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const { replace } = useRouter();
  const pathname = usePathname();
  React.useEffect(()=>{
    try{
      setIsPending(true);
   if(query!==""){
      Axios.get(`/search/courses-and-specializations`,{params:{per_page:4 , page_number:currentPage ,q:query ,level:level ,max_points:maxEnroll ,min_points:minEnroll ,max_points_e:maxEarned ,min_points_e:minEarned ,is_completed:isCompleted }}).then(response =>{
        console.log("search response :",response)
        if(response.data.success){
          setTotalPages(response.data.meta.last_page); 
          setSps(response.data.data.specializations)
          setCourses(response.data.data.courses)
          setIsPending(false);
        }
    })
  }
  }catch(error){
      console.log(error)
    }
  },[query , currentPage , level , maxEnroll , minEnroll , maxEarned , minEarned , isCompleted ])

React.useEffect(()=>{
    if(!searchParams.get('page')){
      setOpen(false)
    }
  },[searchParams ])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = useDebouncedCallback((term) => {
          console.log(`Searching... ${term}`);
          const params = new URLSearchParams(searchParams);
          params.set('page', '1');
          if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
          replace(`${pathname}?${params.toString()}`)
        },300);

  const updateUrl =()=>{
        const params = new URLSearchParams(searchParams);
        params.set('page',"1".toString());
        router.push(`/?${params}`);
    }

  return (
    <React.Fragment>
      <div className='outer-search-container-2 z-1'>
        <button title='search' className="button-search-2" onClick={handleClickOpen}>
            <SearchIcon className="icon-search-2"/>
            </button>
            <input 
                placeholder ="Search......" 
                className='input-search-2'
                onChange={(e) => {
                    handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
      {/* <Button className='search_page_button' onClick={handleClickOpen}>
        Search Page <SearchIcon className='icon_search'/>
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} className='top_par_search_container'>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <Search/> 
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
            <Row className='mx-0 search_content'>
                <Col lg='3' md="12" className='search_fillter_container shadow'>
                    <label className='lable-create-course'>Level:</label>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={(e)=> updateUrl()}
                        >
                            <div className="level-container">
                                <FormControlLabel required value="0"  onChange={e => setLevel(0)}  control={<Radio />} label="Beginner" />
                                <FormControlLabel required value="1"  onChange={e => setLevel(1)} control={<Radio />} label="Intermediate" />
                                <FormControlLabel required value="2" onChange={e => setLevel(2)}  control={<Radio />} label="Advanced" />
                            </div>
                    </RadioGroup>
                    <hr />
                    <Row className='mx-0'>
                        <Col xs="12" md="12">
                            <label className='lable-create-course'>Max Points To Enroll :</label>
                            <input title='points to enroll' type="number" value={maxEnroll ?maxEnroll:''} className='input-create-course' onChange={(e)=>{setMaxEnroll(Number(e.target.value)); updateUrl()}}  />
                        </Col>
                        <Col xs="12" md="12">
                            <label className='lable-create-course'>Min Points To Enroll :</label>
                            <input title='points to enroll' type="number"  value={minEnroll ?minEnroll:''} className='input-create-course' onChange={(e)=>{setMinEnroll(Number(e.target.value)); updateUrl()}} />
                        </Col>
                        <Col xs="12" md="12">
                            <label className='lable-create-course'>Max Points Earned:</label>
                            <input title='points to enroll' type="number" value={maxEarned ?maxEarned:''} className='input-create-course'  onChange={(e)=>{setMaxEarned(Number(e.target.value)); updateUrl()}} />
                        </Col>
                        <Col xs="12" md="12">
                            <label className='lable-create-course'>Min Points Earned:</label>
                            <input title='points to enroll' type="number"  value={minEarned ?minEarned:''} className='input-create-course' onChange={(e)=>{setMinEarned(Number(e.target.value)); updateUrl()}} />
                        </Col>
                    </Row>
                    <hr />
                    <label className='lable-create-course'>Is Compleated :</label>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={(e)=> updateUrl()}
                        >
                            <div className="level-container">
                                <FormControlLabel required value="1"  onChange={e => setIsCompleted(1)} control={<Radio />} label="Yes" />
                                <FormControlLabel required value="0" onChange={e => setIsCompleted(0)}  control={<Radio />} label="No" />
                            </div>
                    </RadioGroup>
                </Col>
                {query !== "" ?
                <Col lg="9" md='12' className='shadow'>
                    <Row className='mx-0'>
                    <h2 className='search_courses_h2'>Courses :</h2>
                    {courses  ? <>{courses.map((e,i)=>{
                            if(e.status === 2){
                            return(
                            <Col lg='3' md='6'xs='12' key={i} className='mb-3' >
                                <CourseCard  id={e.id} type={0} href={`/dashboard/student/course/${e.id}`} src={e.image} alt={e.name} title={e.name} about={e.description}/>
                            </Col>
                            )}
                        })}</> : ""}
                        {!isPending && courses?.length === 0?
                          
                          <Col md='12' className="d-flex justify-content-center align-items-center ">
                            <SentimentVeryDissatisfiedIcon className="empty_courses"/>
                        </Col>:""}
                        {isPending?
                          [...Array(4)].map((_, i) => (
                        <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                            <div className="outer-card shadow">
                            <Stack spacing={1} className=" p-2 h-100">
                                <Skeleton variant="rounded"  height={70}  sx={{ bgcolor: '#f2f6fd' }}/>
                            {/* For variant="text", adjust the height via font-size */}
                                <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            </Stack>
                            </div>
                        </Col>))
                          
                          :""}
                      </Row>
                      <Row className='mx-0'>
                    <h2 className='search_courses_h2'>Specilizations :</h2>
                        {Sps ? <>{Sps.map((e,i)=>{
                              return(
                              <Col lg='3' md='6'xs='12' key={i} className='mb-3'>
                                  <SpecilizationCard id={e.id} src={String(e.image)}  href={`/dashboard/student/specilization/${e.id}`} com={e.is_completed} title={e.title} />
                              </Col>
                              )
                          })} </> : ""}
                          {!isPending && Sps?.length === 0?
                          
                          <Col md='12' className="d-flex justify-content-center align-items-center ">
                            <SentimentVeryDissatisfiedIcon className="empty_courses"/>
                        </Col>:""}

                          {isPending?
                          [...Array(4)].map((_, i) => (
                        <Col lg='3' md='6'xs='12' key={i} className="course-card-container mb-3">
                            <div className="outer-card shadow">
                            <Stack spacing={1} className=" p-2 h-100">
                                <Skeleton variant="rounded"  height={70}  sx={{ bgcolor: '#f2f6fd' }}/>
                            {/* For variant="text", adjust the height via font-size */}
                                <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            </Stack>
                            </div>
                        </Col>))
                          
                          :""}
                        <Col md='12' className="d-flex justify-content-center align-items-center mt-2 mb-4">
                            {totalPages ?
                            <Pagination  totalPages={totalPages}/>
                            :""}
                        </Col>
                    </Row>
                </Col>: 
                <Col md="9" className='shadow'>
                  <div className="container_empty_search">
                    <SearchIcon className='empty_search_icon'/>
                  </div>
                </Col>
                }
            </Row>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}