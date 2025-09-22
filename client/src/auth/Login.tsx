import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () =>{
    const [input,setInput] = useState<LoginInputState>({
        email:"",
        password:""
    });
    const navigate = useNavigate()
    const [errors,setErrors] = useState<Partial<LoginInputState>>({});
    const {loading,login} =useUserStore();
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target 
        setInput({...input,[name]:value});
    }
    const loginSubmitHandler = async(e:FormEvent) =>{
        e.preventDefault();
        const result = userLoginSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors as Partial<LoginInputState>);
            return;
        }
        console.log(input);
        try {
            await login(input)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
 
    return (
        <div className="flex items-center justify-center min-h-screen w-screen">
            <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">Sharan Hotels</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter your email" className="pl-10 focus-visible:ring-1"/>
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.email}</span>}
                    </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter your password" className="pl-10 focus-visible:ring-1"/>
                    <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                    {errors && <span className="text-sm text-red-500">{errors.password}</span>}
                </div>
              </div>
              <div className="mb-10">
                {
                    loading ? (<Button disabled className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="h-4 2-4 animate-spin"/> Please wait</Button>):(<Button type="submit" className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]">Login</Button>)
                }
              <Link to="/forgot-password" className="text-blue-500">Forgot Password</Link>
              </div>
               <Separator/>
               <p className="mt-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500">Signup</Link>
               </p>
            </form>
        </div>
    )
}
export default Login