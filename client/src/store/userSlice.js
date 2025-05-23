import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id : "",
  name : "",
  email : "", 
  last_login_date : "",
  
}

const userSlice = createSlice({
  name : 'user',
  initialState : initialValue,
  reducers : {
    setUserDetails : (state, action)=> {
      state._id = action.payload?._id
      state.name  = action.payload?.name
      state.email = action.payload?.email   
      state.last_login_date = action.payload?.last_login_date
    },
        
    logout : (state,action)=>{
      state._id = ""
      state.name  = ""
      state.email = ""  
      state.last_login_date = ""
      
  }
}})

export const {setUserDetails , logout } = userSlice.actions

export default userSlice.reducer