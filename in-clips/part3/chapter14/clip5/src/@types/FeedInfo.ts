export type FeedInfo = {
    id:string, 
    content:string, 
    writer:{
        uid:string;
         name:string;
    }, 
    imageUrl:string, 
    likeCount:number,
    createdAt:number,
}