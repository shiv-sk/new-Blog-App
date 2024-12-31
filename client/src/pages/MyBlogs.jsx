import { Link } from "react-router-dom";

export default function MyBlogs(){
    return(
        <div>
            <h4 className="text-center font-semibold text-lg mt-5">MyBlogs</h4>
            <div className="flex flex-col sm:flex-row mx-auto justify-center items-start mt-5 mb-5 pt-10 min-h-screen">
                <div className="card bg-base-100 w-96 shadow-xl">
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
                </div>
            </div>
        </div>
    )
}