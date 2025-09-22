import { Loader } from "lucide-react"

const Loading = () =>{
    return (
        <div className="min-h-screen text-center items-center b-gradient-to-br from-gray-900 via-bg-lightgreen to-emerald-500">
            <Loader className="animate-spin w-16 h-16 text-white"/> Loading...
        </div>
    )
}
export default Loading