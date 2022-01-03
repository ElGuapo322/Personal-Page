import axios from "axios";
import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/redusers/authReducer";


export const RegisterPage=():ReactElement=>{
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    
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

return(
    <div>
        <h1>Register Page</h1>
        <div>
            <input type="email" placeholder="email" onChange={handleEmail}/>
            <input type="password" placeholder="password" onChange={handlePassword}/>
            <input type="text" placeholder="name" onChange={handleName}/>
            <input type="text" placeholder="Last name" onChange={handleLastName}/>
            <button onClick={registerHandler}>Register</button>
        </div>
    </div>
)
}