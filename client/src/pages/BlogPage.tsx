import React, { ReactElement, useEffect, useState } from "react";
import { authSlice } from "../store/redusers/authReducer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { BlogPostForm } from "../components/BlogPostForm/BlogPostForm";
import {getAllPosts} from '../store/redusers/blogReducer'
import {Post} from '../components/PostComponent/Post'
import IPost from '../store/redusers/blogReducer'


export const BlogPage=():ReactElement=>{
    const{logout} = authSlice.actions
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.authReducer.data)
    const posts = useAppSelector(state => state.blogReducer.posts)
    const [allPosts, setAllPosts] = useState([])
    
    useEffect(()=>{
      dispatch(getAllPosts())
      console.log(posts)
    },[])
    
return(
    <div>
        <h1>Blog Page</h1>
        <BlogPostForm userId={user._id}/>
        <div className="posts-wrapper">
            {posts && posts.map((post)=>(
                  <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  text={post.text}
                  author={post.author}
                  comments={post.comments}
                  likes={post.likes}

                  />
              )
            )}
        </div>
    </div>
)
}