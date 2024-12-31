const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const whitelist = ['http://localhost:5173/', 'http://example2.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

//routes
const userRoutes = require("./routes/user.routes");
app.use("/api/v1/user" , userRoutes);

const blogRoutes = require("./routes/blog.routes");
app.use("/api/v1/blog" , blogRoutes);
module.exports = app;