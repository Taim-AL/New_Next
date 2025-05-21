import Axios from "../lib/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefrechToken";
import { useAuth } from "./auth-context";


const useAxiosPrivate = () => {
    const refresh  = useRefreshToken();
    const token = useAuth();


    useEffect(() =>{

        const requestIntercept = Axios.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config ;
            }, (error) => Promise.reject(error)
        );


        const responseIntercept = Axios.interceptors.response.use(
            response => response ,
            async (error) =>{
                const  prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true ;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return Axios(prevRequest);  
                }
                return Promise.reject(error);
            }
        );

        return () => {
            Axios.interceptors.request.eject(requestIntercept);
            Axios.interceptors.response.eject(responseIntercept);
        }
    },[token ,refresh])

    return Axios ;
}
 
export default useAxiosPrivate;