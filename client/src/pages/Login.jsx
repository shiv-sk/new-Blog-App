import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Login(){
    const [userData , setUserData] = useState({
        email:"",
        password:""
    })

    const {login} = useAuth();

    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            await login(userData);
        } catch (error) {
            console.error("error from login page! " , error);
        }
    }
    return(
        <div className="mt-5 mb-5 mx-auto max-w-md min-h-screen sm:max-w-md lg:max-w-lg" onSubmit={handleLogin}>
            <h5 className="text-center font-bold text-lg mb-4">Login</h5>
                <form className="flex flex-col gap-4">
                <input type="email" placeholder="Example123@mail.com" className="input input-bordered w-full" required
                value={userData.email}
                onChange={(e)=>setUserData({...userData , email:e.target.value})}
                />
                <input type="password" placeholder="Enter your password" className="input input-bordered w-full" required
                value={userData.password}
                onChange={(e)=>setUserData({...userData , password:e.target.value})}
                />
                <button className="btn sm:btn-sm md:btn-md lg:btn-lg shadow-lg w-full" type="submit">Login</button>
            </form>
        </div>
    )
}