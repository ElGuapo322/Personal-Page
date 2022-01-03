import React, { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { getMyUser, login } from "../../store/redusers/authReducer";


export const LoginPage=():ReactElement=>{
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLogin = useAppSelector(state => state.authReducer.isLoginSuccess)
    
    const dispatch = useAppDispatch()

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }
   
    const  loginHandler = ()=>{
        dispatch(login({email:email, password: password}))
    }
    useEffect(()=>{
        if(isLogin){
            navigate('/')
            dispatch(getMyUser())
        }
    },[isLogin])

return(
    <div>
        <h1>Login Page</h1>
        <div>
            <input type="email" placeholder="email" onChange={handleEmail}/>
            <input type="password" placeholder="password" onChange={handlePassword}/>
          
            <button onClick={loginHandler}>Login</button>
           
        </div>
    </div>
)
}