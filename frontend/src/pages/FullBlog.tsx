import { Appbar } from "../components/Appbar"
import { Blog } from "../hooks"

export const FullBlog = ({ blog }:{blog: Blog}) =>{ 
    return(
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-10">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        Author
                        <div className="text-xl font-bold">
                        {blog.author.name || "Anoymous"}
                        </div>
                        
                    </div>
                </div>
                </div>
        </div>
    )
}