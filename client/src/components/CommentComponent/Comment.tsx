import React, {ReactElement, useState} from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
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
    isReply?: boolean
    parentCommentId?: String

}

export const Comment=({id,text, author, likes, replies, isReply, parentCommentId}:CommentProps):ReactElement=>{
    const dispatch = useAppDispatch()
   const [commentText, setCommentText] = useState('')
   const [isOpenReplyForm, setIsOpenReplyForm] = useState(false)
   const user = useAppSelector(state=>state.authReducer.data)

   const commentInput =(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
       setCommentText(e.target.value)
   }

   const sendCommentHandler=()=>{
    if(!isReply){
        dispatch(giveComment({
            text: commentText,
            replyFor:id
        }))
    } else {
        dispatch(giveComment({
            text: commentText,
            replyFor:parentCommentId
        }))
    }
        
   }
   const replyHandler=()=>{
    setIsOpenReplyForm(!isOpenReplyForm)
   }


   return(
       <div className="comment">
        <div className="comment_author">
         {`${user.name} ${user.lastName}`}
        </div>
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
                            isReply={true}
                            parentCommentId={id}
                         />
                    ))
                    
                       
                    }
                </div>
       </div>
   )
}