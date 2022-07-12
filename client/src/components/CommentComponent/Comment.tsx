import React, {ReactElement, useState} from "react"
import { useAppDispatch } from "../../hooks/redux"
import { giveComment } from "../../store/redusers/blogReducer"
import './Comment.scss'
import {IComment} from "../../models/IComment"

interface CommentProps {
    date?: string
    text: string
    author: string
    replies?: IComment[]
    likes:string[]
    id: string

}

export const Comment=({id,text, author, likes, replies}:CommentProps):ReactElement=>{
    const dispatch = useAppDispatch()
   const [commentText, setCommentText] = useState('')
   const [isOpenReplyForm, setIsOpenReplyForm] = useState(false)

   const commentInput =(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
       setCommentText(e.target.value)
   }

   const sendCommentHandler=()=>{
        dispatch(giveComment({
            text: commentText,
            replyFor:id
        }))
   }
   const replyHandler=()=>{
    setIsOpenReplyForm(!isOpenReplyForm)
   }


   return(
       <div className="comment">
           {text}
           <div className="comment__actions">
                <div className="actions">
                    <div className="reply" onClick={replyHandler}>Reply</div>
                </div>
                <div className="like">
                    
                </div>
           </div>
           {isOpenReplyForm && (
                    <div className="reply-form">
                        <textarea className="reply-form__textarea" onChange={commentInput}></textarea>
                        <button className="reply-form__submit" onClick={sendCommentHandler}>Reply</button>
                        <button className="reply-form__close">Close</button>
                    </div>
                )}
                <div className="replies">
                    { (replies && replies.length>0) && replies.map((reply)=>(
                            <Comment
                            key={reply._id}
                            text={reply.text}
                            author={reply.author}
                            date={reply.created_at}
                            likes={reply.likes}
                            id={reply._id}
                            replies={reply.replies}

                            />
                    ))
                    
                       
                    }
                </div>
       </div>
   )
}