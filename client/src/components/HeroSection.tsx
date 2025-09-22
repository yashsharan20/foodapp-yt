import { useState } from "react";
import { Input } from "./ui/input"
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "@/assets/hero_pizza.png"
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
    const [searchText,setSearchText] = useState<string>("");
    const navigate = useNavigate()
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center m-4 gap-20">
            <div className="flex flex-col gap-10 md:w-[60%]">
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">Order Food anytime & anywhere</h1>
                    <p className="text-gray-500">Hey! Our Delicios food is waiting for you , we are always near to you.</p>
                </div>
                <div className="relative flex items-center gap-2">
                    <div>
                        <Input type="text" placeholder="Search restaurant" className="pl-10 border-2 shadow-lg " value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                        <Search className="text-gray-500 absolute inset-y-2 left-2"/>   
                    </div>
                    <Button onClick={()=>navigate(`/search/${searchText}`)} className="bg-[#c08538] hover:bg-[#cf8625] cursor-pointer">Search</Button>
                </div>
            </div>
            <div>
                <img src={HeroImage} className="object-cover w-full max-h-[500px]" />
            </div>
        </div>
    )
}
export default HeroSection