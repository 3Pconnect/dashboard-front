import { User } from "./UserTdo";

export interface Post {
    id: number;
    postDate: string; 
    message: string;
    mediaUrl: string;
    user: User;
  }