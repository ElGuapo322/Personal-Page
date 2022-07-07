import React, {ReactElement, useState} from "react"
import { useAppDispatch } from "../../hooks/redux"
import { giveComment } from "../../store/redusers/blogReducer"
import './Comment.css'

interface CommentProps {
    date?: string
    text: string
    author: string
    replies?: string[]
    likes:string[]
    id: string

}

export const Comment=({id, date,text, author, likes}:CommentProps):ReactElement=>{
    const dispatch = useAppDispatch()
   const [commentText, setCommentText] = useState('')

   const commentInput =(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
       setCommentText(e.target.value)
   }

   const sendCommentHandler=()=>{
        dispatch(giveComment({
            text: commentText,
            replyFor:id
        }))
   }


   return(
       <div className="comment">
           {text}
       </div>
   )
}