import React, { ReactElement, useEffect, useState } from "react";
import { authSlice } from "../store/redusers/authReducer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { BlogPostForm } from "../components/Header/BlogPostForm/BlogPostForm";
import {getAllPosts} from '../store/redusers/blogReducer'


export const BlogPage=():ReactElement=>{
    const{logout} = authSlice.actions
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.authReducer.data)
    
    useEffect(()=>{
      dispatch(getAllPosts())
    })
    
return(
    <div>
        <h1>Blog Page</h1>
        <BlogPostForm userId={user._id}/>
    </div>
)
}