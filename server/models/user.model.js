import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: [true, "Provide name"]
  },
  email : {
    type : String,
    required : [true, "Provide email"],
    unique : true
  },
  password : {
    type : String,
    required : [true, "provide password"]
  },
  
  refresh_token : {
    type : String,
    default : ""
  },
 
  role : {
    type : String,
    enum : ["ADMIN", "USER"],
    default : "USER"
  },
  forgot_password_otp : {
    type : String,
    default : null
  },
  forgot_password_expiry : {
    type : Date,
    default : ""
  },
  last_login_date : {
    type : Date,
    default : ""
  },
 

}, {
  timestamps : true
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel