

interface BlogCardProps {
    autherName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    autherName,
    title,
    content,
    publishedDate,
}: BlogCardProps)=>{
    return(
        <div className="border-b border-slate-200 pb-4 p-4">
            <div className="p-2 flex">
                <Avatar name={autherName} />
                <div className="font-thin px-1">{autherName} |</div>
                <div className="font-thin text-slate-500">
                {publishedDate}

                </div>
            </div>
            <div className="text-xl font-semibold">
                {title}
            </div>
            <div className="font-thin text-md text-black">
                {content.slice(0,100)+"...."}
            </div>
            <div className="text-slate-500 text-sm font-thin">
                {`${Math.ceil(content.length /100)} minutes read`}
            </div>
        </div>
    )
}

function Avatar({name}:{name:string}){
    return(
        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name.split("")[0]}</span>
</div>
    )
}