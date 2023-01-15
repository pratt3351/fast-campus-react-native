export type FeedInfo = {
    id:string;
    content:string;
    writer:{
        name:string;
        uid:string;
    },
    imageUrl:string;
    likeHistory:string[];
    createdAt:number;
}