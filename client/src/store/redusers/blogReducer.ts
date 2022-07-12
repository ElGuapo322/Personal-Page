import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {posting, allPosts, commenting, allComments} from '../../api/blogRequests/blogRequests'
import { IComment } from '../../models/IComment'

export interface IPost{
    _id: string,
    author:string,
    title:string,
    text:string,
    name:string,
    comments:IComment[],
    likes:string[],
}
// interface IComment{
//     _id: string,
//     author:string,
//     text:string,
//     parentId:string
//     replies:string[],
// }

interface IBlogState{
    posts: IPost[],
    comments: IComment[]
    isLoading: boolean
    error:string[]
    isCreatePostSuccess: boolean
    isCreateCommentSuccess: boolean
}

const initialState:IBlogState={
   posts: [],
   isLoading:false,
   error:[],
   isCreatePostSuccess: false,
   comments:[],
   isCreateCommentSuccess: false
}

export const givePost = createAsyncThunk(
    'blog/givePost',
    async(postData:any, {rejectWithValue})=>{
        try{
          const response = await posting(postData)
           return response.data
        }catch(e:any){
            const error = e.response.data
            return rejectWithValue(error)
        }
      }
  )
  export const getAllPosts = createAsyncThunk(
    'blog/getAllPosts',
    async(_, {rejectWithValue})=>{
        try{
          const response = await allPosts()
           return response.data
        }catch(e:any){
            const error = e.response.data
            return rejectWithValue(error)
        }
      }
  )
  export const getAllComments = createAsyncThunk(
    'blog/getAllComments',
    async(_, {rejectWithValue})=>{
        try{
          const response = await allComments()
           return response.data
        }catch(e:any){
            const error = e.response.data
            return rejectWithValue(error)
        }
      }
  )

  export const giveComment = createAsyncThunk(
    'blog/giveComment',
    async(commentData:any, {rejectWithValue})=>{
        try{
          const response = await commenting(commentData)
          console.log(response);
          
           return response.data
        }catch(e:any){
            const error = e.response.data
            return rejectWithValue(error)
        }
      }
  )


  export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=> {
    builder.addCase(givePost.fulfilled, (state,action:PayloadAction<any>)=>{
        state.isCreatePostSuccess = true
        state.posts.push(action.payload)
    })
    builder.addCase(givePost.rejected, (state, action:PayloadAction<any>)=>{
        state.isCreatePostSuccess = false
        state.error.push(action.payload.message)
    })
    builder.addCase(getAllPosts.fulfilled, (state,action:PayloadAction<any>)=>{
        state.posts = action.payload.postsList
    })
    builder.addCase(getAllComments.fulfilled, (state,action:PayloadAction<any>)=>{
        state.comments = action.payload.commentList
    })
    builder.addCase(giveComment.fulfilled, (state,action:PayloadAction<any>)=>{
        state.comments.push(action.payload.comment)
        
    })
    builder.addCase(giveComment.rejected, (state, action:PayloadAction<any>)=>{
        state.isCreateCommentSuccess = false
        state.error.push(action.payload.message)
    })
},
})

export default blogSlice.reducer