import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl, getAndDeleteReq } from "../utils/apiCalls";

export default function HomePage(){
    const [blogsData , setBlogsData] = useState([]);
    useEffect(()=>{
        const fetchAllBlogs = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseUrl}/blog/allblogs`);
                setBlogsData(response.data);
                return response.data;
            } catch (error) {
                console.error("error from HomePage! " , error);
            }
        }
        fetchAllBlogs();
    } , [])
    return(
        <div className="flex flex-col sm:flex-row mx-auto justify-center items-start mb-5 min-h-screen mt-16 pt-10">
            {
                blogsData && blogsData.length > 0 ? blogsData.map((blog)=>(
                    <div className="card bg-base-100 w-96 shadow-xl" key={blog._id}>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <p>{blog.body}</p>
                            <div className="card-actions justify-end">
                            <Link to={`/blogdetail/${blog._id}`}><button className="btn btn-primary">More</button></Link>
                            </div>
                        </div>
                    </div>
                )) : (
                    <>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Blog title!</h2>
                            <p>Blog data</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">More</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Blog title!</h2>
                            <p>Blog data</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">More</button>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
            
            
        </div>
    )
}