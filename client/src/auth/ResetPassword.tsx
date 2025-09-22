import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";

const ResetPassword = () =>{
    const [newPassword,setNewPassword] = useState<string>("");
    const loading:boolean = false;
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
                    <p className="text-sm text-gray-600">Enter your new password</p>
                </div>
                <div className="relative">
                    <Input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}
                    placeholder="Enter your new password" className="pl-10"/>
                    <LockKeyhole className="absolute inset-y-1.5 left-2 text-gray-600 pointer-events-none"/>
                </div>
                 {
                    loading ? (<Button disabled className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="h-4 2-4 animate-spin"/> Please wait</Button>):(<Button type="submit" className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]">Reset Password</Button>)
                }
                <span className="text-sm">
                    Back to{" "}
                    <Link to="/login" className="text-blue-500">Login</Link>
                </span>
            </form>
        </div>
    )
}
export default ResetPassword