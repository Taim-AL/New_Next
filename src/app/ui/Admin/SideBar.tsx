import SchoolIcon from '@mui/icons-material/School';
import "@/app/ui/Assets/Css/admin/SideBar.css"
import PersonIcon from '@mui/icons-material/Person';
import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();

  const data =[
    {icon : <PersonIcon className="link-icon"/> , title : "Students" , href : "/dashboard/admin/students" },
    {icon : <PersonalInjuryIcon className="link-icon"/> , title : "Teachers" , href : "/dashboard/admin/teachers"},
    {icon : <EditDocumentIcon className="link-icon"/> , title : "Courses" , href : "/dashboard/admin/courses"},
    {icon : <AutoAwesomeMotionIcon className="link-icon"/> , title : "Specilizations" , href : "/dashboard/admin/specilizations"},
  ]
  
  return (
      <>
        <div className="sidebar-continer ">
          <div className="inner-sideBar shadow">
            <div className="inner-links-container">
                {data.map((e , i)=>{
                  return(
                    <div className="each-icon" key={i}>
                        {e.icon}
                    </div>
                  )
                })}
            </div>
          </div>
          <div className="outer-sidebar">
              <div className="logo-container-sidebar">
                {/* <SchoolIcon className="icon-sidebar"/> */}
                <h2 className="logo-sidebar">CAMPESS</h2>
              </div>

              <div className="Links-container-sidebar">
                {data.map((e , i)=>{
                  return(
                    <Link key={i} href={e.href} className={clsx(
                        'not-active-link',
                        {
                          'active-link': pathname.match(e.href),
                        })}>
                        {e.title}
                    </Link>
                  )
                })}
              </div>
              <div className="logout-container ">
                <Link href={"/"} className='logout-button'>Logout</Link>
              </div>
          </div>
        </div>
      </>
    );
}

export default Sidebar;