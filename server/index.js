const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const mongoDBConnection = require("./connection/Db.Connection");
const app = require("./app");
const port = process.env.PORT || 3000;
mongoDBConnection()
.then(app.listen(port , ()=>{
    console.log(`http://localhost:${port}`)
}))
.catch((error)=>{
    console.error("error from mongoDB connection! " , error)
    process.exit(1);
})