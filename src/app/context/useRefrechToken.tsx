import { User } from "../lib/definitions";
import { useAuth } from "./auth-context"; 

const useRefreshToken = () => {
    
    const {token , setUser , id , role} = useAuth();
    const refresh = async() =>{
        console.log("refresh here ......................")
        setUser({token:token , email:null , fullName:null , id:Number(id) , role:Number(role) ,userName:null})
        return token;
    }

    return refresh;
}
export default useRefreshToken;