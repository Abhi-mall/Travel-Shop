
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateOtp from '../utils/generateOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../config/sendEmail.js'


export async function registerUserController(request, response) {
  try {
    const {name, email, password} = request.body

    if(!name || !email || !password) {
      return response.status(400).json({
        message : "Please provide required fields ",
        error : true,
        success : false
      })
    }

    const user = await UserModel.findOne({ email }) 

    if(user) {
      return response.json({
        message : "Already register email",
        error : true,
        success : false
      })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashPassword  = await bcryptjs.hash(password, salt)

    const payload = {
      name,
      email,
      password : hashPassword
    }

    const newUser = new UserModel(payload)
    const save = await newUser.save()
    
    return response.json({
      message : "User registred successfully",
      error: false,
      success: true,
      data: save

    })

  } catch (error) {
    return response.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })    
  }
}

export async function loginController(request, response) {
  try {
    const {email, password} = request.body

    if(!email) {
      return response.status(400).json({
        message : "Please provide email",
        error : true,
        success : false
      })
    }

    if(!password) {
      return response.status(400).json({
        message : "Please provide password",
        error : true,
        success : false
      })
    }

    const user = await UserModel.findOne({email})

    if(!user) {
      return response.status(400).json({
        message : "User not registerd",
        error : true,
        success : false
      })
    }

    const checkPassword = await bcryptjs.compare(password, user.password)

    if(!checkPassword) {
      return response.status(400).json({
        message : "Invalid Credentials",
        error : true,
        success : false      
      })
    }
    const accessToken = await generateAccessToken(user._id)
    

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      last_login_date : new Date()
    })

   

    const cookieOption = {
      httpOnly : true,
       secure: true,
       sameSite:  'None'
    }

    response.cookie('accessToken', accessToken, cookieOption)
    

    return response.json({
      message : "Login successfully",
      error : false,
      success : true,
      data : {
       
        accessToken
      }
    })
  } catch (error) {
    return response.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }

}

export async function logoutController(request, response) {
  try {
    
    const userid = request.userId

   const cookieOption = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",           // ensure cookie is set for whole site
  expires: new Date(0) // set expiry to past date to clear cookie
};

   
    response.clearCookie('accessToken', cookieOption )


    return response.json({
      message : "Logout successfully", 
      error : false,
      success : true
    })
  } catch (error) {
    return response.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}

export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body

    const user = await UserModel.findOne({email})

    if(!user) {
      return response.status(400).json({
        message : "Email is not valid",
        error : true,
        success : false
      })
    }

    const otp = generateOtp()
    const expireTime = new Date() + 60 * 60 * 1000
  
    const update  = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp : otp,
      forgot_password_expiry :  new Date(expireTime).toISOString()
    })
   
    await sendEmail({
      sendTo : email,
      subject : "Forgot password from Travel Shop",
      html :  forgotPasswordTemplate({
        name : user.name,
        otp : otp
    })
    })

    return response.json({
      message : "check your email",
      error : false,
      success : true
  })

  } catch (error) {
    return response.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}

export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email , otp }  = request.body

    if(!email || !otp){
        return response.status(400).json({
            message : "Provide required field email, otp.",
            error : true,
            success : false
        })
    }

    const user = await UserModel.findOne({ email })

    if(!user){
        return response.status(400).json({
            message : "Email not available",
            error : true,
            success : false
        })
    }

    const currentTime = new Date().toISOString()

  

    if(user.forgot_password_expiry < currentTime  ){
        return response.status(400).json({
            message : "Otp is expired",
            error : true,
            success : false
        })
    }

    if(otp !== user.forgot_password_otp){
        return response.status(400).json({
            message : "Invalid otp",
            error : true,
            success : false
        })
    }

    //if otp is not expired
    //otp === user.forgot_password_otp

    const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
        forgot_password_otp : "",
        forgot_password_expiry : ""
    })
    
    return response.json({
        message : "Verify otp successfully",
        error : false,
        success : true
    })

} catch (error) {
    return response.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
}
}

export async function resetPassword(request, response) {
  try {
    const {email, newPassword, confirmPassword} = request.body

    if(!email || !newPassword || !confirmPassword){
      return response.status(400).json({
          message : "provide required fields email, newPassword, confirmPassword"
      })
  }
    const user = await UserModel.findOne({email})

    if(!user) {
      return response.status(400).json({
        message : "Email not available",
        error : true,
        success : false
      })
    }

    if(newPassword !== confirmPassword) {
      return response.status(400).json({
        message : "newPassword and confirmPassword must be same",
        error : true,
        success : false
      })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(newPassword, salt)

    const updateUser = await UserModel.findOneAndUpdate( user._id, {
      password : hashPassword
    })

    return response.json({
      message : "Password updated successfully",
      error : false,
      success : true
    })
  } catch (error) {
    return response.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}

//get login user details
export async function userDetails(request,response){
  try {
      const userId  = request?.userId

     // console.log(userId)

      const user = await UserModel.findById(userId).select('-password' )

      return response.json({
          message : 'user details',
          data : user,
          error : false,
          success : true
      })
  } catch (error) {
      return response.status(500).json({
          message : "Something is wrong",
          error : true,
          success : false
      })
  }
}