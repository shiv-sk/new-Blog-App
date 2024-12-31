const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];
const corsOption = {
    origin:function(origin , callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null , true);
        }
        else{
            console.log("blocked by origin: " , origin)
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOption));

//routes
const userRoutes = require("./routes/user.routes");
app.use("/api/v1/user" , userRoutes);

const blogRoutes = require("./routes/blog.routes");
app.use("/api/v1/blog" , blogRoutes);
module.exports = app;