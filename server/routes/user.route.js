import {Router} from 'express'
import { forgotPasswordController, loginController, logoutController,  registerUserController, resetPassword, userDetails, verifyForgotPasswordOtp } from '../controllers/user.controller.js'

import auth from '../middleware/auth.js'


const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/login', loginController )
userRouter.get('/logout', auth, logoutController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.put('/verify-forgot-password', verifyForgotPasswordOtp)
userRouter.put('/reset-password', resetPassword)
userRouter.get('/user-details', auth, userDetails)

export default userRouter