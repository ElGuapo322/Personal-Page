import axios from "axios";
import { instance } from "..";
import { IUser } from "../../models/IUser";

export async function posting(body:any):Promise<any> {
    return instance.post('/blog/post', body,{
        headers:{
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export async function allPosts():Promise<any> {
    return instance.get('/blog/getAllPosts',)
}

export async function allComments():Promise<any> {
    return instance.get('/blog/getAllComments',)
}

export async function commenting(body:any):Promise<any> {
    return instance.post('/blog/comment', body,{
        headers:{
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    })
}