import { Loader2, LocateIcon, Mail, Map, MapPin, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useRef, useState, type FormEvent } from "react"
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-menubar";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const Profile = () => {
    const {user,updateProfile,loading} = useUserStore()
    const [isLoading,setIsLoading] = useState<boolean>(loading);
    const [profileData, setProfileData] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        address: user?.address || "",
        phone: user?.contact || "",
        city: user?.city || "",
        country: user?.country || "",
        profilePicture: user?.profilePicture ||""
    });
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(profileData?.profilePicture || "");
    console.warn(selectedProfilePicture);
    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedProfilePicture(result);
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePicture: result
                }))
            }
            reader.readAsDataURL(file);
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData({ ...profileData, [name]: value })
    }

    const updateProfileHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateProfile(profileData);  
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
        console.log(profileData);
    }

    return (
        <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
                        <AvatarImage src={selectedProfilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                        <input ref={imageRef} onChange={fileChangeHandler} accept="image/*" type="file" className="hidden" />
                        <div onClick={() => imageRef.current?.click()} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-59 rounded-full cursor-pointer"><Plus className="text-white w-8 h-8" /></div>
                    </Avatar>
                    <Input type="text" onChange={changeHandler} value={profileData.fullname} name="fullname" className="font-bold outline-none border-none focus-visible:ring-transparent" />
                </div>
            </div>
            <div className="grid md:grid-cols-4 md-gap-2 gap-3 my-10">
                <div className="flex items-center gap-4 rounded-sm p-2">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input name="email" disabled value={profileData.email} onChange={changeHandler} className="w-full bg text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2">
                    <LocateIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <input name="address" value={profileData.address} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2">
                    <Map className="text-gray-500" />
                    <div className="w-full">
                        <Label>City</Label>
                        <input name="city" value={profileData.city} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        <Label>Country</Label>
                        <input name="country" value={profileData.country} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
            </div>
            <div className="text-center">
                {
                    isLoading ? (<Button disabled className="bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="animate-spin"/> Please wait</Button>):(<Button type="submit" className="bg-[#c08538] hover:bg-[#cf8625] cursor-pointer">Update</Button>)
                }
            </div>
        </form>
    )
}
export default Profile