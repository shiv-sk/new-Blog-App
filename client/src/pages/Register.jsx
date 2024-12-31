import { Link } from "react-router-dom";

export default function Register(){
    return(
        <div className="mt-5 mb-5 mx-auto max-w-md min-h-screen sm:max-w-md lg:max-w-lg">
            <h5 className="text-center font-bold text-lg mb-4">Register</h5>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Enter your name" className="input input-bordered w-full" required/>
                <input type="email" placeholder="Example123@mail.com" className="input input-bordered w-full " required/>
                <input type="password" placeholder="Enter your password" className="input input-bordered w-full " required/>
                <span className="text-sm text-center mx-4">Already have an account&nbsp;  
                <Link to={"/login"} className="hover:underline font-bold text-lg">Login</Link></span>
                <button className="btn sm:btn-sm md:btn-md lg:btn-lg shadow-lg w-full">Register</button>
            </form>
        </div>
    )
}