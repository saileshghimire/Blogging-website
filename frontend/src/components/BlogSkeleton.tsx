


export const BlogSkeleton = () => {
    return (
        <div className="flex justify-center ">

        <div className="border-b border-slate-200 pb-4 p-4 animate-pulse">
            <div className="p-2 flex items-center">
                <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                    {/* Skeleton for Avatar */}
                </div>
                <div className="font-thin px-1 bg-gray-200 rounded-full w-16 h-4 ml-2"></div>
                <div className="font-thin text-slate-500 bg-gray-200 rounded-full w-20 h-4 ml-2"></div>
            </div>
            <div className="text-xl font-semibold bg-gray-200 rounded-full w-3/4 h-6 my-2"></div>
            <div className="font-thin text-md text-black bg-gray-200 rounded-full w-full h-6 my-2"></div>
            <div className="text-slate-500 text-sm font-thin bg-gray-200 rounded-full w-1/2 h-4 my-2"></div>
        </div>
        </div>
    )
}