export interface IComment {
    _id:string;
    author:string;
    likes:string[];
    created_at:string;
    parentId:string
    text:string
    replies: IComment[]
}