import { Appbar } from "../components/appBar"
import { name } from "../components/auth"
import { FullblogCard } from "../components/fullblogcard"
import { useFullblog } from "../hooks/useFullBlogs"
import { useParams } from "react-router-dom"

export const Fullblog=()=>{
    const id = useParams<{id:string}>()
    if(!id){
        console.error('id is undefined')
        return
    }
    const {loading,blog} = useFullblog({id:id})
    if(loading){
        return <div>
            loading...
        </div>
    }
return (
    <div>
        <Appbar name={name}/>
        <FullblogCard title={blog?.title || "no title"} description={blog?.description || "no description"} author={blog?.author.name || "no author name"}></FullblogCard>
    </div>
)
}