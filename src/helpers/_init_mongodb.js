import mongoose from "mongoose";
import config from "../config/config.js";

const { MONGODB_URI, DB_NAME } = config;

mongoose
  .set("strictQuery", false)
  .connect(MONGODB_URI, { dbName: DB_NAME, useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log(e.message));

mongoose.connection.on('connected', ()=>{
    console.log('mongoose connected to db')
})

mongoose.connection.on('error', (e)=>{
    console.log(e)
})
mongoose.connection.on('disconnected', ()=>{
    console.log('mongoose is disconnected')
})
process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0);
})