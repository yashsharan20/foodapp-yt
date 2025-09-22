import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { userSignupSchema, type SignupInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Contact, Loader2, LockKeyhole, Mail, User } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () =>{
    const [input,setInput] = useState<SignupInputState>({
        email:"",
        password:"",
        fullname:"",
        contact:""
    });
    const navigate = useNavigate()
    const {signup,loading} = useUserStore();
    const [errors,setErrors] =useState<Partial<SignupInputState>>({});
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target 
        setInput({...input,[name]:value});
    }
    const signupSubmitHandler = async (e:FormEvent) =>{
        e.preventDefault();
        const result = userSignupSchema.safeParse(input);
        if (!result.success) {
                const fieldErrors = result.error.flatten().fieldErrors;
                setErrors(fieldErrors as Partial<SignupInputState>);
                return;
            }

      try {
          await signup(input)
          navigate("/verify-email")
      } catch (error) {
         console.log(error)
      }
       console.log(input);
    }
    return (
        <div className="flex items-center justify-center min-h-screen w-screen">
            <form onSubmit={signupSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">Sharan Hotels</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Fullname" className="pl-10 focus-visible:ring-1"/>
                        <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.fullname}</span>}
                    </div>
                </div>
                   <div className="mb-4">
                    <div className="relative">
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Email" className="pl-10 focus-visible:ring-1"/>
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.email}</span>}
                    </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Password" className="pl-10 focus-visible:ring-1"/>
                    <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                    {errors && <span className="text-sm text-red-500">{errors.password}</span>}
                </div>
              </div>
              <div className="mb-4">
                    <div className="relative">
                        <Input type="text" name="contact" value={input.contact} onChange={changeEventHandler} placeholder="Contact" className="pl-10 focus-visible:ring-1"/>
                        <Contact className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.contact}</span>}
                    </div>
             </div>
              <div className="mb-10">
                {
                    loading ? (<Button disabled className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="h-4 2-4 animate-spin"/> Please wait</Button>):(<Button type="submit" className="w-full cursor-pointer bg-[#c08538] hover:bg-[#cf8625]">Signup</Button>)
                }
              </div>
               <Separator/>
               <p className="mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500">Login</Link>
               </p>
            </form>
        </div>
    )
}
export default Signup