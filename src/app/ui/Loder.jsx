import { Bars } from "react-loader-spinner";

export const Loder = ({width , height , color}) => {
    return ( 
        <>
        {/* <div className="loder-continer" > */}
            <Bars
                height={height}
                width={width}
                color={color}
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        {/* </div> */}
        </>
     );
}
 
