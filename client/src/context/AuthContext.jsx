/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react"
import { baseUrl, getAndDeleteReq, postAndUdateReq } from "../utils/apiCalls";

const Authcontext = createContext({
    user:null,
    register:()=>{},
    login:()=>{},
    logout:()=>{},
})
const useAuth = ()=>useContext(Authcontext);
const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null);
    const [isLoading , setIsloading] = useState(false);
    const [isError , setIsError] = useState(null);

    useEffect(()=>{
        const currentUser = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseUrl}/user/currentuser` , "get");
                console.log("response from authContext! " , response.data);
                setUser(response?.data);
                return response?.data;
            } catch (error) {
                console.error("error from AuthContext! " , error);
                setIsError(error);
            }finally{
                setIsloading(false);
            }
        }
        currentUser();
    } , [])

    const register = async (data)=>{
        try {
            setIsloading(true);
            const response = await postAndUdateReq(`${baseUrl}/user/register`, "post" , data);
            console.log("response from authContext! " , response);
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error("error from AuthContext! " , error);
            setIsError(error);
        }finally{
            setIsloading(false);
        }
    }
    const login = async (data)=>{
        try {
            setIsloading(true);
            const response = await postAndUdateReq(`${baseUrl}/user/login` , "post" , data);
            console.log("response from AuthContext! " , response.data);
            setUser(response.data);
            return response;
        } catch (error) {
            console.error("error from AuthContext! " , error);
            setIsError(error);
        }finally{
            setIsloading(false);
        }
    }
    const logout = async ()=>{
        try {
            setIsloading(true);
            const response = await postAndUdateReq(`${baseUrl}/user/logout` , "post");
            console.log("response from AuthContext! " , response);
            return response;
        } catch (error) {
            console.error("error from AuthContext! " , error);
            setIsError(error);
        }finally{
            setIsloading(false);
        }
    }

    return(
        <Authcontext.Provider value={{user , register , login , logout}}>
            {children}
        </Authcontext.Provider>
    )
}
export {Authcontext , AuthProvider , useAuth}