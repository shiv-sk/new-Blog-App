const Blog = require("../model/blog.model");
const asyncHandler = require("../utils/asyncHandler");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const { default: mongoose } = require("mongoose");

exports.newBlog = asyncHandler(async(req , res )=>{
    const {title , body , author} = req.body;
    if(!title || !body || !author){
        throw new apiError(400 , "all fields are required! ");
    }

    const existingBlog = await Blog.findOne({$and:[{title} , {author}]});
    if(existingBlog){
        return res.status(400).json(
            new apiResponse("the blog is already exist! " , {} , 200)
        )
    }

    const blog = await Blog.create({
        title,
        body,
        author
    })

    if(!blog){
        return res.status(500).json(
            new apiResponse("blog is not created! " , {} , 400)
        )
    }
    return res.status(201).json(
        new apiResponse("blog is created! " , blog , 201)
    )
})

exports.getAllBlogs = asyncHandler(async(req , res)=>{
    const blogs = await Blog.find();
    if(blogs.length === 0){
        return res.status(404).json(
            new apiResponse("there are no blogs! " , {} , 404)
        )
    }
    return res.status(200).json(
        new apiResponse("the blogs are! " , blogs , 200)
    )
})

exports.getBlogsOfUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId){
        throw new apiError(400 , "userId is required! ");
    }
    const blogs = await Blog.find({author:userId});
    
    if(blogs.length === 0){
        return res.status(404).json(
            new apiResponse("there are blogs for the user! " , {} , 404)
        )
    }

    return res.status(200).json(
        new apiResponse("the blogs are! " , blogs , 200)
    )
})

exports.updateBlog = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new apiError(400 , "blogId is required!");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId , req.body , {runValidators:true , new:true});
    if(!updatedBlog){
        return res.status(500).json(
            new apiResponse("blogs are not updated! " , {} , 500)
        )
    }

    return res.status(200).json(
        new apiResponse("updated blog is! " , updatedBlog , 200)
    )
})

exports.deleteBlog = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new apiError(400 , "blogId is required!");
    }

    const isValidId = mongoose.Types.ObjectId.isValid(blogId);
    if(!isValidId){
        throw new apiError(400 , "blogId is not valid!");
    }
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if(!deletedBlog){
        return res.status(404).json(
            new apiResponse("blog is not found! " , {} , 404)
        )
    }

    return res.status(204).json();
})