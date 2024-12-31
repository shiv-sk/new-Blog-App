import axios from "axios"
const baseUrl = "http://localhost:4000/api/v1";

const getAndDeleteReq = async(url , method)=>{
    try {
        const response = await axios({
            url,
            method,
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response.data;
    } catch (error) {
        console.error("error from getAndDeleteReq! " , error);
    }
}

const postAndUdateReq = async(url , method , data)=>{
    try {
        const response = await axios({
            url,
            method,
            data,
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response.data
    } catch (error) {
        console.error("error from postAndUpdateReq! " , error);
    }
}

export {baseUrl , getAndDeleteReq , postAndUdateReq}