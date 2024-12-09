import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backendUrl);


interface Blog {
    id:any,
    title: string;
    description: string;
    authorId: string;
    author: {
        name: string;
    };
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization :`Bearer ${token}`
                    }
                });
                setBlogs(res.data.blogs);
               console.log(res.data)
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);


    return { blogs, loading };
};


