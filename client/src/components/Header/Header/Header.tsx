import React, { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { authSlice } from "../../../store/redusers/authReducer";
import './Header.css'
import jwt_decode from "jwt-decode"
import {getMyUser} from '../../../store/redusers/authReducer'


interface HeaderProps{
    auth: boolean
}

export const Header=({auth}:HeaderProps):ReactElement=>{
const dispatch = useAppDispatch()
const {logout} = authSlice.actions
const user = useAppSelector(state=>state.authReducer.data)
const token = useAppSelector(state=>state.authReducer.token)
    const logoutHandler =()=>{
        localStorage.removeItem('auth')
        dispatch(logout())

    }

    useEffect(()=>{
        dispatch(getMyUser())
    },[getMyUser])

    return(
        <div className="header">
            <Link to='/'>
            <div className="header-title">My Personal page</div>
            </Link>
            <div className="header-routes">
               <Link to='/blog'>Blog</Link>
               <Link to='/portfolio'>Portfolio</Link>
            </div>
            
                {auth ? (
                    <div className="header-actions">
                    <div className="header-name">
                        {`${user.name} ${user.lastName}`}
                    </div>
                    <div className="header-action" onClick={logoutHandler}>
                        Logout
                    </div>
                    </div>
                ):(
                    <div className="header-actions">
                    <div className="header-action">
                        <Link to='register'>Sign Up</Link>
                    </div>
                    <div className="header-action">
                    <Link to='Login'>Sign In</Link>
                    </div>
                    </div>
                )

                }
            
        </div>
    )
}