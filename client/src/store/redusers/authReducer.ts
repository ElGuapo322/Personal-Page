import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {IUser} from '../../models/IUser'




 interface IAuthState {
     isAuth: boolean
     token: string
 }

 const initialState: IAuthState={
     isAuth: Boolean(localStorage.getItem('auth')) || false,
     token: localStorage.getItem('token') || ''
 }

 export const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers:{
         register(state, action: PayloadAction<IUser>){
             axios.post('http://localhost:5000/api/auth/register',{
               name: action.payload.name,
               email: action.payload.email,
               lastName: action.payload.lastName,
               password:action.payload.password
             }
                
             ).then(function (response) {
                console.log(response);
              })
         },
          login(state, action:PayloadAction<{token: string}>){
                state.token = action.payload.token
         },
         logout(state){
               state.token = ''
         }

     }
 })

 export default authSlice.reducer