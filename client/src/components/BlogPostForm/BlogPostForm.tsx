import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {givePost} from '../../store/redusers/blogReducer'

interface IBlogPostForm{
    userId:string
}
interface IPostData{
    author:string,
    title?:string,
    text?:string,
}

export const BlogPostForm=({userId}:IBlogPostForm):ReactElement=>{
const [title, setTitle] = useState('')
const [text, setText] = useState('')
const [post, setPost] = useState<IPostData>({
    author: userId,
    title:'',
    text:'', 
 })
 
 const dispatch = useAppDispatch()

const inputTitleHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
   setPost({...post,title: e.target.value} )
   setTitle(e.target.value)
   console.log(userId)
}
const inputTextHandler = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setPost({...post,text: e.target.value} )
    setText(e.target.value)
}
const submitPost =(e: React.FormEvent)=>{
    e.preventDefault()
    // setPost({...post,author: userId} )
    const newPost = {
    author: userId,
    title:title,
    text:text, 
    }
   console.log(newPost)
   dispatch(givePost(newPost))
}

return(
    <div className="form-wrapper">
        <form onSubmit={submitPost}>
            <input placeholder="Title" type='text' onChange={inputTitleHandler}/>
            <textarea placeholder="Tell us what's on yout mind" onChange={inputTextHandler}></textarea>
            <button type='submit'>Post it</button>
        </form>
    </div>
)
}