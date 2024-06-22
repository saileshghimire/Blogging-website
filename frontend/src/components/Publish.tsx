import { useState } from "react"
import { Appbar } from "./Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Publish= () =>{
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content, setContent] = useState("");
    return(
        <div>
        <Appbar />
        <div className="flex justify-center">

            <div className="flex-col max-w-screen-lg w-full">
                
                <div className="max-w-screen-lg w-full pt-8">
                <input onChange={(e)=>{
                    setTitle(e.target.value);
                }} type="text" placeholder="Title" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 " />
            </div>
            <div className="max-w-screen-lg w-full pt-8">
             <textarea onChange={(e)=>{
                setContent(e.target.value);
             }} rows={20} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..." />

            </div>
            <div className="pt-8">
            <button onClick={async ()=>{
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
                },{
                    headers:{
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.post.id}`)
            }} type="submit" className="text-white absolute bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Publish Post</button>

            </div>
            </div>
        </div>
        </div>
    )
}