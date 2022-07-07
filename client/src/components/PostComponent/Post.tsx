import React, {ReactElement, useState} from "react"
import { useAppDispatch } from "../../hooks/redux"
import { giveComment } from "../../store/redusers/blogReducer"
 import './Post.css'
 import {IComment} from '../../models/IComment'
 import {Comment} from "../CommentComponent/Comment"

interface PostProps {
    date?: string
    text: string
    author: string
    title: string
    comments: IComment[]
    likes:string[]
    id: string

}

export const Post=({id, date,text, author, title, comments, likes}:PostProps):ReactElement=>{
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
       <div className="post">
            <div className="post__header">
                <div className="post-date">{date}</div>
                <div className="post-author">{author}</div>
            </div>
            <div className="post__content">{text}</div>
            <div className="post-actions">
                <div className="comment-form">
                      <textarea className="comment-area" onChange={commentInput}></textarea>
                      <button onClick={sendCommentHandler}>Send Comment</button>
                </div>
                { comments.length && comments.map((comment)=>(
                   <Comment
                        text={comment.text}
                        author={comment.author}
                        date={comment.created_at}
                        likes={comment.likes}
                        id={comment.id}
                   />
                ))
                }
            </div>
       </div>
   )
}