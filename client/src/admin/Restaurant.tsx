import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { restaurantFormSchema } from "@/schema/restaurantSchema"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { Label } from "@radix-ui/react-menubar"
import { Loader2 } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"


const Restaurant = () => {
    const [input,setInput] = useState<restaurantFormSchema>({
        restaurantName:"",
        city:"",
        country:"",
        deliveryTime:0,
        cuisines:[],
        imageFile:undefined
    });
    const [errors,setErrors] = useState<Partial<restaurantFormSchema>>({});
    const {loading,restaurant,updateRestaurant,createRestaurant,getRestaurant} = useRestaurantStore();

    const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value,type} = e.target 
        setInput({...input,[name]:type === 'number'? Number(value):value});
    }
    const submitHandler = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const result = restaurantFormSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.flatten().fieldErrors; 
            setErrors(fieldErrors as Partial<restaurantFormSchema>);
            return;
        }
    
        try {
            const formData = new FormData;
            formData.append("restaurantName",input.restaurantName);
            formData.append("city",input.city);
            formData.append("country",input.country);
            formData.append("deliveryTime",input.deliveryTime.toString());
            formData.append("cuisines",JSON.stringify(input.cuisines));

            if(input.imageFile){
                formData.append("imageFile",input.imageFile);
            }
            console.log(input);
            if(restaurant){
                await updateRestaurant(formData)
            }else{
                await createRestaurant(formData);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        const fetchRestaurant = async()=>{
            await getRestaurant();
            setInput({
                    restaurantName:restaurant?.restaurantName || "",
                    city:restaurant?.city || "",
                    country:restaurant?.country || "",
                    deliveryTime:restaurant?.deliveryTime ?? 0,
                    cuisines:restaurant?.cuisines ? restaurant?.cuisines.map((cuisine:string)=>cuisine) :[],
                    imageFile:undefined
            });
        }
        fetchRestaurant();
        console.log(restaurant);
    },[]);

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div>
                <div>
                    <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
                    <form onSubmit={submitHandler}>
                        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                            <div>
                                <Label>Restaurant Name</Label>
                                <Input type="text" value={input.restaurantName} onChange={changeEventHandler} name="restaurantName" placeholder="Enter your restaurant name" />
                                {errors && <span className="text-xs text-red-600 font-medium">{errors.restaurantName}</span>}
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input type="text" value={input.city} onChange={changeEventHandler} name="city" placeholder="Enter your city name" />
                                {errors && <span className="text-xs text-red-600 font-medium">{errors.city}</span>}
                            </div>
                            <div>
                                <Label>Country</Label>
                                <Input type="text" value={input.country} onChange={changeEventHandler} name="country" placeholder="Enter your country name" />
                                {errors && <span className="text-xs text-red-600 font-medium">{errors.country}</span>}
                            </div>
                            <div>
                                <Label>Delivery Time</Label>
                                <Input type="number" value={input.deliveryTime} onChange={changeEventHandler} name="deliveryTime" placeholder="Enter your delivery time" />
                                {errors && <span className="text-xs text-red-600 font-medium">{errors.deliveryTime}</span>}
                            </div>
                            <div>
                                <Label>Cuisines</Label>
                                <Input type="text" value={input.cuisines} onChange={(e)=>setInput({...input,cuisines:e.target.value.split(",")})} name="cuisines" placeholder="Enter your cuisines name" />
                                {errors && <span className="text-xs text-red-600 font-medium">{errors.cuisines}</span>}
                            </div>
                            <div>
                                <Label>Upload Restaurant Banner</Label>
                                <Input onChange={(e)=>setInput({...input,imageFile:e.target.files?.[0] || undefined})} type="file" name="imageFile" accept="image/*" />
                                {errors && (<span className="text-xs text-red-600 font-medium">
                                {errors.imageFile?.name}
                                </span>)}
                            </div>
                            <div>
                                {
                                    loading ? (
                                     <Button disabled className="cursor-pointer bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="animate-spin"/> Please wait</Button>
                                    ):(
                                        <Button className="cursor-pointer bg-[#c08538] hover:bg-[#cf8625]">
                                            {restaurant ? 'Update Your Restaurant':'Add Your Restaurant'}
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Restaurant