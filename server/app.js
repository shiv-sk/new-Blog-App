const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());


//routes
const userRoutes = require("./routes/user.routes");
app.use("/api/v1/user" , userRoutes);

const blogRoutes = require("./routes/blog.routes");
app.use("/api/v1/blog" , blogRoutes);
module.exports = app;