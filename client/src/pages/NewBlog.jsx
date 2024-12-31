import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { baseUrl, postAndUdateReq } from "../utils/apiCalls";

export default function NewBlog(){
    const {user} = useAuth();
    const [userId , setUserId] = useState("");
    console.log("user id is! " , userId)
    const [blogData , setBlogData] = useState({
        title:"",
        body:"",
        author:userId
    })
    useEffect(()=>{
        if(user){
            setUserId(user._id)
        }
        else{
            setUserId(null);
        }
    } , [user])

    //apiCall
    const handleNewBlog = async(e)=>{
        e.preventDefault();
        try {
            const response = await postAndUdateReq(`${baseUrl}/blog/newblog` , "post" , blogData);
            console.log("response from handle new blog! " ,response?.data);
            return response.data;
        } catch (error) {
            console.error("error from new Blog! " , error)
        }
    }
    return(
        <div className="mt-5 mb-5" onSubmit={handleNewBlog}>
            <h4 className="text-center font-bold text-lg mb-5">NewBlog</h4>
            <form className="flex flex-col justify-center items-center mx-auto gap-4">
            <input type="text" placeholder="Title of Blog" className="input input-bordered w-full max-w-xs" required
            value={blogData.title}
            onChange={(e)=>setBlogData({...blogData , title:e.target.value})}
            />
            <textarea className="textarea resize-none w-full max-w-xs shadow-lg" 
            placeholder="Content of Your blog" rows={6} required
            value={blogData.body}
            onChange={(e)=>setBlogData({...blogData , body:e.target.value})}></textarea>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg shadow-lg" type="submit">NewBlog</button>
            </form>
        </div>
    )
}