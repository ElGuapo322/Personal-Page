import React, { ReactElement } from "react";
import { authSlice } from "../store/redusers/authReducer";
import { useAppDispatch } from "../hooks/redux";

export const BlogPage=():ReactElement=>{
    const{logout} = authSlice.actions
    const dispatch = useAppDispatch()
    const logoutHandler =()=>{
        localStorage.removeItem('auth')
        dispatch(logout())

    }
return(
    <div>
        <h1>Blog Page</h1>
        <button onClick={logoutHandler}>Logout</button>
    </div>
)
}