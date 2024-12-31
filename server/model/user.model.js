const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },

} , {timestamps:true})

//hashing the password
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
    next();
})

//check if password is correct or not
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}

const User = mongoose.model("User" , userSchema);
module.exports = User;