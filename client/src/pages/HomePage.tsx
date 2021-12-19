import axios from "axios";
import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { authSlice } from "../store/redusers/authReducer";
import { useNavigate } from "react-router-dom";


export const HomePage=():ReactElement=>{
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    
    const {register, login} = authSlice.actions
    const dispatch = useAppDispatch()

    const handleName = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setLastName(e.target.value)
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }
    const registerHandler=()=>{
        dispatch(register({
            lastName:lastName,
            name:name,
            email:email,
            password:password
        }))
    }
    const  loginHandler= async ()=>{
        const res = await axios.post('http://localhost:5000/api/auth/login', { email:email,
              password:password})
              console.log(res)
              if (res){
                 await dispatch(login({token:res.data.token}))
                 localStorage.setItem('token', res.data.token)
                 localStorage.setItem('auth', 'true')
              }

        

    }

return(
    <div>
        <h1>Home Page</h1>
        <div>
            <input type="email" placeholder="email" onChange={handleEmail}/>
            <input type="password" placeholder="password" onChange={handlePassword}/>
            <input type="text" placeholder="name" onChange={handleName}/>
            <input type="text" placeholder="Last name" onChange={handleLastName}/>
            <button onClick={loginHandler}>Login</button>
            <button onClick={registerHandler}>Register</button>
        </div>
    </div>
)
}