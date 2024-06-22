import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { FullBlog } from "./FullBlog";

export const Blog =() =>{
    const { id } = useParams(); // Ensure id is string
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if(loading){
        return(
        <div>
            loading...
        </div>
        )
    }
    return(
        <>
        <div>
        
            <FullBlog blog={blog}/>
        </div>
        </>
    )
}