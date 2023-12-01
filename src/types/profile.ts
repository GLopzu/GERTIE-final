import { User } from 'firebase/auth'


export interface Post {
    id: string;
    email: string;
    password: string;
    name: string;
    icon: string;
  }
  
  export interface PostRegister {
    id: string;
    email: string;
    password: string;
    name: string;
  }
  
  export interface FirebaseUser extends User {
    icon: string;
  }