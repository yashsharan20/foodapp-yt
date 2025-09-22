import { Badge } from "./ui/badge"
import { Timer } from "lucide-react"
import AvailableMenu from "./AvailableMenu"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const RestaurantDetail = () =>{
    const {singleRestaurant,getSingleRestaurant} = useRestaurantStore()
    const params = useParams()
    const {id} = params 
    useEffect(()=>{
         getSingleRestaurant(id!);
    },[id]);

    console.log(singleRestaurant);
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-72">
                    <img src={singleRestaurant?.imageUrl}className="object-cover w-full h-full rounded-lg shadow-lg"/>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="my-5">
                        <h1 className="font-medium text-xl">{singleRestaurant?.restaurantName || "NA"}</h1>
                        <div className="flex gap-2 my-2">
                            {
                                singleRestaurant?.cuisines.map((cuisine:string,index:number)=>(
                                    <Badge key={index}>{cuisine}</Badge>
                                ))
                            }
                        </div>
                        <div className="flex md:flex-row flex-col gap-2 my-5">
                            <div className="flex items-center gap-2 font-medium">
                                <Timer className="w-5 h-5"/>
                                <h1>Delivery Time: {" "}
                                    <span className="text-[#D19254]">{singleRestaurant?.deliveryTime} mins</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <AvailableMenu menus={singleRestaurant?.menus!} />
            </div>
        </div>
    )
}
export default RestaurantDetail