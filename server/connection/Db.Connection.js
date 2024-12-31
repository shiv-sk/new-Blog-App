const mongoose = require("mongoose");
const Con = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDb is connected! ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error("error from mongoDB connection! " , error);
        process.exit(1);
    }
    mongoose.connection.on("error" , (error)=>{
        console.error('Mongoose connection error:', error);
    })
    mongoose.connection.on("disconnected" , ()=>{
        console.log('Mongoose disconnected.');
    })
}
module.exports = Con;