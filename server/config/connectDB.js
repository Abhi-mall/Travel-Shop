import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
  throw new Error ("Please provide MONGODB_URI")
}

async function  connectDB(){
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connect DB")
  } catch (error) {
    console.log("MongDb connect error", error)
    process.exit(1)
  }
}

export default connectDB