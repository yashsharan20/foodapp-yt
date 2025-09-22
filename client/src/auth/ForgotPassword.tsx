import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Loader2, Mail } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";

const ForgotPassword = () =>{
    const [email,setEmail] = useState<string>("");
    const loading:boolean = false;
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
                    <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
                </div>
                <div className="relative">
                    <Input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email" className="pl-10"/>
                    <Mail className="absolute inset-y-1.5 left-2 text-gray-600 pointer-events-none"/>
                </div>
                 {
                    loading ? (<Button disabled className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="h-4 2-4 animate-spin"/> Please wait</Button>):(<Button type="submit" className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]">Send Reset Link</Button>)
                }
                <span className="text-sm">
                    Back to{" "}
                    <Link to="/login" className="text-blue-500">Login</Link>
                </span>
            </form>
        </div>
    )
}
export default ForgotPassword