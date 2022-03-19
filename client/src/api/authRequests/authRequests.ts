import axios from "axios";
import { instance } from "..";
import { IUser } from "../../models/IUser";

export async function loginUser(body:any):Promise<any> {
    return instance.post('/auth/login', body)
}

export async function registerUser(body:IUser):Promise<any> {
    return instance.post('/auth/register', body)
}

export async function getUser():Promise<any>{
    return axios.get('http://localhost:5000/api/auth/getUser', {
        headers:{
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    })
}