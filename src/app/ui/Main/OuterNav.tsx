import React from 'react';
import '@/app/ui/Assets/Css/Main/OutNav.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/app/ui/Assets/Css/BOSSLA.png";
import SearchIcon from '@mui/icons-material/Search';
import SearchMain from './SearchMain';


function OuterNav() {
    // const [open , setOpen] = React.useState(false);
    return ( 
        <>       
            <div className='outer-container shadow'>
                <div className="inner-container1">
                    <div className="logo-container">
                    <Image className="icon-outerNav" src={logo} alt='campess'/>
                    <h3 className='navbar-logo '> <span className='span1'>C</span>AMPESS</h3>
                    </div>
                    <SearchMain/>
                    <div className="buttons-container">
                        <Link className='login-btn' prefetch={true} href={"/login"}>Login</Link>
                        <Link className='rigester-btn' prefetch={true} href={"/signUp"}>SingUp</Link>
                    </div>
                </div>
            </div>
        </> 
     );
}

export default OuterNav;