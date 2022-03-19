import axios from "axios";
import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { authSlice } from "../store/redusers/authReducer";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authRequests/authRequests";
import { login, register } from "../store/redusers/authReducer";


export const HomePage=():ReactElement=>{
    const navigate = useNavigate()
   

return(
    <div>
        <h1>Home Page</h1>
    
    </div>
)
}