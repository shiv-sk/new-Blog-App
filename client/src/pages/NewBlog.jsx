export default function NewBlog(){
    return(
        <div className="mt-5 mb-5">
            <h4 className="text-center font-bold text-lg mb-5">NewBlog</h4>
            <form className="flex flex-col justify-center items-center mx-auto gap-4">
            <input type="text" placeholder="Title of Blog" className="input input-bordered w-full max-w-xs" required/>
            <textarea className="textarea resize-none w-full max-w-xs shadow-lg" 
            placeholder="Content of Your blog" rows={6} required></textarea>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg shadow-lg">NewBlog</button>
            </form>
        </div>
    )
}