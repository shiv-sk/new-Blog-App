import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Register(){
    const [userData , setUserData] = useState({
        username:"",
        email:"",
        password:""
    })
    const {register} = useAuth();

    const handleRegister = async (e)=>{
        e.preventDefault();
        try {
            await register(userData);
        } catch (error) {
            console.error("error from register page! " , error);
        }
    }
    return(
        <div className="mt-5 mb-5 mx-auto max-w-md min-h-screen sm:max-w-md lg:max-w-lg" onSubmit={handleRegister}>
            <h5 className="text-center font-bold text-lg mb-4">Register</h5>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Enter your name" 
                className="input input-bordered w-full" required
                value={userData.username} onChange={(e)=>setUserData({...userData , username:e.target.value})}/>
                <input type="email" placeholder="Example123@mail.com" className="input input-bordered w-full " required
                value={userData.email} onChange={(e)=>setUserData({...userData , email:e.target.value})}/>
                <input type="password" placeholder="Enter your password" className="input input-bordered w-full " required
                value={userData.password} onChange={(e)=>setUserData({...userData , password:e.target.value})}/>
                <span className="text-sm text-center mx-4">Already have an account&nbsp;  
                <Link to={"/login"} className="hover:underline font-bold text-lg">Login</Link></span>
                <button className="btn sm:btn-sm md:btn-md lg:btn-lg shadow-lg w-full" type="submit">Register</button>
            </form>
        </div>
    )
}