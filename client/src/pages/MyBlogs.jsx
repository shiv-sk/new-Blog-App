import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl, getAndDeleteReq } from "../utils/apiCalls";
import { useAuth } from "../context/AuthContext";

export default function MyBlogs(){
    const {user} = useAuth();
    const [myBlogsData , setMyBlogsData] = useState([]);
    const [userId , setUserId] = useState(null);
    useEffect(()=>{
        if(!user){
            return;
        }else{
            setUserId(user._id)
        }
    } , [user])

    useEffect(()=>{
        const getUserBlog = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseUrl}/blog/user/blogs/${userId}`);
                console.log("response from userBlogs data!" , response?.data);
                setMyBlogsData(response?.data);
                return response?.data;
            } catch (error) {
                console.error("error from get user blog data! " , error);
            }
        }
        getUserBlog();
    } , [userId])
    return(
        <div>
            <h4 className="text-center font-semibold text-lg mt-5">MyBlogs</h4>
            <div className="flex flex-col sm:flex-row mx-auto justify-center items-start mt-5 mb-5 pt-10 min-h-screen">
                {
                    myBlogsData && myBlogsData.length > 0 ? myBlogsData.map((blog)=>(
                        <div className="card bg-base-100 w-96 shadow-xl" key={blog._id}>
                            <div className="card-body">
                                <h2 className="card-title">{blog.title}</h2>
                                <p>{blog.body}</p>
                                <div className="card-actions justify-end">
                                <Link to={"/blogdetail/123"}><button className="btn btn-primary">More</button></Link>
                                </div>
                            </div>
                        </div>
                    )) : (<p>You have not created any blogs yet</p>)
                }
                {/* <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <Link to={"/blogdetail/123"}><button className="btn btn-primary">More</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}