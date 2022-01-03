import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { loginUser, registerUser, getUser } from '../../api/authRequests'
import {IUser} from '../../models/IUser'

interface UserData{
    email:string,
    name:string,
    lastName: string,
    _id:string
}

 interface IAuthState {
     data:UserData
     isAuth: boolean
     token: string
     isRegisterSuccess:boolean,
     isLoginSuccess:boolean,
     error: string[]
     
 }

 const initialState: IAuthState={
     data:{
       email:'',
       name: '',
       lastName:'',
       _id:''
     },
     isAuth: Boolean(localStorage.getItem('auth')) || false,
     token: localStorage.getItem('token') || '',
     error:[],
     isRegisterSuccess:false,
     isLoginSuccess:false
 }

 export const getMyUser = createAsyncThunk(
    'auth/getMyUser',
    async(_, {rejectWithValue})=>{
      try{
        const response = await getUser()
         return response.data
      }catch(e:any){
          const error = e.response.data
          return rejectWithValue(error)
      }
    }
)

 export const login = createAsyncThunk(
     'auth/login',
     async(loginData:any, {rejectWithValue})=>{
       try{
         const response = await loginUser(loginData)
          return response.data
       }catch(e:any){
           const error = e.response.data
           return rejectWithValue(error)
       }
     }
 )

 export const register = createAsyncThunk(
     'auth/register',
     async(registerData:IUser, {rejectWithValue})=>{
         try {
             const response = await registerUser(registerData)
             return response.data
         } catch (e:any) {
             const error = e.response.data
              return rejectWithValue(error)
          }
     }
 )
 

 export const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers:{
         logout(state){
               localStorage.removeItem('token')
               state.token = ''
               state.isAuth = false
         }

     },
     extraReducers:(builder)=> {
        builder.addCase(login.fulfilled, (state,action:PayloadAction<any>)=>{
            console.log(action)
            localStorage.setItem('auth', 'true')
            localStorage.setItem('token', action.payload.token)
            state.token = action.payload.token
            state.isAuth = true
            state.isLoginSuccess=true
         })
         builder.addCase(login.pending, (state,action:PayloadAction<any>)=>{
            console.log("huy")
         })
         builder.addCase(login.rejected, (state,action:PayloadAction<any>)=>{
            state.error.push(action.payload.message)
            console.log(action)
         })
         builder.addCase(register.fulfilled, (state,action:PayloadAction<any>)=>{
          state.isRegisterSuccess = true
         })
        
         builder.addCase(register.rejected, (state,action:PayloadAction<any>)=>{
             state.error.push(action.payload.message)
            console.log(action.payload)
         })
         builder.addCase(getMyUser.fulfilled, (state,action:PayloadAction<any>)=>{
           state.data = action.payload.user
        })
        builder.addCase(getMyUser.rejected, (state,action:PayloadAction<any>)=>{
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            state.isAuth =false
         })
     },
 })

 export default authSlice.reducer