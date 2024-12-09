import { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


interface Blog {
    id:any,
    title: string;
    description: string;
    authorId: string;
    author: {
        name: string;
    };
}
export const useFullblog=({id}:{id:any})=>{
    const [blog,setBlog] = useState<Blog|null>(null)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')
    useEffect(()=>{
        const fetchBlog = async () =>{
         try{
             const res = await axios.get(`${backendUrl}/api/v1/blog/${id.id}`,{
                 headers:{
                     Authorization:`Bearer ${token}`
                 }
             })
             setBlog(res.data.blog)
             console.log("res data :",res.data," id: ",id," blog :",blog)
         }catch(e){
            console.error("Error fetching the full blog :",e)
         }finally{
            setLoading(false)
         }
        }
        fetchBlog()
     },[])
     return {blog,loading}
}