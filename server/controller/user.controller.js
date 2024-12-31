const User = require("../model/user.model");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const apiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
//register-user , login-user , logout-user , current-user

//creating a jwtToken 
const Token = (user)=>{
    return jwt.sign({id:user._id , username:user.username}, process.env.TOKEN_SECRET , {expiresIn:process.env.TOKEN_EXPIRY})
}

//cookie-Options
const cookieOptions = {
    secure:true,
    httpOnly:true
}
exports.registerUser = asyncHandler(async(req , res)=>{
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        throw apiError(400, "all data are required! ");
    }

    const user = await User.findOne({email});
    
    if(user){
        return res.status(400).json(
            new apiResponse("user is already registered please login! " , {} , 400)
        )
    }
    const newUser = await User.create({
        username,
        email,
        password
    })
    
    if(!newUser){
        throw new apiError(500 , "new user is not created!")
    }
    newUser.password = undefined;

    const accessToken = Token(newUser);
    return res.status(200).cookie("accessToken" , accessToken , cookieOptions).json(
        new apiResponse("the new user is! " , newUser , 201)
    )
})

exports.loginuser = asyncHandler(async(req , res)=>{
    const {email , password} = req.body;
    if(!email && !password){
        throw new apiError(400 , "all fields are required!")
    }
    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json(
            new apiResponse("user is not found! " , {} , 404)
        )
    }

    const checkPassword = await user.isPasswordCorrect(password);
    if(!checkPassword){
        return res.status(400).json(
            new apiResponse("Incorrect password! " , {} , 400)
        )
    }

    const accessToken = Token(user);
    user.password = undefined
    return res.status(200).cookie("accessToken" , accessToken ,).json(
        new apiResponse("user is loged in! " , user , 200)
    ) 
})

//logout user
exports.logoutUser = asyncHandler((req , res)=>{
    return res.status(200).clearCookie("accessToken" , cookieOptions).json(
        new apiResponse("user is logout successfully! " ,{} , 200)
    )
})

//currentUser
exports.currentUser = asyncHandler(async (req , res)=>{
    const token = req.cookies.accessToken || req.headers["Authorization"]?.replace("Bearer " , "");
    if(!token){
        return res.status(401).json(
            new apiResponse("toekn is required! " , {} , 401)
        )
    }
    const decodeToken = jwt.verify(token , process.env.TOKEN_SECRET , (error , decoded)=>{
        if(error){
            if(err.name === "TokenExpiredError"){
                return res.status(498).json(
                    new apiResponse("token is expired! " , {} , 498)
                )
            }
            return res.status(498).json(
                new apiResponse("token is Invalid! " , {} , 498)
            )
        }
        return decoded;
    })
    const user = await User.findById(decodeToken.id).select("-password");
    if(!user){
        return res.status(404).json(
            new apiResponse("user is not found! " , {} , 404)
        )
    }
    return res.status(200).json(
        new apiResponse("the current user is! " , user , 200)
    )
})