export interface Post {
    title: string;
    body: string;
    id:string,
    createdDate: Date
  }
  
  export const newPost: Post = {
    title: '',
    body: '',
    id: '',
    createdDate: new Date()
  };