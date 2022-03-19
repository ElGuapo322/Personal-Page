import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {posting, allPosts} from '../../api/blogRequests/blogRequests'

interface IPost{
    author:string,
    title:string,
    text:string,
    name:string,
    comments:string[],
    likes:string[],
}

interface IBlogState{
    posts: IPost[],
    isLoading: boolean
    error:string[]
    isCreatePostSuccess: boolean
}

const initialState:IBlogState={
   posts: [],
   isLoading:false,
   error:[],
   isCreatePostSuccess: false
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
  export const authSlice = createSlice({
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
        state.posts = action.payload
        
    })
},
})

export default authSlice.reducer